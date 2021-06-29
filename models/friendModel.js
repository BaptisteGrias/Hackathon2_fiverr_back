const connection = require('../../db_config');

const db = connection.promise();

const getAllFriends = (userId) => {
    const sql = `SELECT * FROM user
                JOIN friend ON iduser = user_iduser
                JOIN user ON user_iduser1 = iduser
                WHERE iduser = ?
                ORDER BY name, firstname`;
    return db.query(sql, [userId])
                .then(([results]) => results);
}


module.exports = { getAllFriends };