const Order = require('../models/order');

module.exports = async (req, res) => {
    try{
        const {phone, address} = req.body;
        if(!phone || !address){
            req.flash('error', 'all fields are required');
            return res.redirect('/cart');
        }

        const order = new Order({
            customerId: req.user._id,
            items: req.session.cart.items,
            phone,
            address
        });

        order.save().then((result) => {
            req.flash('success', 'order placed successfully');
            delete req.session.cart;
            return res.redirect('/order');
        }).catch((err) => {
            req.flash('error', 'something went wrong');
            return res.redirect('/cart')
        });
    }catch(err){
        console.log(err);
    }
}