import type { Genre } from "../genres/main.api";
import { BASE_URL_API } from "../main.api";

const BASE_URL = `${BASE_URL_API}/types`

export type Type = {
    id: number;
    name: string;
    schema: string;
};

export type CreateTypeDto = {
    name: string;
    schema: string;
};


export const getAllTypes = async (): Promise<Type[]> => {
    const res = await fetch(BASE_URL, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при получении типов");
    }

    return res.json();
};

export const getTypeById = async (id: number): Promise<Type> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при получении типа");
    }

    return res.json();
};

export const createType = async (data: { name: string; schema: string }): Promise<Type> => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Ошибка при создании типа");
    }

    return res.json();
};

export const deleteType = async (id: number): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при удалении типа");
    }

    return res.json(); 
};

export const deleteAllTypes = async (): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/all`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при удалении всех типов");
    }

    return res.json();
};

export const getGenresByType = async (id: number): Promise<Genre[]> => {
    const res = await fetch(`${BASE_URL}/${id}/genres`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Ошибка при получении жанров типа");
    }

    return res.json();
};