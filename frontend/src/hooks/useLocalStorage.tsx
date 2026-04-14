// TODO: DELETE
import { useCallback, useEffect, useState } from "react"

export const useLocalStorage = () => {
    const [token, setToken] = useState<string | null>(null);

    const setTokenInStorage = useCallback((newToken: string | null) => {
        try {
            if (newToken === null) {
                localStorage.removeItem("token")
                setToken(null)
            } else {
                localStorage.setItem("token", newToken)
            }
        } catch (e) {
            console.error(`Ошибка изменения токена: ${e}`)
        }
    }, [])

    const saveToken = useCallback((newToken: string) => {
        setTokenInStorage(newToken)
    }, [setTokenInStorage])


    const deleteToken = useCallback(() => {
        setTokenInStorage(null)
    }, [setTokenInStorage])

    useEffect(() => {
        const token = localStorage.getItem("token") || null;
        setToken(token)
    }, [])

    return {
        token,
        saveToken,
        deleteToken,
        createToken: saveToken,
        updateToken: saveToken,
        getToken: () => token,
    }
}