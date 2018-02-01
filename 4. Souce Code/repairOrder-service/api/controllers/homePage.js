'use strict';

/**
 * Render the index.ejs or index-with-code.js depending on if query param has code or not
 * @param   {Object} req - The request
 * @param   {Object} res - The response
 * @returns {undefined}
 */
exports.index = (req, res) => {
  if (!req.query.code) {
    res.render('index');
  } else {
    //res.render('index-with-code');
    res.render('index-with-code');
  }
};
