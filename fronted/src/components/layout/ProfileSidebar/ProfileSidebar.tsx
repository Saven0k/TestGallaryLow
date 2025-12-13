import { memo, useEffect } from "react";
import "./ProfileSideBar.css";

export interface MenuItem {
    icon: string;
    label: string;
    path: string;
    badge?: number | null;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

export interface ProfileSideBarProps {
    onClose: () => void;
    onNavigate: (path: string) => void;
    isAuthenticated?: boolean;
}

const ProfileSideBar = memo(({ onClose, onNavigate, isAuthenticated = true }: ProfileSideBarProps) => {
    const userData = {
        name: "Иван Иванов",
        email: "ivan@example.com",
        avatar: "/avatars/user.jpg",
    };

    const menuSections: MenuSection[] = [
        {
            title: "Профиль",
            items: [
                { icon: "👤", label: "Мой профиль", path: "/profile", badge: null },
                { icon: "✏️", label: "Редактировать профиль", path: "/profile/edit" },
            ]
        },
        {
            title: "Картины",
            items: [
                { icon: "🖼️", label: "Мои картины", path: "/my/paintings" },
                { icon: "🎨", label: "Добавить картину", path: "/my/paintings/new" },
            ]
        },
        {
            title: "Выставки",
            items: [
                { icon: "🏛️", label: "Мои выставки", path: "/my/exhibitions" },
                { icon: "🎟️", label: "Добавить выставку", path: "/my/exhibitions/new" },
            ]
        },
        {
            title: "Поддержка",
            items: [
                { icon: "❓", label: "Помощь и FAQ", path: "/help" },
            ]
        }
    ];

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

    return (
        <>
            <div
                className="sidebarProfile__overlay sidebarProfile__overlay--visible"
                onClick={onClose}
            />

            <aside
                id="sidebarProfile"
                className="sidebarProfile sidebarProfile--open"
                role="dialog"
                aria-label="Меню профиля"
                aria-modal="true"
            >
                <div className="sidebarProfile__header">
                    {isAuthenticated ? (
                        <div className="sidebarProfile__user-info">
                            <img
                                src={userData.avatar}
                                alt={`Аватар ${userData.name}`}
                                className="sidebarProfile__avatar"
                                width={48}
                                height={48}
                                loading="lazy"
                            />
                            <div className="sidebarProfile__user-details">
                                <h2 className="sidebarProfile__user-name">{userData.name}</h2>
                                <p className="sidebarProfile__user-email">{userData.email}</p>
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
                    <>
                        <nav className="sidebarProfile__nav" role="navigation" aria-label="Навигация профиля">
                            {menuSections.map((section: MenuSection, index: number) => (
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
                    </>
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
                                    onClose();
                                    onNavigate('/gallery');
                                }}
                            >
                                Продолжить как гость
                            </button>
                        </div>

                        <div className="sidebarProfile__guest-benefits">
                            <div className="sidebarProfile__benefit">
                                <span className="sidebarProfile__benefit-icon">🖼️</span>
                                <span>Добавляйте свои картины</span>
                            </div>
                            <div className="sidebarProfile__benefit">
                                <span className="sidebarProfile__benefit-icon">🎨</span>
                                <span>Участвуйте в выставках</span>
                            </div>
                            <div className="sidebarProfile__benefit">
                                <span className="sidebarProfile__benefit-icon">💬</span>
                                <span>Общайтесь с художниками</span>
                            </div>
                        </div>
                    </div>
                )}

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

                    <div className="sidebarProfile__meta">
                        <a href="/privacy" className="sidebarProfile__meta-link">Конфиденциальность</a>
                        <a href="/terms" className="sidebarProfile__meta-link">Условия использования</a>
                        <span className="sidebarProfile__version">v1.0.0</span>
                    </div>
                </div>
            </aside>
        </>
    );
});

export default ProfileSideBar;