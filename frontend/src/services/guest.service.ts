interface LikedItem {
    id: number;
    title: string;
    type: 'art' | 'exhibition' | 'artist';
    likedAt: number;
}

interface GuestData {
    isGuest: boolean;
    guestId: string;
    likedItems: LikedItem[];
    createdAt: number;
}

class GuestStorageService {
    private readonly STORAGE_KEY = 'guest_data';

    isGuest(): boolean {
        const data = this.getGuestData();
        return data?.isGuest || false;
    }

    getGuestData(): GuestData | null {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (!data) return null;
            return JSON.parse(data);
        } catch (error) {
            console.error('Ошибка получения данных гостя:', error);
            return null;
        }
    }

    initGuest(): void {
        const existingData = this.getGuestData();

        if (existingData?.isGuest) {
            return;
        }

        const guestData: GuestData = {
            isGuest: true,
            guestId: 'guest_' + Date.now() + '_' + Math.random().toString(36),
            likedItems: [],
            createdAt: Date.now()
        };

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(guestData));
        console.log('✅ Гость инициализирован');
    }


    addLike(id: number, title: string, type: LikedItem['type']): void {
        const data = this.getGuestData();

        if (!data || !data.isGuest) {
            console.warn('Пользователь не является гостем');
            return;
        }

        const alreadyLiked = data.likedItems.some(item => item.id === id && item.type === type);

        if (alreadyLiked) {
            console.log('Уже лайкнуто');
            return;
        }

        const newLike: LikedItem = {
            id,
            title,
            type,
            likedAt: Date.now()
        };

        data.likedItems.push(newLike);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        console.log(`❤️ Лайк добавлен: ${title} (${type})`);
    }

    removeLike(id: number, type: LikedItem['type']): void {
        const data = this.getGuestData();

        if (!data || !data.isGuest) {
            console.warn('Пользователь не является гостем');
            return;
        }

        const initialLength = data.likedItems.length;
        data.likedItems = data.likedItems.filter(item => !(item.id === id && item.type === type));

        if (initialLength !== data.likedItems.length) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            console.log(`💔 Лайк удален: id=${id}, type=${type}`);
        }
    }

    isLiked(id: number, type: LikedItem['type']): boolean {
        const data = this.getGuestData();

        if (!data || !data.isGuest) {
            return false;
        }

        return data.likedItems.some(item => item.id === id && item.type === type);
    }

    getAllLikes(): LikedItem[] {
        const data = this.getGuestData();

        if (!data || !data.isGuest) {
            return [];
        }

        return data.likedItems;
    }

    getLikesByType(type: LikedItem['type']): LikedItem[] {
        const data = this.getGuestData();

        if (!data || !data.isGuest) {
            return [];
        }

        return data.likedItems.filter(item => item.type === type);
    }

    getLikesCount(): number {
        const data = this.getGuestData();
        return data?.likedItems.length || 0;
    }

    getGuestId(): string | null {
        const data = this.getGuestData();
        return data?.guestId || null;
    }

    clearAllLikes(): void {
        const data = this.getGuestData();

        if (!data || !data.isGuest) {
            return;
        }

        data.likedItems = [];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        console.log('🗑️ Все лайки очищены');
    }

    clearAllData(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        console.log('🗑️ Все данные гостя полностью удалены (смена роли)');
    }

    clearGuest(): void {
        this.clearAllData();
    }
}

export const guestStorage = new GuestStorageService();