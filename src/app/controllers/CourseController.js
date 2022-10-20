const Course = require('../models/Course');
const {mutipleMoongooseToObject , moogooseToObject} = require('../../utils/moogose')
class CourseController {
    show(req, res, next) {
        //[GET] /course/:slug
        Course.findOne({slug: req.params.slug})
            .then(course =>{
                res.render('course/show', {course : moogooseToObject(course)})
            })
            .catch(next)
    }

    create(req, res, next) {
        //[GET] /course/create
       res.render('course/create')
    }
    store(req, res, next) {
        //[POST] /course/store
        // res.json(req.body)
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`  
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    edit(req, res, next) {
        //[GET] /course/:id/edit
        Course.findById(req.params.id)
            .then(course => res.render('course/edit',{
                course: moogooseToObject(course)
            }))
            .catch(next)
    }
    //[PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({_id : req.params.id}, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next)
    }
    //[DEL] /course/:id
    delete(req, res, next) {
        Course.delete({_id : req.params.id}, )
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next)

    }
    //[PATCH] /course/:id/restore
    restore(req,res,next) {
        Course.restore({_id : req.params.id}, )
            .then(() => res.redirect("back"))
            .catch(next)
    }
     //[DEL] /course/froce
    froce(req,res,next) {
        Course.deleteOne({_id : req.params.id}, )
        .then(() => res.redirect("back"))
        .catch(next)

    }
    //[PATCH] /courses/handle-form-actions
    handleFormAction(req,res,next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id : {$in : req.body.courseIds}}, )
                .then(() => res.redirect("back"))
                .catch(next)
                break;
            default: 
                res.json({message: 'Action is invalid.'});
        }
    }
}

module.exports = new CourseController();
