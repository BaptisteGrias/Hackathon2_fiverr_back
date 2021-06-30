const app = require("./app");
const connection = require("./db_config");
const { setupRoutes } = require("./routes/router");
const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://hacka-user:@hacka-userwcs@cluster0.axnfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("Mongoose Is Connected");
	}
);

const PORT = process.env.PORT || 8000;

setupRoutes(app);

connection.connect(function (err) {
	if (err) {
		console.error(`error connecting: ${err.stack}`);
		return;
	}

	console.log(`connected as id ${connection.threadId}`);
});

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log(`Express server listening on ${PORT}`);
	}
});
