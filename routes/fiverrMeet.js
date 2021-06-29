const fiverrMeetRouter = require("express").Router();
const fiverrMeet = require("../models/fiverrMeetModel");

fiverrMeetRouter.get("/", (req, res) => {
	const sqlFilters = [];

	if (req.query && req.query.region) {
		getFiverrMeetByRegion(req.query.region)
			.then((results) => {
				res.status(200).json(results);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Error fetch all fiverrmeets");
			});
	} else {
		fiverrMeet
			.getAllFiverrMeet()
			.then((results) => {
				res.status(200).json(results);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Error fetch all fiverr meets");
			});
	}
});

fiverrMeetRouter.get("/:id", (req, res) => {
	fiverrMeet
		.getFiverrMeetById(req.params.id)
		.then((results) => {
			res.status(200).json(results);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Error fetch fiverr meet");
		});
});

fiverrMeetRouter.get("user/:id", (req, res) => {
	fiverrMeet
		.getFiverrMeetByUserId(req.params.id)
		.then((results) => {
			res.status(200).json(results);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Error fetch fiverr meet");
		});
});

fiverrMeetRouter.get("/:id/user/:iduser", (req, res) => {
	fiverrMeet
		.getOneFiverrMeetByUserId(req.params.id, req.params.iduser)
		.then((results) => {
			res.status(200).json(results);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Error fetch fiverr meet");
		});
});

fiverrMeetRouter.post("/", (req, res) => {
	fiverrMeet.create(req.body)
		.then((createdfiverrMeet) => {
			res.status(201).json(createdfiverrMeet);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(`Error saving the fiverr meet: ${err.message}`);
		});
});

fiverrMeetRouter.put("/:id", (req, res) => {
	fiverrMeet
		.update(req.params.id, req.body)
		.then(() => {
			res.status(200).json({ ...req.body });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send("Error updating a fiverr meet");
		});
});

module.exports = fiverrMeetRouter;
