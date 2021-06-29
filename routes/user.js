const userRouter = require("express").Router();
const user = require("../models/userModel");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
require("./PassportConfig")(passport);

userRouter.get("/", (req, res) => {
	const sqlFilters = [];

	if (req.query && req.query.region) {
		getAllUsersByRegion(req.query.region)
			.then((results) => {
				res.status(200).json(results);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Error fetch all users");
			});
	} else {
		user
			.getAllUsers()
			.then((results) => {
				res.status(200).json(results);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Error fetch all users");
			});
	}

	user
		.getAllUsers()
		.then((results) => {
			res.status(200).json(results);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Error fetch all users");
		});
});

userRouter.get("/:id", (req, res) => {
	user
		.getUserById(req.params.id)
		.then((results) => {
			res.status(200).json(results);
		})
		.catch((err) => {
			res.status(500).send("Error fetch user");
		});
});

userRouter.post("/", (req, res) => {
	const { name, firstname, email, password, region, skill, ville } = req.body;

	user
		.create(name, firstname, email, password, region, skill, ville)
		.then(([result]) => {
			const userId = result.insertId;
			res.status(201).json({
				userId,
				name,
				firstname,
				email,
				password,
				region,
				skill,
				ville,
			});
		})
		.catch((err) => {
			res.status(500).send(`Error server: ${err.message}`);
		});
});

userRouter.post("/login", function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.redirect('/login'); }
		req.logIn(user, function (err) {
			if (err) { return next(err); }
			return res.redirect('/fiverr');
		});
	})(req, res, next);
});

userRouter.post("/register", (req, res) => {

	const hashPassword = async (password) => {
		return await bcrypt.hash(req.body.password, 10);
	}

	user.getOneUser({ email: req.body.email })

		.then(([results]) => {
			if (results.length) {
				res.status(409).send('USER EXISTS');
			} else {
				const hashedPassword = hashPassword(req.body.password); // bcrypt.hash(req.body.password, 10).then();
				user.create({ ...req.body, password: hashedPassword });
			}
		})
		.catch((err) => {
			res.status(500).send(`Error when registering: ${err.message}`);
		});
});

userRouter.get("/user", (req, res) => {
	res.send(req.user);
});


module.exports = userRouter;
