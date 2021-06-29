const friendRouter = require('express').Router();
const user = require("../models/userModel");


friendRouter.get('/', (req, res) => {
  user.getAllFriends(req.params.id)
      .then((results) => {
          res.status(200).json(results);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send('Error fetch friends')
      })
});

/* friendRouter.get('/:id', (res, req) => {
  user.getAllFriends(req.params.id)
      .then((results) => {
          res.status(200).json(results);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send('Error fetch friends')
      })
}); */

module.exports = friendRouter;