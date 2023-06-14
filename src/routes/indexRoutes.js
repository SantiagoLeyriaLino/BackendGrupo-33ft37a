const { Router } = require('express');

const usersRoutes = require('./UsersRoutes/indexUsers');
const productsRoutes = require('./ProductsRoutes/indexProducts');

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
