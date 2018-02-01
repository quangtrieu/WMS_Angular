'use strict';

module.exports = Object.freeze({
    SUCCESS: "Action is successfull",
    ERROR: "Have a error",

    // customer 
    CUSTOMER_EXIST_NAME: "Customer name already existed",
    CUSTOMER_DELETE_FAIL: "Delete customer fail",
    CUSTOMER_NOT_FOUND: "Customer not found",

    // PartMaster 
    EXIST_PARTMASTER: "PartMaster already existed",
    DELETE_PARTMASTER_ERROR: "Have error PartMaster when deleted",
    PARTMASTER_NOT_EXIST: "PartMaster is not exist",

    //vehicleMake
    VEHICLE_MAKE_EXIST_CODE: "Vehicle make code must be unique!",
    VEHICLE_MAKE_CREATE_SUCCESS: "Create vehicleMake success!",
    VEHICLE_MAKE_CREATE_FAIL: "Create vehicleMake fail!",
    VEHICLE_MAKE_UPDATE_SUCCESS: "Update vehicleMake success!",
    VEHICLE_MAKE_UPDATE_FAIL: "Update vehicleMake fail!",
    VEHICLE_MAKE_PARAM_REQUIRED: "The param must be required!",
    VEHICLE_MAKE_DESCRIPTION_REQUIRED: "description must be required!",
    VEHICLE_MAKE_NOT_FOUND  : "vehicle make not found!",

    // vehicle
    VEHICLE_EXIST_VIN_NO: "VinNo already existed",
    VEHICLE_NOTFOUND: "Vehicle not found",
    VEHICLE_CREATE_SUCCESS: "Create vehicle success!",
    VEHICLE_CREATE_FAIL: "Create vehicle fail!",
    VEHICLE_UPDATE_SUCCESS: "Update vehicle success!",
    VEHICLE_UPDATE_FAIL: "Update vehicle fail!",

    //Common Message
    COMMON_CODE_REQUIRED: "code must be required!",
    COMMON_MAXLENGTH: "Please enter %s no more than %i characters",
});