const { Router } = require('express');

const usersRoutes = require('./UsersRoutes/indexUsers');
const productsRoutes = require('./ProductsRoutes/indexProducts');
const storeRoutes = require('./StoreRoutes/indexStore');
const reviewsRoutes = require('./ReviewsRoutes/indexReviews')
const paymentMethodRoutes = require('./PaymentRoutes/indexPayment')
const purchaseRoutes = require('./PurchaseRoutes/indexPurchase')
const transactionsRoutes = require('./TransactionsRoutes/indexTransactions')
const newsletterRoutes = require('./newsletterRoutes/indexNewsletter')
const contactUs = require('./contactUsRoutes/indexContactUs')


const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/store', storeRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/transactions', transactionsRoutes)
router.use('/payment',paymentMethodRoutes)
router.use('/newsletter',newsletterRoutes)
router.use('/purchase', purchaseRoutes)
router.use('/contactUs', contactUs)


module.exports = router;
