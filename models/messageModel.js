const connection = require('../../db_config');

const db = connection.promise();



const getMessageByUserId = (id) => {
    return db
        .query('SELECT * FROM message WHERE iduser_sender = ?', [id])
        .then(([results]) => results)
}

module.exports = { getMessageByUserId };