import { useState } from "react";
import { useNotification } from "../../../context/NotificationContext";

export const GenreForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        typeId: ""
    });

    const { showNotification } = useNotification();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            showNotification("Введите название жанра", "error");
            return;
        }
        // TODO: API запрос
        console.log("Жанр создан:", formData);

        showNotification("Жанр успешно создан", "success");

        setFormData({
            name: "",
            description: "",
            typeId: ""
        });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">Создать жанр</h2>

            <div className="form__inputs">

                <div className="form__input-box">
                    <label className="form__label">Название</label>
                    <input
                        type="text"
                        name="name"
                        className="form__input"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form__input-box">
                    <label className="form__label">Описание</label>
                    <input
                        type="text"
                        name="description"
                        className="form__input"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form__input-box">
                    <label className="form__label">Тип</label>
                    <select
                        name="typeId"
                        className="form__input"
                        value={formData.typeId}
                        onChange={handleChange}
                    >
                        {/* TODO: фором пройтись по списку типов. Сделать запрос */}
                        <option value="">Выберите тип</option>
                        <option value="1">Тип 1</option>
                        <option value="2">Тип 2</option>
                    </select>
                </div>

            </div>

            <button className="form__btn">Создать</button>
        </form>
    );
};