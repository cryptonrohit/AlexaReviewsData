import express from "express";
import upload from "express-fileupload";
const app = express();
app.use(upload());
const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})

import alexaReviewsController from "./src/Controller/AlexaReviewsController";
import db from "./src/Database/Configuration";
import getReviewsDataByRatingMiddleware from "./src/Middleware/GetReviewsDataByRatingMiddleware";
import getReviewsDataMiddleware from "./src/Middleware/GetReviewsDataMiddleware";
import insertReviewsDataMiddleware from "./src/Middleware/InsertReviewsDataMiddleware";

async function main() {
    try {
        await db.DBInstance().init();
        console.log("DB is up.");
    } catch (error) {
        console.error("Issue getting DB up", error);
    }
}

app.post("/alexaReviews", insertReviewsDataMiddleware.validate, alexaReviewsController.insertReviewsData);
app.get("/alexaReviews", getReviewsDataMiddleware.validate, alexaReviewsController.getReviewsData);
app.get("/alexaReviews/:rating", getReviewsDataByRatingMiddleware.validate, alexaReviewsController.getReviewsDataByRating);

main();
