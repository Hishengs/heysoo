module.exports = (sequelize, DataTypes) => {

	const userModel = sequelize.define('user',{
		user_id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},{
		tableName: 'user'
	});

	return userModel;
}