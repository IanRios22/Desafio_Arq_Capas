import { Router } from "express";
import { cartId, cartAddProduct, cartCreate, cartAndProductUpdate, cartDelete, cartList, cartProdDelete, cartDeleteAll, cartUpdate } from "../controllers/carts.controller.js";
export const router = Router();

router.get('/carts/list', cartList);
router.get('/carts/:cid', async (req, res) => {
    const cartData = await cartId(req, res);
    res.json(cartData);
})
router.put('/carts/:cid', cartUpdate);
router.put('/carts/:cid/products/:pid', cartAndProductUpdate);

router.post('/carts/create', cartCreate);
router.post('/carts/:cid/products/:pid', cartAddProduct);

router.delete('/carts/cartDelete/:cid', cartDelete);
router.delete('/carts/:cid/prodDelete/:pid', cartProdDelete);
router.delete('/carts/:cid', cartDeleteAll);