import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword, validateRegisterForm } from "../../../../validators/auth.validators";
import { validateText } from "../../../../validators/auth.validators";
import "./style.css"
import { register } from "../../../../api/auth/main.api";
export const RegisterForm = () => {

    type registerUserData = {
        email: string,
        password: string,
        name: string,
        surname: string,
        second_name: string,
        phone_number: string
    }
    type registerArtistData = {
        email: string,
        password: string,
        name: string,
        surname: string,
        second_name: string,
        phone_number: string,
        file?: File | null,
        date_birthday?: Date | null,
        biography?: string | null,
        city_id?: number | null,
        country_id?: number | null,
        moderate?: boolean
    }


    const [formData, setFormData] = useState<registerUserData>({
        email: "",
        password: "",
        second_name: "",
        surname: "СОСАЛ",
        name: "",
        phone_number: "+79999999999"
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        second_name: "",
        name: ""
    });

    const [artistForm, setArtistForm] = useState(false)

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "email") {
            setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        }

        if (name === "password") {
            setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        }

        if (name === "second_name") {
            setErrors(prev => ({ ...prev, second_name: validateText(value) }));
        }

        if (name === "name") {
            setErrors(prev => ({ ...prev, name: validateText(value) }));
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateRegisterForm(
            formData.email,
            formData.password,
            formData.second_name,
            formData.name
        );

        setErrors(formErrors);

        if (
            !formErrors.email &&
            !formErrors.password &&
            !formErrors.second_name &&
            !formErrors.name
        ) {
            const res = await register(formData);
            navigate("/login");
        }
    };

    return (
        <form className="form" onSubmit={handleSubmitForm}>
            <h2 className="form__title">Регистрация</h2>

            <div className="form__inputs">
                <div className="form__input-box">
                    <label className="form__label">Email</label>
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

                <div className="form__input-box">
                    <label className="form__label">Фамилия</label>
                    <input
                        type="text"
                        name="second_name"
                        className={`form__input ${errors.second_name ? "form__input--error" : ""}`}
                        onChange={handleInputChange}
                    />
                    {errors.second_name && <span className="form__error">{errors.second_name}</span>}
                </div>

                <div className="form__input-box">
                    <label className="form__label">Имя</label>
                    <input
                        type="text"
                        name="name"
                        className={`form__input ${errors.name ? "form__input--error" : ""}`}
                        onChange={handleInputChange}
                    />
                    {errors.name && <span className="form__error">{errors.name}</span>}
                </div>
            </div>

            <button className="form__btn">Зарегистрироваться</button>
            <button type="button" className="form__btn" onClick={() => setArtistForm(!artistForm)}>Зарегистрироваться как художник</button>

            <Link className="form__link" to={"/login"}>
                Войти
            </Link>
        </form>
    );
};