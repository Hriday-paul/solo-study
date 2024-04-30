const express = require("express");
const { addOrUpdateUser } = require("../controler/users");
const { updateStudyTime, getStudyHistory, getPrevDaysStudyHistory } = require("../controler/study");
const { addGoal, todayGoal, deleteGoal, updateStudyGoal, getAllGoal } = require("../controler/goal");
const { addVideo, getVideoByTab } = require("../controler/video");
const { addAudio, getAudios } = require("../controler/audio");
const { addMotivationText, getMotivText } = require("../controler/motivation");
const { prevDateList } = require("../controler/prevDate");

const router = express.Router();

router.put('/addUser', addOrUpdateUser);

router.put('/updateStudyTime', updateStudyTime);

router.post('/addGoal', addGoal);

router.get('/getTodayTask', todayGoal)

router.delete('/deleteTask/:id', deleteGoal)

router.put('/updateStudyGoal/:id', updateStudyGoal);

router.post('/addVideo', addVideo);

router.get('/getVideoByTab/:tabId', getVideoByTab);

router.post('/addAudio', addAudio );

router.get('/audios', getAudios);

router.post('/addMotivation', addMotivationText);

router.get('/motivations/:lang', getMotivText);

router.get('/todayStudyHistory', getStudyHistory);

router.get('/allGoal', getAllGoal);

router.get('/previousDaysStudy/:prevDays', prevDateList, getPrevDaysStudyHistory)








module.exports = router;