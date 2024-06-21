import express from 'express';
import * as productController from '../controller/product.controller.js';

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.del);

export default router;
