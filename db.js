const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: { type: String, unique: true, required: "Your email is required." },
    password: { type: String, select: false, max: 25 },
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

User.pre("save", function (next)
{
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) =>
    {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, (err, hash) =>
        {
            if (err)
                return next(err);

            user.password = hash;
            next();
        });
    });
});

Admin.pre("save", function (next)
{
    const adminuser = this;

    if (!adminuser.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) =>
    {
        if (err)
            return next(err);
        bcrypt.hash(adminuser.password, salt, (err, hash) =>
        {
            if (err)
                return next(err);

            adminuser.password = hash;
            next();
        });
    });
});

const userModel = mongoose.model("user", User);
const adminModel = mongoose.model("admin", Admin);
const courseModel = mongoose.model("course", Course);
const purchaseModel = mongoose.model("purchase", Purchase);

module.exports = { userModel, adminModel, courseModel, purchaseModel };