const express = require('express');

const router = express.Router();

/**
 * @route
 * @desc
 * @access
 */
router.get('/', (req, res) => {
  res.send('aa');
});

module.exports = router;