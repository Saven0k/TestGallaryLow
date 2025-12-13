import { Exhibition, Prisma } from "@prisma/client";
import prisma from "../config/database";

export class ExhibitionService {
    static async createExhibition(data: Prisma.ExhibitionCreateInput): Promise<Exhibition> {
        return prisma.exhibition.create({
            data,
        })
    }
    static async getAllExhibitions(): Promise<Exhibition[]> {
        return prisma.exhibition.findMany({
            include: {
                author: true,
                genre: true,
                paintings: {
                    include: {
                        painting: true
                    }
                },
                guests: {
                    include: {
                        guest: true
                    }
                }
            }
        })
    }
    static async getExhibitionById(id: string): Promise<Exhibition | null> {
        return prisma.exhibition.findUnique({
            where: { id },
            include: {
                author: true,
                genre: true,
                paintings: {
                    include: {
                        painting: true,
                    }
                },
                guests: {
                    include: {
                        guest: true,
                    }
                }
            }
        })
    }

    static async updateExhibition(id: string, data: Prisma.ExhibitionUpdateInput): Promise<Exhibition> {
        return prisma.exhibition.update({
            where: {
                id
            },
            data
        })
    }
    static async deleteExhibition(id: string): Promise<Exhibition> {
        return prisma.exhibition.delete({
            where: { id }
        })
    }

    static async addPaintingToExhibition(exhibitionId: string, paintingId: string): Promise<void> {
        await prisma.paintingExhibition.create({
            data: {
                exhibition_id: exhibitionId,
                painting_id: paintingId,
            },
        });
    }
    static async addGuestToExhibition(exhibitionId: string, guestId: string): Promise<void> {
        await prisma.exhibitionGuest.create({
            data: {
                exhibition_id: exhibitionId,
                guest_id: guestId,
            },
        });
    }
}