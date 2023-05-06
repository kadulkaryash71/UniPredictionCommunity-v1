// jslint esversion:6

const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    userToken: String,
    caption: String,
    postedAt: Date,
    lastEdited: Date,
    lastUpdated: Date,
    upvotes: Number,
});

module.exports = {
    post: PostSchema
}