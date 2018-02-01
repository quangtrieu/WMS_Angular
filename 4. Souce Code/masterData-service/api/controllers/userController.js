'use strict';

const userService = require('../services/userService'); 

exports.getById = function (req, res) {
   userService.findById(req.params.id).then(function(user){
     res.json(user);
   }).catch(() => done(null, false));
}

exports.create = function(req,res)
{
   return userService.create(req.body, res);
}


