// jslint esversion:6

require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

/* mongoose init start */
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/urpg_community");

const PostSchema = mongoose.Schema({
    userToken: { type: String },
    caption: { type: String },
    postedAt: { type: Date },
    file: { type: String },
    lastEdited: { type: Date },
    lastUpdated: { type: Date },
    upvotes: { type: Number },
});

const PeopleSchema = mongoose.Schema({
    username: { type: String },
    bio: { type: String },
    university: { type: String },
    followers: { type: Number },
    following: { type: Number },
    dateJoined: { type: Date },

});

const Post = mongoose.model("Post", PostSchema);
const Person = mongoose.model("Person", PeopleSchema);
/* mongoose init end */

const app = express();
app.use(bodyParser.json(
    { limit: "5mb" }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*"
}));
app.use(fileUpload());

app.post("/community/signup", (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const newUser = new Person({
        userToken: req.body.userToken,
        caption: req.body.caption,
        postedAt: Date(),
        lastEdited: Date(),
        lastUpdated: Date(),
        upvotes: 0,
    });
    try {
        newUser.save();
        res.status(200).send({ message: "registered successfully" });
    } catch (e) {
        console.log("error occurred", e);
    }
})

app.get("/community/people", (req, res) => {
    Person.find({})
        .then(data => res.send(data))
        .catch(e => console.error(e));
});

app.get("/community/posts", (req, res) => {
    Post.find({})
        .then(data => res.send(data))
        .catch(e => console.error(e))
});

app.get("/community/:search", async (req, res) => {
    const query = req.params.search;
        const captionMatches = await Post.find({ "caption": { "$regex": query, "$options": "i" } })
        const userMatches = await Post.find({ "userToken": { "$regex": query, "$options": "i" } })
        const nameMatches = await Person.find({ "fullName": { "$regex": query, "$options": "i" } })
        const uniMatches = await Person.find({ "university": { "$regex": query, "$options": "i" } })
        const cityMatches = await Person.find({ "city": { "$regex": query, "$options": "i" } })

        var union = [...new Set([...captionMatches, ...userMatches, ...nameMatches, ...uniMatches, ...cityMatches])];
        res.send(union);
});

app.post("/community/post", (req, res) => {
    console.log(req.body);
    const newPost = new Post({
        userToken: req.body.userToken,
        caption: req.body.caption,
        file: req.body.file,
        postedAt: Date(),
        lastEdited: Date(),
        lastUpdated: Date(),
        upvotes: 0,
    });
    try {
        newPost.save();
        res.status(200).send({ message: "saved successfully" });
    } catch (e) {
        console.log("error occurred", e);
    }
});



app.listen(5001, () => console.log("Server running on port 5001"));