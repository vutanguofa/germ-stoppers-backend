const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  res.render('newAdmin', { loggedIn: true });
});

module.exports = router;
