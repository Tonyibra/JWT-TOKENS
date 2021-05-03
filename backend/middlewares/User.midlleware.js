const express = require("express");
const User = require("../models/User.model");
async function getUsers(req, res, next) {
	let user;

	try {
		user = await User.findById(req.params.id);
		if (user == null) return;
	} catch (error) {
		res.json({ message: error.message });
	}
	res.user = user;
	next();
}

module.exports = getUsers;
