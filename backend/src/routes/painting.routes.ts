import { Router } from "express";
import { PaintingController } from "../controllers/painting.controller";
import { authenticateToken, requireArtist } from "../middleware/auth";

const paintingRouter = Router();

// Публичные маршруты (чтение)
paintingRouter.get('/', PaintingController.getAllPaintings);
paintingRouter.get('/:id', PaintingController.getPaintingById);

// Защищенные маршруты (только для художников)
paintingRouter.post('/', authenticateToken, requireArtist, PaintingController.createPainting);
paintingRouter.put('/:id', authenticateToken, requireArtist, PaintingController.updatePainting);
paintingRouter.delete('/:id', authenticateToken, requireArtist, PaintingController.deletePainting);

export default paintingRouter;