const messageRouter = require('express').Router();
const message = require("../models/messageModel");


messageRouter.get('user/:id', (res, req) => {
    message.getMessageByUserId(req.params.id)
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error fetch Message')
        })
});

module.exports = messageRouter;