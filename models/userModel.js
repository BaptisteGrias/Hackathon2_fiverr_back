const connection = require('../../db_config');
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        name: Joi.string().max(45).presence(presence),
        firstname: Joi.string().email().max(255).presence(presence),
        password: Joi.string().min(8).max(50).presence(presence),
        email: Joi.string().max(255).presence(presence),
        region: Joi.string().max(45).presence(presence),
        skills_idskills: Joi.number().max(45).presence(presence),
    }).validate(data, { abortEarly: false }).error;
};

const update = (id, newData) => {
    return db.query('UPDATE user SET ? WHERE iduser = ?', [newData, id]);
};

const getAllUsers = () => {
    return db
        .query('SELECT * FROM user')
        .then(([results]) => results)
}

const findByEmail = (email) => {
    return db
        .query('SELECT * FROM User WHERE email = ?', [email])
        .then(([results]) => results[0]);
};

const getUserById = (id) => {
    return db
        .query('SELECT * FROM user u WHERE id=?', [id])
        .then(([results]) => results[0])
}

module.exports = {
    getAllUsers,
    getUserById,
    findByEmail,
    validate,
    update,
}