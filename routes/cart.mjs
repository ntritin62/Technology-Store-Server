import express from 'express';
import isAuth from '../middlewares/is-auth.mjs';
import getCartId from '../middlewares/get-cartId.mjs';

import {
  addToCart,
  deleteProductInCart,
  getProductDataInCart,
  indeCreaseQuantityProductInCart,
} from '../controllers/cartController.mjs';

const router = express.Router();

router.post('', isAuth, getCartId, addToCart);
router.delete('', isAuth, getCartId, deleteProductInCart);
router.put('/:type', isAuth, getCartId, indeCreaseQuantityProductInCart);
router.get('', isAuth, getCartId, getProductDataInCart);

export default router;
