const newsRouter = require('./news');
const siteRouter = require('./site');
const CourseRouter = require('./courses');
const meRouter = require('./me');


function route(app) {
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/courses', CourseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
