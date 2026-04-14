    import { useState } from "react"
    import { useNotification } from "../../../context/NotificationContext";

    export const CityForm = () => {
        const [name, setName] = useState("");
        const [error, setError] = useState("");

        const { showNotification } = useNotification();
        

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();

            if (!name.trim()) {
                setError("Введите название города");
                return;
            }

            showNotification("Город успешно создан", "success");
        };

        return (
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Создать город</h2>

                <div className="form__input-box">
                    <label className="form__label">Название города</label>
                    <input
                        type="text"
                        className={`form__input ${error ? "form__input--error" : ""}`}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                        }}
                    />
                    {error && <span className="form__error">{error}</span>}
                </div>

                <button className="form__btn">Создать</button>
            </form>
        );
    };