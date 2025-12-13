import { Router } from "express";
import { ExhibitionController } from "../controllers/exhibition.controller";
import { authenticateToken, requireArtist, requireGuest } from "../middleware/auth";

const exhibitionRouter = Router();
// Публичные маршруты
exhibitionRouter.get('/', ExhibitionController.getAllExhibition);
exhibitionRouter.get('/:id', ExhibitionController.getExhibitionById);

// Защищенные маршруты для художников
exhibitionRouter.post('/', authenticateToken, requireArtist, ExhibitionController.createExhibition);
exhibitionRouter.put('/:id', authenticateToken, requireArtist, ExhibitionController.updateExhibition);
exhibitionRouter.delete('/:id', authenticateToken, requireArtist, ExhibitionController.deleteExhibition);
exhibitionRouter.post('/:id/paintings', authenticateToken, requireArtist, ExhibitionController.addPaintingToExhibition);

// Защищенные маршруты для гостей
exhibitionRouter.post('/:id/guests', authenticateToken, requireGuest, ExhibitionController.addGuestToExhibition);
export default exhibitionRouter;
