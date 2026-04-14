import { useState, useEffect, useContext } from "react";
import { useNotification } from "../../../context/NotificationContext";
import { AuthContext } from "../../../context/AuthContext";
import { getAllGenres, type Genre } from "../../../api/genres/main.api";
import { getAllTypes, type Type } from "../../../api/types/main.api";
import { getAllCities, type City } from "../../../api/cities/main.api";
import { getAllCountries, type Country } from "../../../api/contries/main.api";
import { createArt, type CreateArtDto } from "../../../api/arts/main.api";
import { DynamicMetadataInput } from "../DynamicMetadataInput/DynamicMetadataInput";
interface ArtFormData {
    title: string;
    description: string;
    cost: string;
    image_path: File | null;
    metadata: string;
    date_published: string;
    artist_id: number | "";
    city_id: number | "";
    country_id: number | "";
    genre_id: number | "";
    type_id: number | "";
}

export const ArtForm = () => {
    const { user } = useContext(AuthContext)!;
    const { showNotification } = useNotification();

    const [formData, setFormData] = useState<CreateArtDto>({
        title: "",
        description: "",
        cost: "",
        image_path: null,
        metadata: "{}",
        date_published: "",
        artist_id: "",
        city_id: "",
        country_id: "",
        genre_id: "",
        type_id: ""
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ArtFormData, string>>>({});
    const [metadataError, setMetadataError] = useState<string | null>(null);


    const [genres, setGenres] = useState<Genre[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingGenres, setLoadingGenres] = useState(false);
    const [loadingTypes, setLoadingTypes] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingCountries, setLoadingCountries] = useState(false);

    const currentArtistId = user?.id || null;

    useEffect(() => {
        const fetchGenres = async () => {
            setLoadingGenres(true);
            try {
                const response = await getAllGenres();
                setGenres(response);
            } catch (error) {
                showNotification("Ошибка при загрузке списка жанров", "error");
            } finally {
                setLoadingGenres(false);
            }
        };
        fetchGenres();
    }, []);
    useEffect(() => {
        const fetchTypes = async () => {
            setLoadingTypes(true);
            try {
                const response = await getAllTypes();
                setTypes(response);
            } catch (error) {
                showNotification("Ошибка при загрузке списка типов", "error");
            } finally {
                setLoadingTypes(false);
            }
        };
        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchCountries = async () => {
            setLoadingCountries(true);
            try {
                const response = await getAllCountries();
                setCountries(response);
            } catch (error) {
                showNotification("Ошибка при загрузке списка стран", "error");
            } finally {
                setLoadingCountries(false);
            }
        };
        fetchCountries();
    }, []);
    useEffect(() => {
        const fetchCities = async () => {
            setLoadingCities(true);
            try {
                const response = await getAllCities();
                setCities(response);
            } catch (error) {
                showNotification("Ошибка при загрузке списка городов", "error");
            } finally {
                setLoadingCities(false);
            }
        };
        fetchCities();
    }, []);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ArtFormData, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = "Введите название картины";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Введите описание картины";
        }
        if (!formData.image_path) {
            newErrors.image_path = "Выберите файл изображения";
        }
        if (!formData.date_published) {
            newErrors.date_published = "Выберите дату создания";
        }
        if (!formData.genre_id) {
            newErrors.genre_id = "Выберите жанр";
        }
        if (!formData.type_id) {
            newErrors.type_id = "Выберите тип картины";
        }
        if (!currentArtistId) {
            newErrors.artist_id = "У вас нет профиля художника. Обратитесь к администратору";
        }

        try {
            JSON.parse(formData.metadata);
        } catch {
            setMetadataError("Невалидный JSON формат");
            newErrors.metadata = "Невалидный JSON формат";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (errors[name as keyof ArtFormData]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showNotification("Пожалуйста, выберите изображение", "error");
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                showNotification("Размер файла не должен превышать 10MB", "error");
                return;
            }

            setFormData(prev => ({ ...prev, image_path: file }));

            if (errors.image_path) {
                setErrors(prev => ({ ...prev, image: "" }));
            }
        }
    };

    const handleMetadataChange = (jsonString: string) => {
        setFormData(prev => ({ ...prev, metadata: jsonString }));
        setMetadataError(null);
        if (errors.metadata) {
            setErrors(prev => ({ ...prev, metadata: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            showNotification("Пожалуйста, заполните все обязательные поля", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData: CreateArtDto = {
                title: formData.title,
                description: formData.description,
                cost: formData.cost || "",
                image_path: formData.image_path || undefined,
                metadata: formData.metadata,
                date_published: new Date(formData.date_published).toISOString(),
                artist_id: currentArtistId || undefined,
                city_id: formData.city_id ? Number(formData.city_id) : "",
                country_id: formData.country_id ? Number(formData.country_id) : "",
                genre_id: formData.genre_id ? Number(formData.genre_id) : "",
                type_id: formData.type_id ? Number(formData.type_id) : "",
            };
            await createArt(submitData);
            showNotification("Картина успешно создана!", "success");

            setFormData({
                title: "",
                description: "",
                cost: "",
                image_path: null,
                metadata: "{}",
                date_published: "",
                artist_id: "",
                city_id: "",
                country_id: "",
                genre_id: "",
                type_id: ""
            });

            const fileInput = document.getElementById("image_file") as HTMLInputElement;
            if (fileInput) fileInput.value = "";

        } catch (error) {
            showNotification("Ошибка при создании картины", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">Создать картину</h2>

            <div className="form__inputs">
                <div className="form__input-box">
                    <label className="form__label">Название картины *</label>
                    <input
                        type="text"
                        name="title"
                        className={`form__input ${errors.title ? "form__input--error" : ""}`}
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Например: Мона Лиза"
                    />
                    {errors.title && <span className="form__error">{errors.title}</span>}
                </div>

                <div className="form__input-box">
                    <label className="form__label">Описание *</label>
                    <textarea
                        name="description"
                        className={`form__input ${errors.description ? "form__input--error" : ""}`}
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Опишите картину, её историю, технику..."
                        style={{ resize: "vertical" }}
                    />
                    {errors.description && <span className="form__error">{errors.description}</span>}
                </div>

                <div className="form__input-box">
                    <label className="form__label">Фото арта *</label>
                    <input
                        type="file"
                        id="image_file"
                        name="image_path"
                        accept="image/*"
                        className={`form__input ${errors.image_path ? "form__input--error" : ""}`}
                        onChange={handleFileChange}
                    />
                    {formData.image_path && (
                        <span style={{ fontSize: "12px", color: "#4a5568", display: "block", marginTop: "5px" }}>
                            Выбран файл: {formData.image_path.name} ({(formData.image_path.size / 1024).toFixed(2)} KB)
                        </span>
                    )}
                    {errors.image_path && <span className="form__error">{errors.image_path}</span>}
                </div>


                <div className="form__input-box">
                    <label className="form__label">Стоимость</label>
                    <input
                        type="text"
                        name="cost"
                        className="form__input"
                        value={formData.cost}
                        onChange={handleChange}
                        placeholder="4500$ или Бесценно"
                    />
                </div>

                <div className="form__input-box">
                    <label className="form__label">Характеристики картины</label>
                    <DynamicMetadataInput
                        value={formData.metadata}
                        onChange={handleMetadataChange}
                        onError={setMetadataError}
                    />
                    {metadataError && <span className="form__error">{metadataError}</span>}
                </div>

                <div className="form__input-box">
                    <label className="form__label">Дата создания картины *</label>
                    <input
                        type="date"
                        name="date_published"
                        className={`form__input ${errors.date_published ? "form__input--error" : ""}`}
                        value={formData.date_published}
                        onChange={handleChange}
                    />
                    {errors.date_published && <span className="form__error">{errors.date_published}</span>}
                </div>
                <div className="form__input-box">
                    <label className="form__label">Тип картины *</label>
                    <select
                        name="type_id"
                        className={`form__input ${errors.type_id ? "form__input--error" : ""}`}
                        value={formData.type_id}
                        onChange={handleChange}
                        disabled={loadingTypes}
                    >
                        <option value="">{loadingTypes ? "Загрузка..." : "Выберите тип"}</option>
                        {types.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.name} (ID: {type.id})
                            </option>
                        ))}
                    </select>
                    {errors.type_id && <span className="form__error">{errors.type_id}</span>}
                </div>
                <div className="form__input-box">
                    <label className="form__label">Жанр *</label>
                    <select
                        name="genre_id"
                        className={`form__input ${errors.genre_id ? "form__input--error" : ""}`}
                        value={formData.genre_id}
                        onChange={handleChange}
                        disabled={loadingGenres}
                    >
                        <option value="">{loadingGenres ? "Загрузка..." : "Выберите жанр"}</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.title} (ID: {genre.id})
                            </option>
                        ))}
                    </select>
                    {errors.genre_id && <span className="form__error">{errors.genre_id}</span>}
                </div>
                <div className="form__input-box">
                    <label className="form__label">Страна</label>
                    <select
                        name="country_id"
                        className="form__input"
                        value={formData.country_id}
                        onChange={handleChange}
                        disabled={loadingCountries}
                    >
                        <option value="">{loadingCountries ? "Загрузка..." : "Выберите страну"}</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}>
                                {country.name} (ID: {country.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form__input-box">
                    <label className="form__label">Город</label>
                    <select
                        name="city_id"
                        className="form__input"
                        value={formData.city_id}
                        onChange={handleChange}
                        disabled={loadingCities}
                    >
                        <option value="">{loadingCities ? "Загрузка..." : "Выберите город"}</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>
                                {city.name} (ID: {city.id})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="submit" className="form__btn" disabled={!currentArtistId || isSubmitting}>
                {isSubmitting ? "Создание..." : "Создать картину"}
            </button>
        </form>
    );
};