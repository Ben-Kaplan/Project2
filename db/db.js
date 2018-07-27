const mongoose = require("mongoose")
const mongodb_uri = process.env.MONGODB_URI || "mongodb://localhost/project" 
mongoose.connect(mongodb_uri);
mongoose.connection.on("connected", () => {
	console.log("mongoose connected");
})
mongoose.connection.on("error", (err) => {
	console.log(err);
})
mongoose.connection.on("disconnected", () => {
	console.log("adios");
})