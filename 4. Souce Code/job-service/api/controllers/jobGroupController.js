'use strict';
const jobGroupService = require('../services/jobGroupService');
const constants = require('../constant/appConstants');
const redisClient = require('../../commons/redisCache');
var logUtil = require('../../../tceas-utils/utils/log');

exports.getAll = function (req, res) {
    var currentPage = req.body.currentPage;
    var pageSize = req.body.pageSize;
    var jobGroupKey = "jobGroup_" + currentPage + "_" + pageSize;

    console.time("QUERY_TIME")
    redisClient.get(jobGroupKey, function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data) { //get data from redis cache
            console.log("Data redis")
            console.timeEnd("QUERY_TIME")
            res.json(JSON.parse(data));
        } else {
            jobGroupService.getAll(req.body)
            .then(result =>{
                var response = { success: 1, data: { count: (result != null ? result.count : 0), rows: result.rows } }
                redisClient.set(jobGroupKey, JSON.stringify(response),
                function (err) {
                    if (err) 
                        return console.log(err);
                    else
                        redisClient.expire(jobGroupKey, 0);
                });

                res.json(response);
            })
            .catch(err => {
                res.json({ success: 0, message: "Error" });
                logUtil.handleError({ req, err })
            });
        }
    });
}

exports.getById = function (req, res) {
    jobGroupService.getById(req.params.id).then(result=>{
        if(result){
            return res.json({ success: 1, data:result })
        }
        return res.json({ success: 0, message: "Not found" });
    })
    .catch(err=>{
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.create = function (req, res) {
    jobGroupService.checkExist(req.body.code).then(result =>{
        if(result){
            return res.json({ success: 0, message: "Existed code"})
        }
        jobGroupService.create(req.body)
        .then(result=>{
            res.json({ success: 1, data: result.id });
        })
        .catch(err=>{
            res.json({ success: 0, message: "Error" });
            logUtil.handleError({ req, err })
        })
    })
}

exports.update = function (req, res) {
    jobGroupService.update(req.body)
    .then(result=>{
        if(result)
            res.json({ success: 1, data: result.id });
        else
            res.json({ success: 0, message: "Not exist" });
    })
    .catch(err=>{
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}

exports.delete = function (req, res) {
    jobGroupService.delete(req.params.id)
    .then(result=>{
        if(result)
            res.json({ success: 1, data: result.id });
        else
            res.json({ success: 0, message: "Not exist" });
    })
    .catch(err=>{
        res.json({ success: 0, message: "Error" });
        logUtil.handleError({ req, err })
    })
}