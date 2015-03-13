/**
 * RoomMember.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		user: {
			model: 'User'
		},
		room: {
			model: 'Room'
		},
		role: {
			type: 'string',
			enum: ['member', 'administrator', 'owner'],
			defaultsTo: 'member'
		}
	}
};

