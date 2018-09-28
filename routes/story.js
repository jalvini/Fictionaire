const express = require('express');
const router = express.Router();
const StoryController = require('../controllers/StoryController');
const ChapterController = require('../controllers/ChapterController');

router.get('/', function(req, res){
    res.redirect('back');
});

router.get('/:id', StoryController.storyId);

router.get('/:id/:chap', ChapterController.chapters);

module.exports = router;