# AlexaReviewsData
Store reviews of alexa app for itunes and playstore.

1. Heroku link to access app: https://damp-reef-06935.herokuapp.com/
2. Swagger details: https://damp-reef-06935.herokuapp.com/api-docs/
3. Github link for my code: https://github.com/cryptonrohit/AlexaReviewsData

POSTMAN OPERATIONS IN DETAILS:
1. POST (To insert uploaded reviews data):
             - POST URL: https://damp-reef-06935.herokuapp.com/alexaReviews
             - In Body > Select form-data > Select File in key section> give key name as " reviewsFile" > in value upload the "alexa.json" file attached.
2. GET (Get all the reviews(if no filters passed), or else on basis of filters):
             - GET URL: https://damp-reef-06935.herokuapp.com/alexaReviews/fetchReviews
             - In Query params > filters passed are:
                    storeType: iTunes or GooglePlayStore
                    rating: any rating between 1-5.
                    from: 2017-01-01T00:00:00.000Z
                    to: 2017-10-01T00:00:00.000Z
              - filters are optional
3. GET (Get all the month wise ratings data on basis of store i.e, either iTunes or GooglePlayStore):
              - GET URL: https://damp-reef-06935.herokuapp.com/alexaReviews/averageMonthlyRatings
              - In Query params > filter passed:
                     storeType: iTunes or GooglePlayStore
              - filter is optional
4. GET (Get all reviews on the basis of rating):
              - GET URL: https://damp-reef-06935.herokuapp.com/alexaReviews/{rating}
              - {rating} - any rating between 1-5. 


