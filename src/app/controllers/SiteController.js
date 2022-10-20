const Course = require('../models/Course');
const {mutipleMoongooseToObject} = require('../../utils/moogose')
class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then(courses =>  
                {
                    
                    res.render('home', { courses :mutipleMoongooseToObject(courses) })
                })
            .catch(next)
        // res.render('home');
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
    // [GET /contain]
    contain(req, res) {
        res.render('contain');
    }
}

module.exports = new SiteController();
