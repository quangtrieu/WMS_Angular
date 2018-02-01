const redisClient = require('../utils/redisCache').redisClient;
const documentModule = require('../constant/enums/documentModule');

module.exports.addDays = function (date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

module.exports.setRedisCache = function (key, data, timeout) {
    redisClient.set(key, data,
        function (err) {
            if (err) {
                return console.log(err);
            }
            redisClient.expire(key, timeout);
        }
    );
};

module.exports.clearRedisCache = function (key) {
    redisClient.set(key, null,
        function (err) {
            if (err) {
                return console.log(err);
            }
            redisClient.expire(key, 0);
        }
    );
};

module.exports.getDocumentFormat = function (objDocument, workShopCode, type) {
    let filter = {  
        workShopCode: workShopCode,
        documentModule: type,
    };

    return objDocument.find({ where: filter }).then(result => {
        if (result) {
            
            let obj = {};
            let runningNo = result.runningNo + 1;
            
            let runningNoString = runningNo + '';
            if(runningNoString.length < result.runningNoLength) {
                let temp = "0";
                for(let i=0;i<result.runningNoLength-runningNoString.length-1;i++) {
                    temp += "0";
                }
                obj.runningNo = temp + runningNo;
            }

            obj.format = result.workshopCode + result.documentCode;

            if(type == documentModule.CUSTOMER) {
                obj.format += obj.runningNo;
            } else {
                let dt = new Date();
                let month = dt.getMonth() + 1;
                if(month < 10) {
                    month = "0" + month;
                }
                let year = (dt.getFullYear() + "").substring(2,4);
                obj.format += year + month + obj.runningNo;
            }
            return { code: obj.format, runningNo: runningNo };
            // return result.updateAttributes(obj).then(result => {
            //     if (result) {
            //         return { code: obj.format, runningNo: runningNo };
            //     } });
        }
    });
};

module.exports.setDocumentFormat = function (objDocument, workShopCode, type, format, runningNo) {
    let filter = { 
        documentModule: type, 
        workShopCode: workShopCode
    };
    return objDocument.find({ where: filter }).then(result => {
        if (result) {
            let obj = {};
            obj.runningNo = runningNo;
            obj.format = format;
            return result.updateAttributes(obj);
        }
    });
};