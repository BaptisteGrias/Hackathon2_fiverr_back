const userRouter = require("./user");
const messageRouter = require("./message");
const fiverrMeetRouter = require("./fiverrMeet");
const friendRouter = require("./friends");

const setupRoutes = (app) => {
    app.use('/api/users', userRouter)
    app.use('/api/messages', messageRouter)
    app.use('/api/fiverrmeets', fiverrMeetRouter)
    app.use('/api/friends', friendRouter)
}


module.exports = {
    setupRoutes,
};