const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const Admin = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});

const Purchase = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});

const userModel = mongoose.model("user", User);
const adminModel = mongoose.model("admin", Admin);
const courseModel = mongoose.model("course", Course);
const purchaseModel = mongoose.model("purchase", Purchase);

module.exports = { userModel, adminModel, courseModel, purchaseModel };