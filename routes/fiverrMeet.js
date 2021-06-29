const fiverrMeetRouter = require('express').Router();
const fiverrMeet = require("../models/fiverrMeetModel");


fiverrMeetRouter.get('/', (res, req) => {

    const sqlFilters = [];

    if(req.query.region){
        getFiverrMeetByRegion(req.query.region)
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch all fiverrmeets')
        })
    } else {
        user.getAllFiverrMeet()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch all fiverr meets')
        })        
    }
});

fiverrMeetRouter.get('/:id', (res, req) => {
    message.getFiverrMeetById(req.params.id)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch fiverr meet')
        })
});

fiverrMeetRouter.get('user/:id', (res, req) => {
    message.getFiverrMeetByUserId(req.params.id)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch fiverr meet')
        })
});

fiverrMeetRouter.get('/:id/user/:iduser', (res, req) => {
    message.getOneFiverrMeetByUserId(req.params.id, req.params.iduser)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch fiverr meet')
        })
});

fiverrMeetRouter.post('/', (req, res) => {
    fiverrMeet.create(req.body)
        .then((createdfiverrMeet) => {
            res.status(201).json(createdfiverrMeet);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving the fiverr meet');
        });
});

fiverrMeetRouter.put('/:id', (req, res) => {
    User.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ ...req.body });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error updating a fiverr meet');
        });
});

module.exports = fiverrMeetRouter;