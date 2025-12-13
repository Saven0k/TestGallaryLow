export interface RegisterArtistData {
    name: string;
    surname: string;
    second_name: string;
    email: string;
    password: string;
    country: string;
    city: string;
    date_birthday: string;
    biography: string;
    phone_number: string;
    avatar_path?: string;
}

export interface RegisterGuestData {
    name: string;
    second_name: string;
    email: string;
    phone_number: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
    userType: 'artist' | 'guest';
}

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        email: string;
        name: string;
        userType: 'artist' | 'guest';
    };
    token?: string;
}

export interface JwtPayload {
    userId: string;
    email: string;
    userType: 'artist' | 'guest';
}