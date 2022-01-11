import express from "express";
const app = express();
const port = 7656;
app.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})

import alexaReviewsController from "./src/Controller/AlexaReviewsController";
import db from "./src/Database/Configuration";
async function main() {
    try {
        await db.DBInstance().init();
        console.log("DB is up.");
    } catch (error) {
        console.error("Issue getting DB up", error);
    }
}
app.post("/alexaReviews", alexaReviewsController.insertReviewsData);
main();
