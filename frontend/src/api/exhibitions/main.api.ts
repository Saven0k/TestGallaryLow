import { BASE_URL_API } from "../main.api";

const BASE_URL = `${BASE_URL_API}/exhibitions`;

export interface Exhibition {
    id: number;
    title: string;
    description: string;
    address: string;
    date: string;
    cost: string;

    image_path?: string;
    visitors_count: number;
    moderate?: string;

    city_id?: number;
    country_id?: number;
    type_id?: number;
    genre_id?: number;
}


export const getAllExhibitions = async (page = 1, limit = 10): Promise<Exhibition[]> => {
    try {
        const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`, {
            credentials: "include",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("getAllExhibitions error:", e);
        return [];
    }
};


export const getExhibitionById = async (id: number): Promise<Exhibition | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            credentials: "include",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("getExhibitionById error:", e);
        return null;
    }
};


export const createExhibition = async (data: {
    title: string;
    description: string;
    address: string;
    date: string;
    cost: string;
    city_id?: number;
    country_id?: number;
    type_id?: number;
    genre_id?: number;
    image_path?: string;
}): Promise<Exhibition | null> => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("createExhibition error:", e);
        return null;
    }
};


export const updateExhibition = async (
    id: number,
    data: Partial<{
        title: string;
        description: string;
        address: string;
        date: string;
        cost: string;
        city_id: number;
        country_id: number;
        type_id: number;
        genre_id: number;
        image_path: string;
    }>
): Promise<Exhibition | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("updateExhibition error:", e);
        return null;
    }
};

export const deleteExhibition = async (id: number): Promise<boolean | null> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("deleteExhibition error:", e);
        return null;
    }
};

export const deleteExhibitionsBulk = async (ids: number[]): Promise<null | {}> => {
    try {
        const res = await fetch(`${BASE_URL}/bulk/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("deleteExhibitionsBulk error:", e);
        return null;
    }
};

export const searchExhibitions = async (query: string): Promise<Exhibition[] | []> => {
    try {
        const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`, {
            credentials: "include",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("searchExhibitions error:", e);
        return [];
    }
};

export const getExhibitionsByCity = async (cityId: number): Promise<Exhibition[] | []> => {
    try {
        const res = await fetch(`${BASE_URL}/city/${cityId}`, {
            credentials: "include",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("getExhibitionsByCity error:", e);
        return [];
    }
};

export const getUnmoderatedExhibitions = async (): Promise<Exhibition[] | []> => {
    try {
        const res = await fetch(`${BASE_URL}/moderation/unmoderated`, {
            credentials: "include",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("getUnmoderatedExhibitions error:", e);
        return [];
    }
};

export const moderateExhibition = async (
    id: number,
    moderatorId: number,
    status: boolean,
    comment?: string
): Promise<Exhibition | null> => {
    try {
        const url = `${BASE_URL}/${id}/moderate/${moderatorId}?status=${status}${
            comment ? `&comment=${encodeURIComponent(comment)}` : ""
        }`;

        const res = await fetch(url, {
            method: "PATCH",
            credentials: "include",
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || res.statusText);
        }

        return await res.json();
    } catch (e) {
        console.log("moderateExhibition error:", e);
        return null;
    }
};

export const addArtToExhibition = async (exhibitionId: number, artId: number): Promise<Response> => {
    return fetch(`${BASE_URL}/${exhibitionId}/art/${artId}`, {
        method: "POST",
        credentials: "include",
    });
};

export const removeArtFromExhibition = async (exhibitionId: number, artId: number): Promise<Response> => {
    return fetch(`${BASE_URL}/${exhibitionId}/art/${artId}`, {
        method: "DELETE",
        credentials: "include",
    });
};


export const addArtistToExhibition = async (exhibitionId: number, artistId: number): Promise<Response> => {
    return fetch(`${BASE_URL}/${exhibitionId}/artist/${artistId}`, {
        method: "POST",
        credentials: "include",
    });
};

export const removeArtistFromExhibition = async (exhibitionId: number, artistId: number): Promise<Response> => {
    return fetch(`${BASE_URL}/${exhibitionId}/artist/${artistId}`, {
        method: "DELETE",
        credentials: "include",
    });
};

export const signUpToExhibition = async (exhibitionId: number, userId: number) => {
    return fetch(`${BASE_URL}/${exhibitionId}/signup/${userId}`, {
        method: "POST",
        credentials: "include",
    });
};

export const cancelSignUp = async (exhibitionId: number, userId: number) => {
    return fetch(`${BASE_URL}/${exhibitionId}/signup/${userId}`, {
        method: "DELETE",
        credentials: "include",
    });
};