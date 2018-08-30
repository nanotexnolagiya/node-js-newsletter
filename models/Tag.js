const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Tag', schema);
