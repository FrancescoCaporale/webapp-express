const express = require("express");
const app = express();
const connection = require("./db");

const port = 3000;

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});