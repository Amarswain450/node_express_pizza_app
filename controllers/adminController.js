const Order = require('../models/order');
const moment = require('moment');

module.exports = async (req, res) => {
    Order.find({status: {$ne: 'completed'}}, null, {sort: {'createdAt': -1}}).
    populate('customerId', '-password').
    exec((err, orders) => {
        return res.render('admin', {orders: orders, moment: moment})
    });
}