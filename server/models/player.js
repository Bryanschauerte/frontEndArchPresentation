"use strict";
module.exports = (sequelize, DataTypes) => {
	const Player = sequelize.define(
		"Player",
		{
			name: DataTypes.STRING,
			wins: DataTypes.STRING
		},
		{}
	);
	Player.associate = function(models) {
		// associations can be defined here
	};
	return Player;
};
