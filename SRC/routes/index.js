const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('links/main');
})
module.exports = router;