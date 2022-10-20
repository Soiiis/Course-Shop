const express = require('express');
const router = express.Router();

const CourseController = require('../app/controllers/CourseController');
router.post('/store', CourseController.store);
router.get('/create', CourseController.create);
router.get('/:id/edit', CourseController.edit);
router.post('/handle-form-actions',CourseController.handleFormAction)
router.put('/:id', CourseController.update);
router.patch('/:id/restore', CourseController.restore);
router.delete('/:id', CourseController.delete);
router.delete('/:id/froce', CourseController.froce);
router.get('/:slug', CourseController.show);

module.exports = router;