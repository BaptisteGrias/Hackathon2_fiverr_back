const userRouter = require('express').Router();
const user = require("../models/userModel");


userRouter.get('/', (res, req) => {

    const sqlFilters = [];

    if(req.query && req.query.region){
        getAllUsersByRegion(req.query.region)
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch all users')
        })
    } else {
        user.getAllUsers()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch all users')
        })        
    }

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


userRouter.post('/', (req, res) => {
    const { name, firstname, email, password, region, skill, ville } = req.body;

    user.create(name, firstname, email, password, region, skill, ville)
        .then(([result]) => 
        {
            const userId = result.insertId;
            res.status(201).json({ userId, name, firstname, email, password, region, skill, ville });
        })
        .catch((err) => {
            res.status(500).send(`Error server: ${err.message}`)
        });
})

module.exports = userRouter;