import { Router } from "express";
import { productFilter, prodAdd, prodDelete, prodId, prodUpdate } from "../controllers/products.controller.js";
export const router = Router();

router.get('/', async (req, res) => {
    const prodData = await productFilter(req, res);
    res.json(prodData);
})
router.get('/products/:pid', prodId);
router.post('/products/add', prodAdd);
router.put('/products/:pid', prodUpdate);
router.delete('/products/:pid', prodDelete);