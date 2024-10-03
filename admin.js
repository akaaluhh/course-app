const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_PASSWORD } = require("./config");
const { adminMiddleware } = require("./middlewares/admin");

const router = express.Router();
const { adminModel, courseModel } = require("./db");

router.use(express.json());

router.post("/signin", async (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;

    const response = await adminModel.findOne({
        email: email,
    }).select("+password");
    if (!response)
    {
        return res.status(401).json({ message: "Account does not exist !" });
    }
    else
    {
        const pwvalid = await bcrypt.compare(password, response.password, (err, result) =>
        {
            if (err)
            {
                return res.status(401).send(err);
            }
            if (result)
            {
                const token = jwt.sign({ id: response._id.toString() }, JWT_ADMIN_PASSWORD);
                return res.status(301).cookie("token", token, { httpOnly: true }).send({ message: "signed in" });
            }
            else
            {
                return res.json({ message: "Admin email or password incorrect !" });
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

router.get("/me", adminMiddleware, async (req, res) =>
{
    const userId = req.userId;

    try
    {
        const userData = await adminModel.findOne({ _id: userId });
        return res.status(302).json({
            firstName: userData.firstName,
            lastName: userData.lastName
        });
    }
    catch (err)
    {
        return res.status(500).json({ message: "error fetching admin details !" });
    }
});

router.post("/course", adminMiddleware, async (req, res) =>
{
    const userId = req.userId;

    console.log(req.body);

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
        res.status(500).send(err);
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