const connection = require("../db_config");

const db = connection.promise();

const create = ({ name, region, idmeetingType, author_id, domaine, description, date, image, ville }) => {
	return db
		.query("INSERT INTO fiverrMeet SET ?",
			{
				name,
				region,
				idmeetingType,
				author_id,
				domaine,
				description,
				date,
				image,
				ville,
			})
		.then(([result]) => {
			const fiverrMeetId = result.insertId;
			return {
				fiverrMeetId,
				name,
				region,
				idmeetingType,
				author_id,
				domaine,
				description,
				date,
				image,
				ville,
			};
		});
};

const update = (id, newData) => {
	return db.query("UPDATE user SET ? WHERE iduser = ?", [newData, id]);
};

const getFiverrMeetById = (id) => {
	return db
		.query(
			"SELECT * FROM fiverrMeet f JOIN meetingType m ON m.idmeetingType=f.idmeetingType WHERE f.idfiverrMeet = ?",
			[id]
		)
		.then(([results]) => results[0]);
};

const getFiverrMeetByUserId = (id) => {
	return db
		.query(
			"SELECT * FROM fiverrMeet f JOIN meetingType m ON m.idmeetingType=f.idmeetingType WHERE f.author_id = ?",
			[id]
		)
		.then(([results]) => results);
};

const getOneFiverrMeetByUserId = (id, author_id) => {
	return db
		.query(
			"SELECT * FROM fiverrMeet f JOIN meetingType m ON m.idmeetingType=f.idmeetingType WHERE f.idfiverrMeet = ? AND f.author_id = ?",
			[id, author_id]
		)
		.then(([results]) => results);
};

const getAllFiverrMeet = () => {
	return db
		.query("SELECT * FROM fiverrMeet")
		.then(([results]) => results);
};

const getAllFiverrMeetByRegion = (region) => {
	return db
		.query("SELECT * FROM fiverrMeet WHERE region=?", [region])
		.then(([results]) => results);
};

module.exports = {
	create,
	getFiverrMeetByUserId,
	getOneFiverrMeetByUserId,
	getAllFiverrMeetByRegion,
	getAllFiverrMeet,
	getFiverrMeetById,
	update,
};
