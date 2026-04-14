import { createContext, useEffect, useState, useRef, useCallback, type FC } from "react";
import type { User } from "../types/user.types";
import { me, refresh } from "../api/auth/main.api";
import { useNavigate } from "react-router-dom";
import { guestStorage } from "../services/guest.service";

export const AuthContext = createContext<{
    user: User | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    isGuest: boolean,
    refetch: () => Promise<void>;
} | null>(null);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);
    const navigate = useNavigate();

    const isCheckingRef = useRef(false);
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastCheckTimeRef = useRef<number>(0);
    const MIN_CHECK_INTERVAL = 5 * 60 * 1000;

    useEffect(() => {
        const checkGuest = async () => {
            setIsLoading(true);
            const guest = guestStorage.isGuest();

            if (guest) {
                setIsGuest(true);
                setIsAuthenticated(false); 
                setUser(null); 
                console.log('👤 Пользователь вошел как гость');
            } else {
                setIsGuest(false);
                setIsAuthenticated(false);
                setUser(null);
            }

            setIsLoading(false);
        };

        checkGuest();
    }, []);

    const checkAuth = useCallback(async (force: boolean = false) => {
        if (isGuest) {
            console.log('👤 Гость, пропускаем запросы аутентификации');
            return;
        }

        const now = Date.now();
        if (!force && (now - lastCheckTimeRef.current) < MIN_CHECK_INTERVAL) {
            console.log('⏳ Слишком частые проверки, пропускаем');
            return;
        }

        if (isCheckingRef.current) {
            console.log('⏳ Проверка аутентификации уже выполняется, пропускаем');
            return;
        }

        isCheckingRef.current = true;
        lastCheckTimeRef.current = now;

        try {
            const res = await me();

            if (res?.success) {
                setUser(res.data);
                setIsAuthenticated(true);
                setIsGuest(false);
                return;
            }
            if (res?.status === 401) {
                const refreshRes = await refresh();

                if (refreshRes.ok) {
                    const retryRes = await me();
                    if (retryRes?.success) {
                        setUser(retryRes.data);
                        setIsAuthenticated(true);
                        setIsGuest(false);
                        return;
                    }
                }

                setUser(null);
                setIsAuthenticated(false);
                setIsGuest(false);
                navigate("/login");
            } else if (!res?.success) {
                setUser(null);
                setIsAuthenticated(false);
                setIsGuest(false);
            }
        } catch (error) {
            console.error('Ошибка проверки аутентификации:', error);
            setUser(null);
            setIsAuthenticated(false);
            setIsGuest(false);
        } finally {
            isCheckingRef.current = false;
        }
    }, [navigate, isGuest]);

    const refetch = useCallback(async () => {
        await checkAuth(true);
    }, [checkAuth]);

    useEffect(() => {
        const initAuth = async () => {
            if (isGuest) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            await checkAuth(true);
            setIsLoading(false);
        };

        initAuth();
    }, [checkAuth, isGuest]);

    useEffect(() => {
        if (isGuest) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            checkAuth(false);
        }, 10 * 60 * 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [checkAuth, isGuest]);

    useEffect(() => {
        if (isGuest) return;

        let activityTimeout: ReturnType<typeof setTimeout>;
        const resetActivityTimer = () => {
            if (activityTimeout) {
                clearTimeout(activityTimeout);
            }
            activityTimeout = setTimeout(() => {
                checkAuth(false);
            }, 5 * 60 * 1000);
        };

        const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
        events.forEach(event => {
            window.addEventListener(event, resetActivityTimer);
        });

        resetActivityTimer();

        return () => {
            if (activityTimeout) {
                clearTimeout(activityTimeout);
            }
            events.forEach(event => {
                window.removeEventListener(event, resetActivityTimer);
            });
        };
    }, [checkAuth, isGuest]);

    const value = {
        user,
        isLoading,
        isAuthenticated,
        isGuest,
        refetch,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};