const Order = require('../models/order');
const moment = require('moment');

module.exports = async (req, res) => {
    try{
        const orders = await Order.find({customerId: req.user._id}, null, {sort: {createdAt: -1}});
        res.render('order', {orders: orders, moment: moment});
    }catch(err){
        console.log(err);
    }
}