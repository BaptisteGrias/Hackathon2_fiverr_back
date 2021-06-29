const userRouter = require("express").Router();
const user = require("../models/userModel");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./Mongoose/user");

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

//----------------------------------------- MONGOOSE---------------------------------------------------

userRouter.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) res.send("No User Exists");
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send("Successfully Authenticated");
				console.log(req.user);
			});
		}
	})(req, res, next);
});

userRouter.post("/register", (req, res) => {
	User.findOne({ username: req.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send("User Already Exists");
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const newUser = new User({
				username: req.body.username,
				password: hashedPassword,
			});
			console.log(newUser);
			await newUser.save();
			res.send("User Created");
		}
	});
});

userRouter.get("/user", (req, res) => {
	res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

/* userRouter.post("/login", function (req, res, next) {
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

	user.getOneUser(req.body.email)
		.then((result) => {
			if (result) {
				return Promise.reject('USER_EXISTS');
			}
			return bcrypt.hash(req.body.password, 10);
		})
		.then((hashedPassword) => {
			return user.create({ ...req.body, password: hashedPassword })
		})
		.then((result) => {
			const userId = result.insertId
			res.status(201).send({ userId, ...req.body });
		})
		.catch((err) => {
			if (err === 'USER_EXISTS') {
				res.status(409).send('USER EXISTS');
			} else {
				console.log(`Error when registering: ${err.message}`);
				res.status(500).send(`Error when registering: ${err.message}`);
			}
		});
});

userRouter.get("/user", (req, res) => {
	res.send(req.user);
});
 */

module.exports = userRouter;
