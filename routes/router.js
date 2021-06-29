const userRouter = require("./user");
const messageRouter = require("./message");
const fiverrMeetRouter = require("./fiverrMeet");

const setupRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/message', messageRouter)
    app.use('/api/fiverrmeet', fiverrMeetRouter)
}


module.exports = {
    setupRoutes,
};