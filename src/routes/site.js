const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/contain', siteController.contain);
router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
