const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const slugify = require('../lib/slugify/index');

const schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		tags: {
			type: [Schema.Types.ObjectId],
			ref: 'Tag',
		},
		uploads: [
			{
				type: [Schema.Types.ObjectId],
				ref: 'Upload',
			},
		],
		url: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// schema.pre('save', function(next) {
//   console.log(this);
//   this.url = `${tr.slugify(this.title)}-${Date.now().toString(36)}`;
//   next();
// });

schema.plugin(
	URLSlugs('title', {
		field: 'url',
		generator: text => slugify(text),
	})
);

schema.set('toJSON', {
	virtuals: true,
});

module.exports = mongoose.model('Post', schema);
