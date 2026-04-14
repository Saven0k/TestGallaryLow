import { BASE_URL_API } from "../main.api";

const BASE_URL = `${BASE_URL_API}/genres`

export type Genre = {
    id: number;
    title: string;
    description?: string;
    typeId?: number;
};

export type CreateGenreDto = {
    title: string;
    description?: string;
    typeId?: number;
};

export const getAllGenres = async (): Promise<Genre[]> => {
    const res = await fetch(BASE_URL, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при получении жанров");
    }

    return res.json();
};

export const getGenreById = async (id: number): Promise<Genre> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при получении жанра");
    }

    return res.json();
};

export const createGenre = async (data: {
    name: string;
    description?: string;
    typeId?: number;
}): Promise<Genre> => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Ошибка при создании жанра");
    }

    return res.json();
};

export const deleteGenre = async (id: number): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при удалении жанра");
    }

    return res.json(); 
};

export const deleteAllGenres = async (): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/all`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при удалении всех жанров");
    }

    return res.json(); 
};

