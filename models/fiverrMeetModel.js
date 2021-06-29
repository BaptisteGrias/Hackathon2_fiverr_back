const connection = require('../../db_config');

const db = connection.promise();

const create = ({
    name,
    region,
    idmeetingType,
    author_id,
    domaine,
    description,
    date,
    image,
}) => {
    return db
        .query('INSERT INTO fiverrMeet SET ?', {
            name,
            region,
            idmeetingType,
            author_id,
            domaine,
            description,
            date,
            image,
        })
        .then(([result]) => {
            return { name, region, description };
        });
};

const update = (id, newData) => {
    return db.query('UPDATE user SET ? WHERE idUser = ?', [newData, id]);
};

const getFiverrMeetByUserId = (id) => {
    return db
        .query('SELECT * FROM fiverrMeet f JOIN meetingType m ON m.idmeetingType=f.idmeetingType WHERE f.author_id = ?', [id])
        .then(([results]) => results)
}

const getOneFiverrMeetByUserId = (id, author_id) => {
    return db
        .query('SELECT * FROM fiverrMeet f JOIN meetingType m ON m.idmeetingType=f.idmeetingType WHERE f.idfiverrMeet = ? AND f.author_id = ?', [id, author_id])
        .then(([results]) => results)
}

module.exports = {
    create,
    getFiverrMeetByUserId,
    getOneFiverrMeetByUserId,
    update,
};