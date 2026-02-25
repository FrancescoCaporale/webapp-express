const express = require("express");
const app = express();
const cors = require("cors")
const connection = require("./db");
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});


app.get("/movies", async (req, res) => {
    try {
        const [results] = await connection.query("select * from movies");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/movies/:id", async (req, res) => {

    const movieId = req.params.id;

    try {

        const [movieResult] = await connection.query(
            "select * from movies where id = ?",
            [movieId]
        );

        if (movieResult.length === 0) {
            return res.status(404).json({ message: "film non trovato" });
        }

        const [reviewsResult] = await connection.query(
            "select * from reviews where movie_id = ?",
            [movieId]
        );

        const movie = movieResult[0];
        movie.reviews = reviewsResult;

        res.json(movie);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

