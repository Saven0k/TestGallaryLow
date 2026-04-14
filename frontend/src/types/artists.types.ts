interface ArtistCreationAttrs {
    user_id: number,
    avatar_path?: string,
    date_birthday: Date,
    biography: string,
    city_id?: number,
    country_id?: number,
    moderate: string,
    is_deleted?: Boolean,
    deleted_at: Date | null
}

export interface ModerateObject {
    moderate: boolean;
    moderator_id: number | null;
    errors: Record<string, string>;
    moderated_at: Date | null;
    comment: string | null;
}


interface ArtCreationAttrs {
    title: string,
    description: string,
    cost: string,
    image_path: string,
    likes: number,
    date_published: Date,
    artist_id?: number,
    city_id?: number,
    modarate: Boolean,
    genre_id?: number,
    metaData: string,
    country_id?: number,
    type_id?: number,
}
interface CityCreationAttrs {
    name: string,
}
interface CountryCreationAttrs {
    name: string,
}

interface ExhibitionCreationAttrs {
    title: string;
    description: string;
    address: string;
    date: Date;
    cost: string;
    moderate?: string;
    city_id?: number;
    country_id?: number;
    type_id?: number;
    image_path?: string | null;
    genre_id?: number;
}

interface GenreCreationAttrs {
    title: string,
    description: string;
    type_id: number;
}
interface TypeCreationAttrs {
    name: string,
    schema: string
}

interface UserCreationAttrs {
    email: string,
    password: string,
    surname: string,
    name: string,
    phone_number: string,
    second_name: string,
    role: "admin" | "visitor" | "moderator" | "artist" | "user"
}


interface VisitorCreatetionAttrs {
    user_id: number;
}