import { Router } from 'express';
import { router as sessionRouter } from './sessions.routes.js'
import { router as prodRouter } from './product.routes.js'
import { router as cartRouter } from './cart.routes.js'

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.initRouter();
    }
    initRouter() {
        this.router.use(sessionRouter)
        this.router.use(cartRouter)
        this.router.use(prodRouter);
    }
    getRouter() {
        return this.router;
    }
}