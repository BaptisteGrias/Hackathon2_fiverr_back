const messageRouter = require('express').Router();
const message = require("../models/messageModel");

messageRouter.post('/', (req, res) => {
    message.create(req.body)
        .then((createdMessage) => {
            res.status(201).json(createdMessage);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating a message');
        });
});

messageRouter.get('user/:id/duser/:duid', (res, req) => {
    message.getMessages(req.params.id, req.params.duid)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch Message')
        })
});

module.exports = messageRouter;