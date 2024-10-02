const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_USER_PASSWORD } = require("./config");
const { userMiddleware } = require("./middlewares/user");

const router = express.Router();
const { userModel, purchaseModel, courseModel } = require("./db");

router.use(express.json());

router.post("/signin", async (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;

    const response = await userModel.findOne({
        email: email
    }).select("+password");
    if (!response)
    {
        return res.status(401).json({ message: "Account does not exist !" });
    }
    else
    {
        const pwvalid = await bcrypt.compare(`${req.body.password}`, response.password, (err, result) =>
        {
            if (err)
            {
                return res.status(401).send(err);
            }
            if (result)
            {
                const token = jwt.sign({ id: response._id.toString() }, JWT_USER_PASSWORD);
                return res.status(301).cookie("token", token, { httpOnly: true }).send({ message: "signed in" });
            }
            else
            {
                return res.json({ message: "User email or password incorrect !" });
            }
        });
    }
});

router.post("/signup", async (req, res) =>
{
    const email = req.body.email; // TODO: add zod validation
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

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

router.post("/signout", async (req, res) =>
{
    try
    {
        res.status(200).clearCookie("token");
        res.redirect("/");
    } catch (err)
    {
        return res.status(501).send(err);
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
    } catch (err)
    {
        res.status(500).json({ message: "error fetching user details !" });
    }
});

module.exports = { user: router };