const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/project");
mongoose.connection.on("connected", () => {
	console.log("mongoose connected");
})
mongoose.connection.on("error", (err) => {
	console.log(err);
})
mongoose.connection.on("disconnected", () => {
	console.log("adios");
})