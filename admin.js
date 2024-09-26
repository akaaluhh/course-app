const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("./config");
const { adminMiddleware } = require("./middlewares/admin");

const router = express.Router();
const { adminModel, courseModel } = require("./db");

router.use(express.json());

router.post("/signin", async (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;

    // TODO: when DB password is hashed, user provided pw can't be directly compared with DB pw (using bcrypt)
    const response = await adminModel.findOne({
        email: email,
        password: password
    });

    if (response)
    {
        const token = jwt.sign({ id: response._id.toString() }, JWT_ADMIN_PASSWORD);
        res.status(200).cookie("token", token, { httpOnly: true }).json({ token: token });
    }
    else
    {
        res.status(403).json({ message: "incorrect credentials !" });
    }
});

router.post("/signup", async (req, res) =>
{
    const email = req.body.email; // TODO: add zod validation
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    // TODO: hash the password so plaintext pw is not stored in DB

    try
    {
        await adminModel.create({
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
        });
        res.status(200).json({ message: "user created !" });
    } catch (err)
    {
        res.status(501).json({ message: "user email in use!" });
    }
});

router.post("/course", adminMiddleware, async (req, res) =>
{
    const userId = req.userId;

    try
    {
        const course = await courseModel.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            creatorId: userId
        });
        res.status(200).json({ message: "course created !", courseId: course._id });
    } catch (err)
    {
        res.status(500).json({ message: "error creating the course !" });
    }
});

router.put("/course", adminMiddleware, async (req, res) =>
{
    const userId = req.userId;

    const { title, description, price, imageUrl, courseId } = req.body;
    try
    {
        const course = await courseModel.updateOne({ _id: courseId, creatorId: userId }, {
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl
        });
        res.status(200).json({ message: "course updated succesfully !" });
    } catch (err)
    {
        res.status(500).json({ message: "error updating course !" });
    }
});

router.get("/course/bulk", adminMiddleware, async (req, res) =>
{
    const userId = req.userId;
    try
    {
        const courses = await courseModel.find({ creatorId: userId });
        res.json(courses);
    } catch (err)
    {
        res.status(500).json({ message: "error fetching courses !" });
    }
});

module.exports = { admin: router };