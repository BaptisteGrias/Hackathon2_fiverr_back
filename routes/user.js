const userRouter = require('express').Router();
const user = require("../models/userModel");


userRouter.get('/', (res, req) => {
    user.getAllUsers()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch all users')
        })
});

userRouter.get('/:id', (res, req) => {
    user.getUserById(req.params.id)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch user')
        })
});






module.exports = userRouter;