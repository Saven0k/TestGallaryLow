import { createContext, useContext, useState, type FC } from "react";
export interface User {
    id: string;
    email: string;
    password: string,
    name: string,
    surname: string;
}
const AuthContext = createContext<{
    user: User | null,
    isLoading: boolean,
    login: (email: string, password: string) => void,
    register: (email: string, password: string, surname: string, name: string) => void,
    logout: () => void;
} | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("AuthContext not availible");
    return ctx;
}

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = (email: string, password: string) => {

    }

    const register = (email: string, password: string, name: string, surname: string) => {

    }

    const logout = () => {

    }

    const value = {
        user, isLoading, login, register, logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}