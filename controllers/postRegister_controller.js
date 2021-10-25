const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    const {name, email, password} = req.body;

    //validate
    if(!name || !email || !password){
        req.flash('error', 'All fields are required.');
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect('/register');
    }

    //check email
    User.exists({email: email}, (err, result) => {
        if(result){
            req.flash('error', 'Email is already exists');
            req.flash('name', name);
            req.flash('email', email);
            return res.redirect('/register');
        }
    });

    //hashed password
    const generateSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, generateSalt);

    //create a new user
    user = new User({
        name,
        email,
        password: hashedPassword
    });

    user.save().then((user) => {
        return res.redirect('/');
    }).catch((err) => {
        req.flash('error', 'Email is already exists');
        return res.redirect('/register');
    })

}