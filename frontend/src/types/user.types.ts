export interface ModerateObject {
    moderate: boolean;
    moderator_id: number | null;
    errors: Record<string, string>;
    moderated_at: string | null;
    comment: string | null;
}

export interface ArtistProfile {
    user_id: number;
    date_birthday: string;
    biography: string;
    moderate: null | ModerateObject;
    is_deleted: string | boolean;
    deleted_at: string | null;
    city_id: number | null;
    country_id: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface VisitorProfile {
    id: number;
    user_id: number;
    createdAt: string;
    updatedAt: string;
}

export interface ModeratorProfile {
    id: number;
    user_id: number;
    permissions?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface AdminProfile {
    id: number;
    user_id: number;
    permissions?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface BaseUser {
    id: number;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'visitor' | 'moderator' | 'artist' | 'user';
    surname: string;
    second_name?: string | null;
    phone_number: string;
    createdAt: string;
    updatedAt: string;
    avatar_path?: File | null;
}

export interface ArtistUser extends BaseUser {
    role: 'artist';
    artistProfile: ArtistProfile;
    visitor?: never;
    moderatorProfile?: never;
    adminProfile?: never;
}

export interface VisitorUser extends BaseUser {
    role: 'visitor';
    visitor: VisitorProfile;
    artistProfile?: never;
    moderatorProfile?: never;
    adminProfile?: never;
}

export interface ModeratorUser extends BaseUser {
    role: 'moderator';
    moderatorProfile: ModeratorProfile;
    artistProfile?: never;
    visitor?: never;
    adminProfile?: never;
}

export interface AdminUser extends BaseUser {
    role: 'admin';
    adminProfile: AdminProfile;
    artistProfile?: never;
    visitor?: never;
    moderatorProfile?: never;
}

export interface RegularUser extends BaseUser {
    role: 'user';
    artistProfile?: never;
    visitor?: never;
    moderatorProfile?: never;
    adminProfile?: never;
}

export type User = ArtistUser | VisitorUser | ModeratorUser | AdminUser | RegularUser;
