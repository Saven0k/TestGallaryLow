import { BASE_URL_API } from "../main.api";

const BASE_URL = `${BASE_URL_API}/arts`;

export interface Art {
    id: number;

    title: string;
    description: string;
    cost: string;
    image_path: string;

    likes: number;
    metadata: string;

    date_published: string;
    modarate: boolean;

    artist_id?: number;
    city_id?: number;
    country_id?: number;
    genre_id?: number;
    type_id?: number;

    // связи (опционально)
    artist?: any;
    city?: any;
    country?: any;
    genre?: any;
    type?: any;

    exhibitions?: any[];
}

export interface CreateArtDto {
    title: string;
    description: string;
    cost: string;
    image_path?: File | null; 
    metadata: string;
    date_published: string;

    artist_id?: number | string;
    city_id?: number | string;
    country_id?: number | string;
    genre_id?: number | string;
    type_id?: number | string;
}

export type UpdateArtDto = Partial<CreateArtDto>;


export const getArts = async (): Promise<Art[]> => {
    try {
        const res = await fetch(BASE_URL, {
            credentials: "include",
        });

        if (!res.ok) throw new Error();

        return await res.json();
    } catch (e) {
        console.log("getArts error:", e);
        return [];
    }
};

export const getArtById = async (id: number): Promise<Art | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            credentials: "include",
        });

        if (!res.ok) throw new Error();

        return await res.json();
    } catch (e) {
        console.log("getArtById error:", e);
        return null;
    }
};

export const createArt = async (
    data: CreateArtDto
): Promise<Art | null> => {
    try {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("cost", data.cost);
        formData.append("metadata", data.metadata);
        formData.append("date_published", data.date_published);

        if (data.image_path) {
            formData.append("image_path", data.image_path);
        }

        if (data.artist_id) formData.append("artist_id", String(data.artist_id));
        if (data.city_id) formData.append("city_id", String(data.city_id));
        if (data.country_id) formData.append("country_id", String(data.country_id));
        if (data.genre_id) formData.append("genre_id", String(data.genre_id));
        if (data.type_id) formData.append("type_id", String(data.type_id));

        const res = await fetch(BASE_URL, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (!res.ok) throw new Error();

        return await res.json();
    } catch (e) {
        console.log("createArt error:", e);
        return null;
    }
};

export const updateArt = async (
    id: number,
    data: UpdateArtDto
): Promise<Art | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error();

        return await res.json();
    } catch (e) {
        console.log("updateArt error:", e);
        return null;
    }
};

export const deleteArt = async (id: number): Promise<boolean> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!res.ok) throw new Error();

        return true;
    } catch (e) {
        console.log("deleteArt error:", e);
        return false;
    }
};

export const moderateArt = async (
    id: number,
    modarate: boolean
): Promise<Art | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}/modarate`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(modarate),
        });

        if (!res.ok) throw new Error();

        return await res.json();
    } catch (e) {
        console.log("moderateArt error:", e);
        return null;
    }
};