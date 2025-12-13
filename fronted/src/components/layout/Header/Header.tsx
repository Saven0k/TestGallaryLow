import { lazy, memo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css"

const LazySidebarProfile = lazy(() => import("../ProfileSidebar/ProfileSidebar"))

const Header = memo(() => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleOpenSidebar = () => {
        setIsSidebarOpen(true);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isSidebarOpen) {
                    handleCloseSidebar();
                }
                if (isMenuOpen) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener('keydown', handleEscape);

        
        if (isSidebarOpen || isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isSidebarOpen, isMenuOpen]);

    return (
        <>
            <header className="header" id="header" role="bunner">
                <div className="header__left">
                    <Link to="/" className="header__logo">
                        <div className="header__logo-icon" aria-hidden="true">
                            🎨
                        </div>
                        <div className="header__logo-text">
                            <span className="header__logo-title">ArtGallery</span>
                            <span className="header__logo-subtitle">галерея художников</span>
                        </div>
                    </Link>
                </div>
                <nav className="header__nav" role="navigation">
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <Link to="/gallery" className="header__nav-link">
                                Галерея
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/artists" className="header__nav-link">
                                Художники
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/exhibitions" className="header__nav-link">
                                Выставки
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="header__right">
                    <button
                        className="header__search-btn"
                        aria-label="Поиск произведений искусства"
                    >
                        <span className="header__search-icon">🔍</span>
                    </button>

                    <button
                        className="header__profile-btn"
                        onClick={handleOpenSidebar}
                        aria-label="Открыть меню профиля"
                    >
                        <span className="header__profile-icon">👤</span>
                    </button>
                </div>

            </header>

            
            {isSidebarOpen && (
                <LazySidebarProfile
                    onClose={handleCloseSidebar}
                    onNavigate={(path: string) => {
                        navigate(path);
                        handleCloseSidebar();
                    }}
                />
            )}
        </>
    );
});

export default Header;