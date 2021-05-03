const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const url =
	"mongodb+srv://admin:admin@cluster0.vjc67.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());
app.options("*", cors());
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (err) => json.send(err));
db.once("open", () => {
	console.log("connected to database");
});

const authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);
app.listen(5000, () => console.log("server is running"));
