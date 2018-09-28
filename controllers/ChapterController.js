const Chapters = require('../models/chapters');
const Story = require('../models/stories');

exports.chapters = (req, res) => {
    const story = req.params.id;
    const chapNum = req.params.chap;
    const nextChapNum = Number(chapNum) + Number(1);
    Chapters.findOne({storyId:story, chapter:chapNum}, (err, chapter) =>{
        Chapters.findOne({storyId:story, chapter:nextChapNum}, (err, nextChap) => {
            Story.findOne({_id: story}, (err, story) => {
                if (chapter !== null) {
                    if(chapNum > 1){
                        const lastChapNum = Number(chapNum) - Number(1);
                        res.render('story/chapter', {chapter: chapter, story: story, nextChap, nextChapNum, lastChapNum});
                    }
                    else {
                        res.render('story/chapter', {chapter: chapter, story: story, nextChap, nextChapNum});
                    }
                }
                else {
                    res.render('back');
                }
            });
        });
    });
};