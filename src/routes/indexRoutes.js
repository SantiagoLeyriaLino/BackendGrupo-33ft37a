const { Router } = require('express');

const usersRoutes = require('./UsersRoutes/indexUsers');
const productsRoutes = require('./ProductsRoutes/indexProducts');
const storeRoutes = require('./StoreRoutes/indexStore');

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/store', storeRoutes);

module.exports = router;
