const fiverrMeetRouter = require('express').Router();
const fiverrMeet = require("../models/fiverrMeetModel");


fiverrMeetRouter.get('user/:id', (res, req) => {
    message.getFiverrMeetByUserId(req.params.id)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch fiverrMeet')
        })
});

fiverrMeetRouter.get('/:id/user/:iduser', (res, req) => {
    message.getOneFiverrMeetByUserId(req.params.id, req.params.iduser)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch fiverrMeet')
        })
});

fiverrMeetRouter.post('/', (req, res) => {
    fiverrMeet.create(req.body)
        .then((createdfiverrMeet) => {
            res.status(201).json(createdfiverrMeet);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error saving the fiverrMeet');
        });
});

fiverrMeetRouter.put('/:id', (req, res) => {
    User.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ ...req.body });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error updating a fiverrMeet');
        });
});

module.exports = fiverrMeetRouter;