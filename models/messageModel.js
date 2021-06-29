const connection = require('../db_config');

const db = connection.promise();

const create = ({
    title, 
    text,
    iduser_sender,
    iduser_dest
}) => {
    return db
        .query('INSERT INTO message (title, text, iduser_sender, iduser_dest) VALUES (?, ?, ?, ?)', {
            title, 
            text,
            iduser_sender,
            iduser_dest
        })
        .then(([result]) => {
            const messageId = result.insertId;
            return { messageId, title, text, iduser_sender, iduser_dest };
        });
};

const getMessageByUserId = (id) => {

    const sql = `SELECT * from user
    JOIN message ON iduser = iduser_sender
    JOIN user ON iduser_dest = iduser
    ORDER BY date`;

    return db
        .query(sql, [id])
        .then(([results]) => results)
}

module.exports = { getMessageByUserId };