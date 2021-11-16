const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// List the celebrities
router.get('/', (req, res) => {
    Celebrity.find()
    .then(celebrity => res.render("celebrities/celebrities", {celebrity}))
  });

// Create new celebrities
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})
.post ("/create", async (req, res) => {
    try{
        const {name, occupation, catchPhrase} = req.body
        let createdCeleb = await Celebrity.create({
            name, 
            occupation, 
            catchPhrase
    });
    console.log(createdCeleb);
    res.redirect("/celebrities")
}
    catch (err){
        console.log(err)
        res.render("/celebrities/new-celebrity")
    }
})



module.exports = router;