import { Genre } from "@prisma/client";
import prisma from "../config/database";

export class GenreService {
    static async createGenre(title: string): Promise<Genre> {
        return prisma.genre.create({
            data: {title},
        })
    }

    static async updateGenre(id: string, title: string): Promise<Genre> {
        return prisma.genre.update({
            where: {id},
            data: {title},
        })
    }

    static async deleteGenre(id: string): Promise<Genre> {
        return prisma.genre.delete({
            where: {id}
        })
    }

    static async getAllGenres(): Promise<Genre[]> {
        return prisma.genre.findMany({
            include: {
                artists: {
                    include: {
                        artist: true,
                    },
                },
                paintings: true,
                exhibitions: true,
            }
        })
    }

    static async getGenreById(id: string): Promise<Genre | null> {
        return prisma.genre.findUnique({
            where: {id},
            include: {
                artists: {
                    include: {
                        artist: true
                    }
                },
                paintings: true,
                exhibitions: true,
            }
        })
    }
}