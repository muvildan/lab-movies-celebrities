const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

// Create new movies
router
    .route("/create")
    .get(async (req, res) => {
        try{
            const allCelebs = await Celebrity.find()
            res.render("movies/new-movie", {allCelebs})
        } catch (err) {
            console.log(err)
        }
    })
    .post(async (req, res) => {
        try{
            const {title, genre, plot, cast} = req.body
            const createdMovie = await Movie.create({title, genre, plot, cast})
            console.log(createdMovie)

            res.redirect("/movies")
        } catch (err) {
            console.log(err)
        }
    })

    // List the movies
    router.get('/', async (req, res) => {
    try{
        const movie = await Movie.find().populate('cast')
        res.render("movies/movies", {movie})
    }
    catch (err) {
        console.log(err);
    }
    });

    // Details of specific movie
    router.get("/:id", async (req, res) => {
        try{
            const {id} = req.params
            const foundMovie = await Movie.findById(id).populate('cast')
            console.log(foundMovie)
            res.render("movies/movie-details", {movie: foundMovie})
        }
        catch(error) {
            console.log(error)
        }
    })

    // Delete by id
    router.get("/delete/:id", async (req, res) => {
        try{
            const {id} = req.params.id
            const deletedMovie = await Movie.findByIdAndDelete({id})
            res.redirect("/movies")
        }
        catch(err) {
            console.log(err)
        }
      })

module.exports = router;