import { Prisma, Artist, Painting } from "@prisma/client";
import prisma from "../config/database";

export class ArtistService {
    // Наличие в бд человека, с таким Email
    static async isEmailExists(email: string): Promise<boolean> {
        const existingArtist = await prisma.artist.findUnique({
            where: { email },
        });
        return !!existingArtist;
    }

    // Добавление художника
    static async createArtist(data: Prisma.ArtistCreateInput): Promise<Artist> {
        // Проверяем, существует ли художник с таким email
        const emailExists = await this.isEmailExists(data.email);

        if (emailExists) {
            throw new Error(`Artist with email ${data.email} already exists`);
        }

        return prisma.artist.create({
            data,
        });
    }

    // Получение художника по id
    static async getArtistById(id: string): Promise<Artist | null> {
        return prisma.artist.findUnique({
            where: { id },
            include: {
                genres: {
                    include: {
                        genre: true,
                    }
                },
                paintings: true,
                exhibitions: true,
            }
        })
    }
    static async getPaintingsByArtist(artistId: string): Promise<Painting[]> {
        return prisma.painting.findMany({
            where: {
                author_id: artistId
            },
            include: {
                genre: true,
                exhibitions: {
                    include: {
                        exhibition: {
                            select: {
                                id: true,
                                title: true,
                                date: true
                            }
                        }
                    }
                },
                author: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        avatar_path: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    // Обновление данных артиста ( с проверкой существующего email)
    static async updateArtist(id: string, data: Prisma.ArtistUpdateInput): Promise<Artist> {
        if (data.email) {
            const existingArtist = await prisma.artist.findFirst({
                where: {
                    email: data.email as string,
                    NOT: {
                        id: id
                    }
                }
            });

            if (existingArtist) {
                throw new Error(`Artist with email ${data.email} already exists`);
            }
        }

        return prisma.artist.update({
            where: { id },
            data,
        });
    }

    // Получение всех художников
    static async getAllArtists(): Promise<Artist[]> {
        return prisma.artist.findMany({
            include: {
                genres: {
                    include: {
                        genre: true
                    }
                },
                paintings: true
            }
        })
    }

    // УДаление художника по Id
    static async deleteArtist(id: string): Promise<Artist> {
        return prisma.artist.delete({
            where: { id }
        })
    }


}