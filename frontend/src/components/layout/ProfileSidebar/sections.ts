export interface MenuItem {
    icon: string;
    label: string;
    path: string;
    badge?: number | null;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

// TODO: пути сделать
export const menuSectionsArtist: MenuSection[] = [
    {
        title: "Профиль",
        items: [
            { icon: "👤", label: "Мой профиль", path: "/profile", badge: null },
            { icon: "✏️", label: "Редактировать профиль", path: "/profile/edit" },
        ]
    },
    {
        title: "Картины",
        items: [
            { icon: "🖼️", label: "Мои картины", path: "/my/paintings" },
            { icon: "🎨", label: "Добавить картину", path: "/my/paintings/new" },
        ]
    },
    {
        title: "Выставки",
        items: [
            { icon: "🏛️", label: "Мои выставки", path: "/my/exhibitions" },
            { icon: "🎟️", label: "Добавить выставку", path: "/my/exhibitions/new" },
        ]
    },
    {
        title: "Поддержка",
        items: [
            { icon: "❓", label: "Помощь и FAQ", path: "/help" },
        ]
    }
];// TODO: сделать пути картинки и продумать
export const menuSectionsUser: MenuSection[] = [
    {
        title: "Профиль",
        items: [
            { icon: "👤", label: "Мой профиль", path: "/profile", badge: null },
            { icon: "✏️", label: "Редактировать профиль", path: "/profile/edit" },
        ]
    },
    {
        title: "Картины",
        items: [
            { icon: "🖼️", label: "Понравившиеся картины", path: "/profile/paintings" },
        ]
    },
    {
        title: "Выставки",
        items: [
            { icon: "🏛️", label: "Мои выставки", path: "/profile/exhibitions" },
        ]
    },
    {
        title: "Поддержка",
        items: [
            { icon: "❓", label: "Помощь и FAQ", path: "/help" },
        ]
    }
];// TODO: изменить пути и картики метнуть
export const menuSectionsModerator: MenuSection[] = [
    {
        title: "Профиль",
        items: [
            { icon: "👤", label: "Мой профиль", path: "/profile", badge: null },
            { icon: "✏️", label: "Редактировать профиль", path: "/profile/edit" },
        ]
    },
    {
        title: "Картины",
        items: [
            { icon: "🖼️", label: "Модерация картин", path: "/profile/paintings" },
        ]
    },
    {
        title: "Выставки",
        items: [
            { icon: "🏛️", label: "Модерация выставок", path: "/profile/exhibitions" },
        ]
    },
    {
        title: "Артисты",
        items: [
            { icon: "🏛️", label: "Модерация артистов", path: "/profile/exhibitions" },
        ]
    },
    {
        title: "Поддержка",
        items: [
            { icon: "❓", label: "Помощь и FAQ", path: "/help" },
        ]
    }
];
// TODO: изменить пути и картики метнуть
export const menuSectionsGuest: MenuSection[] = [
    {
        title: "Картины",
        items: [
            { icon: "🖼️", label: "Понравившиеся картины", path: "/profile/paintings" },
        ]
    },
    {
        title: "Артисты",
        items: [
            { icon: "🏛️", label: "Понравившиеся артисты", path: "/profile/exhibitions" },
        ]
    },
    {
        title: "Поддержка",
        items: [
            { icon: "❓", label: "Помощь и FAQ", path: "/help" },
        ]
    }
];