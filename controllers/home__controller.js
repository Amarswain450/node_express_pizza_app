const Menu = require("../models/menu");

module.exports = async (req, res) => {
    const pizzas = await Menu.find();
    return res.render("home", {pizzas: pizzas});
}