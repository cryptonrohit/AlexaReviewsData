import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { Operation } from "../../../src/Model/Operation";
import getAllReviewsByRating from "../../../src/Database/Entities/Query/GetAllReviewsByRating";
import getAlexaReviewsServiceByRating from "../../../src/Services/GetAlexaReviewsServiceByRating";

describe("GetAlexaReviewsServiceByRating tests", () => {
    let getAllReviewsByRatingStub: SinonStub;
    const ratingTestData = 2;
    const reviewsTestDataWIthRating2 = [
        {
            "review": "This app is very buggy!! I am so very tired of reading “oops something went wrong...”",
            "author": "\"Sunshine09\"",
            "review_source": "iTunes",
            "rating": 2,
            "title": "Not good",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2017-12-10T13:49:14.000Z"
        },
        {
            "review": "Amazon wants you to get used to asking alexa for everything, but while she can answer questions she can't DO simple things like simply search for bluetooth devices, tell you what she finds and you tell her the one to pair to. Nope. Anything remotely technical requires you to use this app. And this app is painful to use. It starts off tyrying to push echo dot conversations on me. It's got 3 buttons that all seem to do the same thing (start conversations with people over echos). If you tell alexa to conncet to bluetooth she tells you to use this app (why? Its the 21st century! Why cant you just find and pair without me having to manually do it in an app), but she then says to install the skill in smart home. Smart home, list devices.. Cant find bluetooth speakers. Ok, skills, i guess i have to install a stupid skill for bluetooth. The skills section of the app is a hot mess. The search funtion flatout DOES NOT WORK. On top of that, apparently we're still in the dark ages of smart devices because every vendor under the sun has their own stupid skills app they want you to install on alexa. This s reams of no standadizations yet. Alexa shouldnt need to learn \"skills\" to connect to smart devices. She has to simply because smart device manufacturers havent standardized things yet. Everyone of them wants to be primma donna with their own skill app, so in addition to painfully digging for it, you have to pray the vendor actually put time into making it work (theres a reason they have star ratings on the skills...ugh). Anyways, i have to google up how to pair alexa to bluetooth speakers (that very necessity means alexa is failing at her GD job, bc she tells me to go to this stupid app instead of doing it directly, and this app is a hot mess to use). There is a bluetooth section. But the app can only seem to find ONE device at a time. Your device didnt show up? Hit back and try again, like you're at a roullette table hoping your number comes up. Ugh! Finally my speakers show up, and the app sits there trying to connect. My phone takes like 2 seconds to connect to them when I do it through settings. But alexa (echo dot) takes forever. Why?! Then you exit, try again, but she lists them as a decice she knows BUT IS NOT PAIRED TO. PAIR TO THE GD SPEAKERS FFS! You click on them in the list, app cooks then finally pairs. Does alexa say anything to automatcally confirm she's using the speakers? No. So you have to ask her something stupid to get her to speak and see if shes using the speakers. This way more painful then it should be. You can make a list using her, but to delete it \"use the app\". Why? DELETE THE GD LIST WHEN I TELL YOU! And lists are useless. I make a list of songs. Tell alexa to play the songs in the list. Nope. She can't do that. I make a list of numbers. Give me the sum total of those numbers. Nope. They need to add WAY more functionality to lists if they're going to be of any use. They're basically one dimensional string arrays you cant do anything with. So close yet so far. Next we have the tplink smart plug amazon suggested we buy when we got the echo dot. Well we have a living room lamp thats a pita to turn on and off so it'd be great to just tell alexa to do that. Try to get that thing going is a pita in and of itself (plug in, install ANOTHER app, hook to it, hook to network, create yet another login, etc). Finally get it going as a smart plug. Now we have to pair it with alexa. Open skills, install more crap, look for device IN THE APP bc alexa is too stupid to pair using just voice, finally get them paired. \"Alexa turn on the (light name)\". \"I'm sorry I can't find that device.\" YES YOU CAN! I'M LOOKING AT IT RIGHT IN YOUR APP! I CAN EVEN USE YOUR APP TO MANUALLY TURN IT ON AND OFF! WHY CAN'T YOU VOICE COMMAND IT?! This was one of the reasons we got the echo dor and it CAN'T DO IT'S GD JOB! They need to make alexa be able to do more of this maintenance crap through her instead of this stupid app. They need to standardize smart devices and get rid of skills. But if they force you to install skills, FIX THE GD SEARCH. This app is painful and makes me want to get rid of alexa.",
            "author": "PreliminaryHerring",
            "review_source": "iTunes",
            "rating": 2,
            "title": "Painful",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2017-12-10T18:41:21.000Z"
        }
    ]

    beforeEach(() => {
        getAllReviewsByRatingStub = sinon.stub(getAllReviewsByRating, "get");
    })

    afterEach(() => {
        getAllReviewsByRatingStub.restore();
    });

    it("execute_WhenDataInDB_ShouldReturnStatusCode200", async () => {
        // Arrange
        getAllReviewsByRatingStub.returns({ data: reviewsTestDataWIthRating2, totalCount: reviewsTestDataWIthRating2.length, status: Operation.Success });
        const expectedResult = {data: reviewsTestDataWIthRating2, totalCount: reviewsTestDataWIthRating2.length, status: 200};

        // Act
        const actualResult = await getAlexaReviewsServiceByRating.execute(ratingTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenNoDataInDB_ShouldReturnStatusCode404", async () => {
        // Arrange
        getAllReviewsByRatingStub.returns({ data: [], totalCount: 0, status: Operation.NoDataFound });
        const expectedResult = {data: [], totalCount: 0, status: 404};

        // Act
        const actualResult = await getAlexaReviewsServiceByRating.execute(ratingTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("execute_WhenDBError_ShouldReturnStatusCode500", async () => {
        // Arrange
        getAllReviewsByRatingStub.returns({ status: Operation.Error });
        const expectedResult = {data: undefined, totalCount: undefined, status: 500};

        // Act
        const actualResult = await getAlexaReviewsServiceByRating.execute(ratingTestData);
    
        // Assert
        expect(actualResult).to.eql(expectedResult);
    });
})