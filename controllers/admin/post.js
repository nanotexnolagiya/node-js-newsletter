const Tag = require('../../models/Tag');
const Category = require('../../models/Category');
const Post = require('../../models/Post');
const TurndownService = require('turndown');
const turndownService = new TurndownService();
const showdown = require('showdown');
const converter = new showdown.Converter();
const logger = require('../../lib/logger');
const alias = 'post';

const all = async (req, res) => {
    const { userId, userName } = req.session;

    if (!userId || !userName) {
        res.redirect('/');
        return;
    }

    try {
        const posts = await Post.find({}).populate('uploads').populate('category');

        res.render('admin/posts/index', {
            user: {
                id: userId,
                name: userName
            },
            posts,
            alias
        });
    } catch (error) {
        logger.error(error);
    }
}

const add = async (req, res) => {
    const { userId, userName } = req.session;

    if (!userId || !userName) {
        res.redirect('/');
        return;
    }

    try {
        const categories = await Category.find({});

        res.render('admin/posts/add', {
        user: {
            id: userId,
            name: userName
        },
        categories,
        alias
        });
    } catch (error) {
        logger.error(error)
    }
}

const create = async (req, res) => {
    const { userId, userName } = req.session;

    if (!userId || !userName) {
        res.redirect('/');
        return;
    }

    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const content = turndownService.turndown(req.body.content.trim());
    const category = req.body.category;
    const tags = req.body.tags;
    const uploads = req.body.imageIds;

    if (!title || !category) {
        const fields = [];
        if (!title) fields.push('title');
        if (!category) fields.push('category');

        res.json({
            ok: false,
            error: 'Заполните поле!',
            fields
        });
    } else {
        try {
            const post = await Post.create({
                title,
                content,
                category,
                tags,
                uploads
            });

            res.json({
                ok: true
            });

        } catch (error) {
            logger.error(error);
            res.json({
                ok: false
            });
        }
    }
}

const edit = async (req, res) => {
    const { userId, userName } = req.session;
    const id = req.params.id.trim().replace(/ +(?= )/g, '');

    if (!userId || !userName) {
        res.redirect('/');
        return;
    }

    try {
        const post = await Post.findById(id).populate('uploads');
        const categories = await Category.find({});
        const tags = await Tag.find({});

        const content = converter.makeHtml(post.content);

        res.render('admin/posts/edit', {
            user: {
                id: userId,
                name: userName
            },
            categories,
            post,
            tags,
            content,
            alias
        });
    }catch (error) {
        logger.error(error);
    }
}

const update = async (req, res) => {
    const { userId, userName } = req.session;

    if (!userId || !userName) {
        res.redirect('/');
        return;
    }

    const title = req.body.title.trim().replace(/ +(?= )/g, '');
    const content = turndownService.turndown(req.body.content.trim());
    const category = req.body.category;
    const tags = req.body.tags;
    const id = req.body.id.trim().replace(/ +(?= )/g, '');
    const uploads = req.body.imageIds;

    try {
        await Post.update({ _id: id }, { title, content, category, tags, uploads });

        res.json({
            ok: true
        });
    } catch (error) {
        logger.error(error);
        res.json({
            ok: false
        });
    }
}

const deleted = async (req, res) => {
    const { userId, userName } = req.session;
    const id = req.body.id.trim().replace(/ +(?= )/g, '');

    if (!userId || !userName) {
        res.redirect('/');
        return;
    }

    try {
        await Post.remove({_id: id});

        res.json({
            ok: true
        });
    } catch (error) {
        logger.error(error);
        res.json({
            ok: false
        });
    }
}

module.exports = {
    all,
    add,
    create,
    edit,
    update,
    deleted
}