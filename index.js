const app = require("./app");
const connection = require("./db_config");
const { setupRoutes } = require("./routes/router");

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
