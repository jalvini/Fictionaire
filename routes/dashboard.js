const express = require('express');
const router = express.Router();

const Dashboard = require('../controllers/DashboardController');

router.get('/', Dashboard.dashboard);

router.post('/', Dashboard.dashboardPost);

module.exports = router;