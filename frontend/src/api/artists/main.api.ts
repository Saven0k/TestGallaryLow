import type { ArtistUser } from "../../types/user.types";
import { BASE_URL_API } from "../main.api";

const BASE_URL = `${BASE_URL_API}/artists`;

export const getArtists = async (): Promise<ArtistUser[] | null> => {
    try {
        const res = await fetch(BASE_URL, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("getArtists error:", e);
        return null;
    }
};

export const getArtistById = async (
    id: number
): Promise<ArtistUser | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.error("getArtistById error:", e);
        return null;
    }
};


export const createArtist = async (
    data: {
        user_id: number;
        date_birthday: string;
        biography: string;
        city_id?: number;
        country_id?: number;
        avatar_path?: File;
    }
): Promise<ArtistUser | null> => {
    try {
        const formData = new FormData();

        formData.append("user_id", String(data.user_id));
        formData.append("date_birthday", data.date_birthday);
        formData.append("biography", data.biography);

        if (data.city_id) formData.append("city_id", String(data.city_id));
        if (data.country_id) formData.append("country_id", String(data.country_id));

        if (data.avatar_path) {
            formData.append("avatar_path", data.avatar_path);
        }

        const res = await fetch(BASE_URL, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.error("createArtist error:", e);
        return null;
    }
};


export const updateArtist = async (
    id: number,
    data: {
        date_birthday?: string;
        biography?: string;
        city_id?: number;
        country_id?: number;
        avatar_path?: File;
    }
): Promise<ArtistUser | null> => {
    try {
        const formData = new FormData();

        if (data.date_birthday) formData.append("date_birthday", data.date_birthday);
        if (data.biography) formData.append("biography", data.biography);
        if (data.city_id) formData.append("city_id", String(data.city_id));
        if (data.country_id) formData.append("country_id", String(data.country_id));

        if (data.avatar_path) {
            formData.append("avatar_path", data.avatar_path);
        }

        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.error("updateArtist error:", e);
        return null;
    }
};

export const deleteArtistById = async (
    id: number
): Promise<boolean> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText);
        }

        return true;
    } catch (e) {
        console.error("deleteArtist error:", e);
        return false;
    }
};

export const moderateArtist = async (
    id: number,
    data: {
        moderate: boolean;
        moderator_id: number | null;
        errors: Record<string, string>;
        comment?: string | null;
    }
): Promise<ArtistUser | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}/modarate`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.error("moderateArtist error:", e);
        return null;
    }
};

export const getArtsByArtist = async (
    id: number
): Promise<any[] | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}/arts`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) throw new Error();

        return await res.json();
    } catch (e) {
        console.error("getArtsByArtist error:", e);
        return null;
    }
};

export const getExhibitionsByArtist = async (
    id: number
): Promise<any[] | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}/exhibitions`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) throw new Error();

        return await res.json();
    } catch (e) {
        console.error("getExhibitionsByArtist error:", e);
        return null;
    }
};