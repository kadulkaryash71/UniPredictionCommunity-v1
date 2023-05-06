# UniPredictionCommunity-v1
Backend for the "Community" module of University Prediction for Abroad Studies using Machine Learning

This is a separate repository for the backend. You may clone the frontend repository from:
[University Prediction Client](https://github.com/kadulkaryash71/UniRecommendationClient.git "Pull and Run this repository separately")
You may also find other relevant information of the system on the given repository. 

I recommend you to run
`npm install`
before running the server

Posts and People work using MongoDB. Install MongoDB using the following link:

https://www.mongodb.com/try/download/shell

for shell experience or,

https://www.mongodb.com/try/download/compass

for MongoDB with GUI.

Run MongoDB before running the server to avoid errors.
On Command Prompt/Terminal, run `mongod` to keep MongoDB running in the background.

To keep track of the documents, on the command prompt run `mongosh` if you installed MongoDB shell.
Then, run `use urpg-community` to switch the database to urpg-community.
Then, run `db.posts.find()` to see all the documents in the posts collection.
Also you can run `db.people.find()` to see all the documents in the people collection.
If you add your own documents, please follow the schemas in `app.js` so the system runs error free.

To run the server, run the following command:
`node app.js`
Alternatively, using nodemon:
`nodemon app.js`

While development, the NodeJS version used is- node v16.17.0
