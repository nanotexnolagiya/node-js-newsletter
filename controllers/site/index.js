const showdown = require('showdown');
const converter = new showdown.Converter();
const Tag = require('../../models/Tag');
const Category = require('../../models/Category');
const Post = require('../../models/Post');
const dateString = require('../../lib/dateString');
const logger = require('../../lib/logger');
const randomColor = require('../../lib/random-color');

const homeAction = async (req, res) => {
    try {
        const categories = await Category.find({});
        const posts = await Post.find({}).populate('category').populate('uploads');
        const latestPosts = await Post.find({}).sort({
            createdAt: -1
        }).limit(8);

        latestPosts.map(post => {
            let date = dateString(new Date(post.createdAt));
            let content = post.content;

            return Object.assign(post, {
                date: date,
                content: converter.makeHtml(content).replace(/<\/?[^>]+>/gi, '')
            });

        });

        posts.map(post => {
            let content = post.content;

            return Object.assign(post, {
                content: converter.makeHtml(content).replace(/<\/?[^>]+>/gi, '')
            });
        });

        res.render('site/index', {
            categories,
            posts,
            latestPosts
        });
    } catch (error) {
        logger.error(error);
    }
}

const categoryAction = async (req, res) => {
    const id = req.params.id.trim().replace(/ +(?= )/g, '');

    try {
        const tags = await Tag.find({
            category: id
        });

        const cat = await Category.findById(id);
        const categories = await Category.find({});

        const catPosts = await Post.find({
            category: id
        }).populate('uploads');

        catPosts.map(post => {
            let content = post.content;

            return Object.assign(post, {
                content: converter.makeHtml(content).replace(/<\/?[^>]+>/gi, '')
            });
        });

        res.render('site/archive', {
            tags,
            cat,
            catPosts,
            categories
        });
    } catch (error) {
        logger.error(error);
    }
}

const postAction = async (req, res) => {
    const url = req.params.url;

    try {
        const post = await Post.findOne({
            url
        }).populate('uploads').populate('category');

        const categories = await Category.find({});
        post.content = converter.makeHtml(post.content);
        const color = randomColor();

        res.render('site/single', {
            post,
            categories,
            color
        });

    } catch (error) {
        logger.error(error);
        res.redirect('/404');
    }
}

module.exports = {
    homeAction,
    categoryAction,
    postAction
}