import { Router } from 'express';
import { GuestController } from '../controllers/guest.controller';
import { authenticateToken, requireGuest } from '../middleware/auth';

const guestRouter = Router();
// Публичные маршруты
guestRouter.get('/', GuestController.getAllGuests);
guestRouter.get('/:id', GuestController.getGuestById);

// Защищенные маршруты (только для гостей)
guestRouter.post('/', GuestController.createGuest); // Регистрация через auth
guestRouter.put('/:id', authenticateToken, requireGuest, GuestController.updateGuest);
guestRouter.delete('/:id', authenticateToken, requireGuest, GuestController.deleteGuest);


export default guestRouter;