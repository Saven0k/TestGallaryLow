import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Утилиты для работы с куками


// Основной хук (обновленный для кук)
export const useAuth = () => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
    });

    const navigate = useNavigate();

    // Проверка авторизации при монтировании
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Проверяем наличие пользователя в куках
                const userData = CookieService.get('userData');

                if (userData) {
                    const user = JSON.parse(userData);
                    setState(prev => ({
                        ...prev,
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    }));
                } else {
                    setState(prev => ({ ...prev, isLoading: false }));
                }
            } catch (error) {
                console.error('Auth check error:', error);
                CookieService.remove('userData');
                setState(prev => ({ ...prev, isLoading: false }));
            }
        };

        checkAuth();
    }, []);

    // Логин (обновленный для работы с куками)
    const login = useCallback(async (data: LoginData): Promise<void> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include', // Важно для кук!
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка входа');
            }

            const result = await response.json();

            // Сохраняем пользователя в куки (без токена - он в HttpOnly куках)
            CookieService.set('userData', JSON.stringify(result.user));

            setState({
                user: result.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });

            navigate('/profile', { replace: true });
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Ошибка входа',
            }));
        }
    }, [navigate]);

    // Регистрация
    const register = useCallback(async (data: RegisterData): Promise<void> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            if (data.password !== data.confirmPassword) {
                throw new Error('Пароли не совпадают');
            }

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
                credentials: 'include', // Важно для кук!
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка регистрации');
            }

            const result = await response.json();

            // Сохраняем пользователя в куки
            CookieService.set('userData', JSON.stringify(result.user));

            setState({
                user: result.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });

            navigate('/profile', { replace: true });
        } catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Ошибка регистрации',
            }));
        }
    }, [navigate]);

    // Выход
    const logout = useCallback(async (): Promise<void> => {
        try {
            // Вызов логаута на сервере для очистки кук
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Очищаем клиентские куки
            CookieService.remove('userData');

            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });

            navigate('/', { replace: true });
        }
    }, [navigate]);

    const clearError = useCallback((): void => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        login,
        register,
        logout,
        clearError,
    };
};