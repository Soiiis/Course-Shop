const Course = require('../models/Course');
const {mutipleMoongooseToObject} = require('../../utils/moogose')
class MeController {
   
   
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([courseQuery,Course.countDocumentsDeleted()])
            .then(([courses ,deletedCount]) => 
                res.render('me/stored-Courses',{
                    deletedCount,
                    courses: mutipleMoongooseToObject(courses)
            }))
            .catch(next);
       
    }
    // [GET] /me/trash/courses

    trashCourses(req, res, next) {
        Course.findDeleted()
            .then(courses => res.render('me/trash-Courses',{
                courses: mutipleMoongooseToObject(courses)
            }))
            .catch(next);
    }
   
}

module.exports = new MeController();
