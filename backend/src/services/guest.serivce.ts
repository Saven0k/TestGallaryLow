import { Guest, Prisma } from "@prisma/client";
import prisma from "../config/database";

export class GuestService {
    static async getAllGuest(): Promise<Guest[]> {
        return prisma.guest.findMany({
            include: {
                exhibitions: {
                    include: {
                        exhibition: true,
                    }
                }
            }
        })
    }

    static async getGuestById(id: string): Promise<Guest | null> {
        return prisma.guest.findUnique({
            where: {id},
            include: {
                exhibitions: {
                    include: {
                        exhibition: true,
                    }
                }
            }
        }) 
    }

    static async createGuest(data: Prisma.GuestCreateInput): Promise<Guest> {
        return prisma.guest.create({
            data,
        })
    }

    static async deleteGuest(id: string): Promise<Guest> {
        return prisma.guest.delete({
            where: {id}
        })
    }
    static async updateGuest(id: string, data: Prisma.GuestUpdateInput): Promise<Guest> {
        return prisma.guest.update({
            where: {id},
            data
        })
    }
    
}