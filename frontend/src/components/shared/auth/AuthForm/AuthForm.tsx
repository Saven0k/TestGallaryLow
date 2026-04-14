import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import { validateEmail, validatePassword, validateAuthForm } from "../../../../validators/auth.validators";
import type { LoginData } from "../../../../types/auth.types";
import { login } from "../../../../api/auth/main.api";
export const AuthForm = () => {
    const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "", global: "" });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") {
            setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        }

        if (name === "password") {
            setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateAuthForm(
            formData.email ?? "",
            formData.password ?? "",
        );

        setErrors({...formErrors, global: errors.global});

        if (!formErrors.email && !formErrors.password) {
            const res = await login(formData);            
            if (res.success === false) {
                navigate("/profile")
                setErrors({...formErrors, global: res.message});
            }
            navigate("/gallery")
        } 
    };

    return (
        <form className="form" onSubmit={handleSubmitForm}>
            <h2 className="form__title">Вход в аккаунт</h2>

            <div className="form__inputs">
                <div className="form__input-box">
                    <label className="form__label">Электронная почта</label>
                    <input
                        type="email"
                        name="email"
                        className={`form__input ${errors.email ? "form__input--error" : ""}`}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="form__error">{errors.email}</span>}
                </div>

                <div className="form__input-box">
                    <label className="form__label">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        className={`form__input ${errors.password ? "form__input--error" : ""}`}
                        onChange={handleInputChange}
                    />
                    {errors.password && <span className="form__error">{errors.password}</span>}
                </div>
            </div>
            {errors.global && <span className="form__error">{errors.global}</span>}

            <button className="form__btn">Войти</button>

            <Link className="form__link" to={"/forgot-password"}>
                Забыли пароль?
            </Link>
            <div className="form__register-link">
                <span className="form__register-text">Нет аккаунта? </span>
                <Link className="form__register-link-btn" to={"/register"}>
                    Зарегистрироваться
                </Link>
            </div>
        </form>
    );
};