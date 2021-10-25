const passport = require('passport');

module.exports = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        req.flash('error', 'All fields are required');
        return res.redirect("/login");
    }
    try{
        passport.authenticate('local', (err, user, info) => {
            if(err){
                req.flash('error', info.message);
                return next(err);
            }

            if(!user){
                req.flash('error', info.message);
                return res.redirect('/login');
            }

            req.login(user, (err) => {
                if(err){
                    req.flash('error', info.message);
                    return next(err);
                }else{
                    return res.redirect(req.user.role === "admin" ? '/admin' : '/order')
                }
            })
        })(req, res, next);
    }catch(err){
        console.log(err);
    }
}