import { useState } from "react";
import { useNotification } from "../../../context/NotificationContext";

export const TypeForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        schema: ""
    });

    const { showNotification } = useNotification();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            showNotification("Введите название типа", "error");
            return;
        }

        if (!formData.schema.trim()) {
            showNotification("Введите схему", "error");
            return;
        }

        console.log("Тип создан:", formData);

        showNotification("Тип успешно создан", "success");

        setFormData({
            name: "",
            schema: ""
        });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">Создать тип</h2>

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
                    <label className="form__label">Схема</label>
                    <input
                        type="text"
                        name="schema"
                        className="form__input"
                        placeholder='например: { "field": "string" }'
                        value={formData.schema}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <button className="form__btn">Создать</button>
        </form>
    );
};