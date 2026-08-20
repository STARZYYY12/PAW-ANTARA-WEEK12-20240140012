const express = require('express');
const router = express.Router();
const guestbookController = require('../controllers/guestbook.controller');
const requireAuth = require('../middlewares/auth.middleware');

router.get('/guestbook', requireAuth, guestbookController.renderGuestbookPage);
router.post('/guestbook', requireAuth, guestbookController.handleGuestbookSubmit);

module.exports = router;