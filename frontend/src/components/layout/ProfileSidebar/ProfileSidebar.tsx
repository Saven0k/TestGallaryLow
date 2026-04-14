import { memo, useState, useEffect } from "react";
import "./ProfileSideBar.css";
import { menuSectionsArtist, menuSectionsGuest, menuSectionsModerator, menuSectionsUser, type MenuItem, type MenuSection } from "./sections";
import { Benefits } from "./benefits";
import { Meta } from "./meta";
import { getUserProfile } from "../../../api/users/main.api";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { guestStorage } from "../../../services/guest.service";

export interface ProfileSideBarProps {
    onClose: () => void;
    onNavigate: (path: string) => void;
    isAuthenticated?: boolean;
    isClosing?: boolean;
    onTransitionEnd?: () => void;
    userRole?: string;
}

export interface UserProfile {
    name: string;
    surname: string;
    avatar_path: string;
}

const ProfileSideBar = memo(
    ({ onClose, onNavigate, isClosing = false, onTransitionEnd, userRole }: ProfileSideBarProps) => {
        const [isEntered, setIsEntered] = useState(false);
        const [userData, setUserData] = useState<UserProfile>({ name: "", surname: "", avatar_path: "" });
        const { user, isAuthenticated, isGuest } = useAuth();
        const navigate = useNavigate();
        useEffect(() => {
            const id = requestAnimationFrame(() => setIsEntered(true));
            return () => cancelAnimationFrame(id);
        }, []);

        useEffect(() => {
            const getData = async () => {
                if (!user) return;
                const data = await getUserProfile(user.id);
                setUserData(data);
            }

            getData();
        }, [])

        const handleLinkClick = (path: string) => {
            onNavigate(path);
            onClose();
        };

        const handleLoginClick = () => {
            onNavigate('/login');
            onClose();
        };

        const hasBadge = (item: MenuItem): item is MenuItem & { badge: number } => {
            return item.badge !== null && item.badge !== undefined && item.badge > 0;
        };

        const MenuSelectionArtist = () => {
            return (
                <nav className="sidebarProfile__nav" role="navigation" aria-label="Навигация профиля">
                    {menuSectionsArtist.map((section: MenuSection, index: number) => (
                        <div key={index} className="sidebarProfile__section">
                            <h3 className="sidebarProfile__section-title">{section.title}</h3>
                            <ul className="sidebarProfile__menu">
                                {section.items.map((item: MenuItem, itemIndex: number) => (
                                    <li key={itemIndex} className="sidebarProfile__menu-item">
                                        <button
                                            className={`sidebarProfile__link`}
                                            aria-label={item.label}
                                            onClick={() => handleLinkClick(item.path)}
                                        >
                                            <span className="sidebarProfile__icon" aria-hidden="true">
                                                {item.icon}
                                            </span>
                                            <span className="sidebarProfile__label">{item.label}</span>

                                            {hasBadge(item) && (
                                                <span className="sidebarProfile__badge">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            )
        }
        const MenuSelectionUser = () => {
            return (
                <nav className="sidebarProfile__nav" role="navigation" aria-label="Навигация профиля">
                    {menuSectionsUser.map((section: MenuSection, index: number) => (
                        <div key={index} className="sidebarProfile__section">
                            <h3 className="sidebarProfile__section-title">{section.title}</h3>
                            <ul className="sidebarProfile__menu">
                                {section.items.map((item: MenuItem, itemIndex: number) => (
                                    <li key={itemIndex} className="sidebarProfile__menu-item">
                                        <button
                                            className={`sidebarProfile__link`}
                                            aria-label={item.label}
                                            onClick={() => handleLinkClick(item.path)}
                                        >
                                            <span className="sidebarProfile__icon" aria-hidden="true">
                                                {item.icon}
                                            </span>
                                            <span className="sidebarProfile__label">{item.label}</span>

                                            {hasBadge(item) && (
                                                <span className="sidebarProfile__badge">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            )
        }
        const MenuSelectionGuest = () => {
            return (
                <nav className="sidebarProfile__nav" role="navigation" aria-label="Навигация профиля">
                    {menuSectionsGuest.map((section: MenuSection, index: number) => (
                        <div key={index} className="sidebarProfile__section">
                            <h3 className="sidebarProfile__section-title">{section.title}</h3>
                            <ul className="sidebarProfile__menu">
                                {section.items.map((item: MenuItem, itemIndex: number) => (
                                    <li key={itemIndex} className="sidebarProfile__menu-item">
                                        <button
                                            className={`sidebarProfile__link`}
                                            aria-label={item.label}
                                            onClick={() => handleLinkClick(item.path)}
                                        >
                                            <span className="sidebarProfile__icon" aria-hidden="true">
                                                {item.icon}
                                            </span>
                                            <span className="sidebarProfile__label">{item.label}</span>

                                            {hasBadge(item) && (
                                                <span className="sidebarProfile__badge">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            )
        }
        const MenuSelectionModerator = () => {
            return (
                <nav className="sidebarProfile__nav" role="navigation" aria-label="Навигация профиля">
                    {menuSectionsModerator.map((section: MenuSection, index: number) => (
                        <div key={index} className="sidebarProfile__section">
                            <h3 className="sidebarProfile__section-title">{section.title}</h3>
                            <ul className="sidebarProfile__menu">
                                {section.items.map((item: MenuItem, itemIndex: number) => (
                                    <li key={itemIndex} className="sidebarProfile__menu-item">
                                        <button
                                            className={`sidebarProfile__link`}
                                            aria-label={item.label}
                                            onClick={() => handleLinkClick(item.path)}
                                        >
                                            <span className="sidebarProfile__icon" aria-hidden="true">
                                                {item.icon}
                                            </span>
                                            <span className="sidebarProfile__label">{item.label}</span>

                                            {hasBadge(item) && (
                                                <span className="sidebarProfile__badge">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            )
        }
        return (
            <div className="sidebarProfile-box">
                <div
                    className={`sidebarProfile__overlay ${isClosing ? "sidebarProfile__overlay--closing" : "sidebarProfile__overlay--visible"}`}
                    onClick={onClose}
                    aria-hidden="true"
                />

                <aside
                    id="sidebarProfile"
                    className={`sidebarProfile ${isEntered ? "sidebarProfile--open" : ""} ${isClosing ? "sidebarProfile--closing" : ""}`}
                    role="dialog"
                    aria-label="Меню профиля"
                    aria-modal="true"
                    onTransitionEnd={(e) => e.propertyName === "transform" && isClosing && onTransitionEnd?.()}
                >
                    <div className="sidebarProfile__header">
                        {isAuthenticated ? (

                            <div className="sidebarProfile__user-info">
                                {
                                    userData.avatar_path ?
                                        <img
                                            src={userData.avatar_path}
                                            alt={`Аватар ${userData.name}`}
                                            className="sidebarProfile__avatar"
                                            width={48}
                                            height={48}
                                            loading="lazy"
                                        /> :
                                        <button onClick={() => navigate("profile/edit")} className="sidebarProfile__avatar">+</button>
                                }
                                <div className="sidebarProfile__user-details">
                                    <h2 className="sidebarProfile__user-name">{userData.name}</h2>
                                    <p className="sidebarProfile__user-email">{userData.surname}</p>
                                </div>
                            </div>

                        ) : (
                            <div className="sidebarProfile__guest-header">
                                <div className="sidebarProfile__guest-icon">🎨</div>
                                <h2 className="sidebarProfile__guest-title">Добро пожаловать</h2>
                            </div>
                        )}
                        <button
                            className="sidebarProfile__close"
                            aria-label="Закрыть меню профиля"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>
                    {isAuthenticated ? (
                        ((userRole === "admin" || userRole === "artist") && <MenuSelectionArtist />)
                        ||
                        (userRole === "moderator" && <MenuSelectionModerator />)
                        ||
                        (userRole === "user" && <MenuSelectionUser />)

                    ) : (
                        <div className="sidebarProfile__guest-content">

                            <div className="sidebarProfile__guest-message">
                                <h3 className="sidebarProfile__guest-subtitle">Войдите в аккаунт</h3>
                                <p className="sidebarProfile__guest-text">
                                    Чтобы получить доступ ко всем функциям галереи
                                </p>
                            </div>

                            <div className="sidebarProfile__guest-actions">
                                <button
                                    className="sidebarProfile__login-btn"
                                    onClick={handleLoginClick}
                                >
                                    Войти / Зарегистрироваться
                                </button>

                                <button
                                    className="sidebarProfile__guest-btn"
                                    onClick={() => {
                                        guestStorage.initGuest();
                                        onClose();
                                        navigate("/gallery");
                                    }}
                                >
                                    Продолжить как гость
                                </button>
                            </div>

                            <Benefits />
                        </div>
                    )}
                    {!isAuthenticated && isGuest && <MenuSelectionGuest /> && 
                        <div className="sidebarProfile__guest-content">
                            <div className="sidebarProfile__guest-actions">
                                <button
                                    className="sidebarProfile__login-btn"
                                    onClick={handleLoginClick}
                                >
                                    Войти / Зарегистрироваться
                                </button>
                            </div>

                            <Benefits />
                        </div>

                    }
                    <div className="sidebarProfile__footer">
                        <div className="sidebarProfile__actions">
                            <button
                                className="sidebarProfile__action-btn sidebarProfile__action-btn--secondary"
                                onClick={() => {
                                    onClose();
                                    onNavigate('/settings');
                                }}
                            >
                                ⚙️ Настройки
                            </button>
                            <button
                                className="sidebarProfile__action-btn sidebarProfile__action-btn--danger"
                                onClick={() => {
                                    onClose();
                                    onNavigate('/logout');
                                }}
                            >
                                🚪 Выйти
                            </button>
                        </div>

                        <Meta />
                    </div>
                </aside>
            </div>
        );
    }
);

export default ProfileSideBar;