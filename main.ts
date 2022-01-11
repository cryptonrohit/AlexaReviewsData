import express from "express";
const app = express();
const port = 7656;
app.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})

import alexaReviewsController from "./src/Controller/AlexaReviewsController";

app.post("/alexaReviews", alexaReviewsController.insertReviewsData);
