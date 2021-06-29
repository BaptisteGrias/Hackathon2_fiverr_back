const connection = require('../db_config');
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

const create = (name, firstname, email, password, region, skill, ville) => {
    return db.query('INSERT INTO user (name, firstname, email, password, region, skill, ville) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, firstname, email, password, region, skill, ville]);
}

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
        .query('SELECT * FROM user WHERE email = ?', [email])
        .then(([results]) => results[0]);
};

const getUserById = (id) => {
    return db
        .query('SELECT * FROM user u WHERE iduser=?', [id])
        .then(([results]) => results[0])
}

const getAllUsersByRegion = (region) => {
    return db
        .query('SELECT * FROM user u WHERE region=?', [region])
        .then(([results]) => results[0])
}

const getUserByConnection = (email) => {
    return db
        .query('SELECT * FROM user u WHERE email=?', [email, password])
        .then(([results]) => results[0])
}

module.exports = {
    getAllUsers,
    getUserById,
    getAllUsersByRegion,
    findByEmail,
    getUserByConnection,
    validate,
    update,
    create,
}