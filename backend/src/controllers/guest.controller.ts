import { GuestService } from "../services/guest.service";
import { Response, Request } from "express";
export class GuestController {
    static async getAllGuests(req: Request, res: Response) {
        try {
            const guests = await GuestService.getAllGuest();
            res.json(guests);
        } catch (error) {
            res.status(500).json({
                error: 'Ошибка сервера при получении всех гостей',
            });
        }
    }
    static async getGuestById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const guest = await GuestService.getGuestById(id);

            if (!guest) {
                return res.status(404).json({ error: 'Гость не найден' });
            }

            res.json(guest);
        } catch (error) {
            res.status(500).json({
                error: 'Ошибка сервера при получении гостя по id',
            });
        }
    }
    static async createGuest(req: Request, res: Response) {
        try {
            const guestData = req.body;
            const guest = await GuestService.createGuest(guestData);
            res.status(201).json(guest);
        } catch (error) {
            res.status(400).json({
                error: 'Ошибка сервера при создании гостя ',
            });
        }
    }
    static async updateGuest(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const guest = await GuestService.updateGuest(id, updateData);
            res.json(guest);
        } catch (error) {
            res.status(400).json({
                error: 'Ошибка сервера при обновлении гостя',
            });
        }
    }
    static async deleteGuest(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await GuestService.deleteGuest(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({
                error: 'Ошибка сервера при удалении гостя',
            });
        }
    }
}