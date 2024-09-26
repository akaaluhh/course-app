const express = require("express");
const router = express.Router();
const { courseModel, purchaseModel } = require("./db");
const { userMiddleware } = require("./middlewares/user");

router.use(express.json());

router.post("/purchase", userMiddleware, async (req, res) =>
{
    const userId = req.userId;
    const courseId = req.body.courseId;

    try
    {
        const purchaseData = purchaseModel.create({ courseId: courseId, userId: userId });
        res.status(200).json({ message: "Succesfully purchased course !" });
    } catch (err)
    {
        res.status(500).json({ message: "Failed to purchase course!" });
    }
});

router.get("/preview", async (req, res) =>
{
    const courses = await courseModel.find({});

    res.json({ courses });
});

module.exports = { course: router };