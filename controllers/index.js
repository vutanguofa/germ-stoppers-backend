const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const salesHistoryRoutes = require('./salesHistory-routes.js');
const newOrderRoutes = require('./newOrder-routes.js');
const processPaymentsRoutes = require('./processPayments-routes.js');
const newAdminRoutes = require('./newAdmin-routes.js');
const checkoutRoutes = require('./checkout-routes.js');

router.use('/', homeRoutes);
router.use('/salesHistory', salesHistoryRoutes);
router.use('/newOrder', newOrderRoutes);
router.use('/processPayments', processPaymentsRoutes);
router.use('/newAdmin', newAdminRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/api', apiRoutes);

module.exports = router;
