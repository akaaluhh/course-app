const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("./config");
const { userMiddleware } = require("./middlewares/user");

const router = express.Router();
const { userModel, purchaseModel } = require("./db");

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
        const courses = await purchaseModel.find({ userId: userId });
        res.status(200).json(courses);
    } catch (err)
    {
        res.status(500).json({ message: "error fetching courses!" });
    }
});

module.exports = { user: router };