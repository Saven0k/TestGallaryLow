import { useState } from "react";
import { useNotification } from "../../../context/NotificationContext";

export const CountryForm = () => {
    const [name, setName] = useState("");
    const { showNotification } = useNotification();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            showNotification("Введите название страны", "error");
            return;
        }

        // TODO: API запрос
        console.log("Страна создана:", name);

        showNotification("Страна успешно создана", "success");
        setName("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">Создать страну</h2>

            <div className="form__input-box">
                <label className="form__label">Название страны</label>
                <input
                    type="text"
                    className="form__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <button className="form__btn">Создать</button>
        </form>
    );
};