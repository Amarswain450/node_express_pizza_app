const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home__controller');
const registerController = require("../controllers/register__controller");
const loginController = require("../controllers/login__controller");
const cartController = require("../controllers/cart__controller");
const updateCartController = require('../controllers/update__cart__controller');
const postRegisterController = require('../controllers/postRegister_controller');
const postLoginController = require("../controllers/postLogin__controller");
const logoutController = require('../controllers/logout__controller');

const orderController = require('../controllers/order__controller');
const getOrderController = require('../controllers/getOrder__controller');

const adminController = require('../controllers/adminController');

//middleware
const guest = require('../middleware/guest');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get("/", homeController);
router.get("/register", guest, registerController);
router.get("/login", guest, loginController);
router.get("/cart", cartController);

router.post("/update-cart", updateCartController);
router.post('/register', postRegisterController);
router.post('/login', postLoginController);
router.post('/logout', logoutController);

router.post('/order', auth, orderController);
router.get('/order', auth, getOrderController);

router.get('/admin', admin, adminController);

module.exports = router;