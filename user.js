const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("./config");
const { userMiddleware } = require("./middlewares/user");

const router = express.Router();
const { userModel, purchaseModel, courseModel } = require("./db");

router.use(express.json());

router.post("/signin", async (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);
    // TODO: when DB password is hashed, user provided pw can't be directly compared with DB pw (using bcrypt)
    const response = await userModel.findOne({
        email: email,
        password: password
    });

    if (response)
    {
        const token = jwt.sign({ id: response._id.toString() }, JWT_USER_PASSWORD);
        res.status(301).cookie("token", token, { httpOnly: true }).send({ message: "signed in" });
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
        await userModel.create({
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

router.get("/courses", userMiddleware, async (req, res) =>
{
    const userId = req.userId;

    try
    {
        const purchasedCourseData = await purchaseModel.find({ userId: userId });

        const purchasedCourses = [];
        for (let i = 0; i < purchasedCourseData.length; i++)
        {
            const courseId = purchasedCourseData[i].courseId;
            const courseData = await courseModel.findOne({ _id: courseId });
            purchasedCourses.push(courseData);
        }

        res.status(200).json({ purchasedCourses });
    } catch (err)
    {
        res.status(500).json({ message: "error fetching courses!" });
    }
});

router.get("/me", userMiddleware, async (req, res) =>
{
    const userId = req.userId;

    try
    {
        const userData = await userModel.findOne({ _id: userId });
        res.status(302).json({
            firstName: userData.firstName,
            lastName: userData.lastName
        });
        console.log(userData);
    } catch (err)
    {
        res.status(500).json({ message: "error fetching user details !" });
    }
});

module.exports = { user: router };