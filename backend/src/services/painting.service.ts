import { Painting, Prisma } from "@prisma/client";
import prisma from "../config/database";

export class PaintingService {
    static async createPainting(data: Prisma.PaintingCreateInput): Promise<Painting>{
        return prisma.painting.create({
            data,
        })
    }

    static async getPaintingById(id: string): Promise<Painting | null> {
        return prisma.painting.findUnique({
            where: {id},
            include: {
                author: true,
                genre: true,
                exhibitions: {
                    include: {
                        exhibition: true,
                    }
                }
            }
        })
    }

    static async getAllPaintings(): Promise<Painting[]> {
        return prisma.painting.findMany({
            include: {
                author: true,
                genre: true,
            }
        })
    }

    static async deletePainting(id: string): Promise<Painting | null> {
        return prisma.painting.delete({
            where: {id},
        })
    }
    
    static async updatePainting(id: string, data: Prisma.PaintingUpdateInput):Promise<Painting> {
        return prisma.painting.update({
            where: {id},
            data,
        })
    }
}