const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const getUser = require("../middlewares/User.midlleware");
const bcrypt = require("bcrypt");
const { json } = require("express");
const saltRounds = 10;

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
		newUser.password = await bcrypt.hash(newUser.password, saltRounds);
		const user = await newUser.save();
		res.json(user);
	} catch (err) {
		console.log({ message: err.message });
	}
});
router.post("/login", async (req, res) => {
	const username = req.body.name;
	const password = req.body.password;

	// const dbUser = await User.findOne({ name: username });
	try {
		checkUser(username, password, res);
	} catch (err) {
		res.json({ message: err.message });
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

async function checkUser(username, passowrd, res) {
	const dbUser = await User.findOne({ name: username });

	if (username === dbUser.name) {
		const match = await bcrypt.compare(
			passowrd,
			dbUser.password,
			function (err, result) {
				if (result === true) {
					res.redirect(`/auth/${dbUser._id}`);
				}
			}
		);
	}
}

module.exports = router;
