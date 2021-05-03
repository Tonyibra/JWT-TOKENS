const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const getUser = require("../middlewares/User.midlleware");
//get

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.json({ message: err.message });
	}
});
router.get("/:id", getUser, (req, res) => {
	res.json(res.user);
});

//POST

router.post("/register", async (req, res) => {
	const newUser = new User({
		name: req.body.name,
		password: req.body.password,
	});

	try {
		const user = await newUser.save();
		res.json(user);
	} catch (err) {
		console.log({ message: err.message });
	}
});

router.patch("/:id", getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.password != null) {
		res.user.password = req.body.password;
	}
	try {
		const updatedUser = await user.save();
		res.status(201).json(updatedUser);
	} catch (err) {
		res.json({ message: err.message });
	}
});

router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json("User Removed");
	} catch (err) {
		res.json({ message: err.message });
	}
});
module.exports = router;
