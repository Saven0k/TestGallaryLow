import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import { useAuth } from "../../../../context/AuthContext";

export const AuthForm = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({ email: "", password: "" })

            const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!email.trim()) {
            setErrors(prev => ({
                ...prev,
                email: "Обязательное поле"
            }))
            return;
        }
        if (!emailRegex.test(email)) {
            setErrors(prev => ({
                ...prev,
                email: "Email не валиден",
            }))
            return;
        }
        setErrors(prev => ({
            ...prev,
            email: ''
        }))
    }

    const validatePassword = (password: string) => {
        if (!password.trim()) {
            setErrors(prev => ({
                ...prev,
                password: "Обязательное поле"
            }))
            return;
        }
        setErrors(prev => ({
           ...prev,
            password: ''
        }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            validateEmail(value)
        }
        if (name === "password") {
            validatePassword(value)
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }


    const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!errors.email && !errors.password) {
            // const res = await useAuth.login();
            console.log("awd");
            navigate("/gallery")   
        }
    }



    return (
        <form id="auth-form" className="auth-form" onSubmit={handleSubmitForm}>
            <h2 className="auth-form__title">Вход в аккаунт</h2>
            <div className="auth-form__inputs">
                <div className="auth-form__input-box">
                    <label htmlFor="auth-email" className="auth-form__label">
                        Электронная почта
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="auth-email"
                        className={`auth-form__input ${errors.email ? "auth-form__input--error": ""} `}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="auth-form__error">{errors.email}</span>}
                </div>
                <div className="auth-form__input-box">
                    <label htmlFor="auth-password" className="auth-form__label">
                        Пароль
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="auth-password"
                        className={`auth-form__input ${errors.password ? "auth-form__input--error": ""} `}
                        onChange={handleInputChange}
                    />
                    {errors.password && <span className="auth-form__error">{errors.password}</span>}
                </div>
            </div>
            <button className="auth-form__btn">Войти</button>
            <Link className="auth-form__link" to={"/forgot-password"}>Забыли пароль?</Link>
        </form>

    )
}