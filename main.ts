import express from "express";
import upload from "express-fileupload";
const app = express();
app.use(upload());
const port = 7656;

app.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})

import alexaReviewsController from "./src/Controller/AlexaReviewsController";
import db from "./src/Database/Configuration";
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
app.get("/alexaReviews", alexaReviewsController.getReviewsData);
main();
