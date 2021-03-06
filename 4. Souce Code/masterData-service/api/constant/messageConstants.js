'use strict';

module.exports = Object.freeze({
    SUCCESS: "Action is successfull",
    ERROR: "Have a error",

    // customer 
    //CUSTOMER_EXIST_NAME: "CUSTOMER_EXIST_NAME",
    //CUSTOMER_DELETE_FAIL: "CUSTOMER_DELETE_FAIL",
    CUSTOMER_NOT_FOUND: "CUSTOMER_NOT_FOUND",
    CUSTOMER_NAME_REQUIRED: "MSG_NAME_REQUIRED",
    CUSTOMER_IDNUMBER_REQUIRED: "MSG_ID_NO_REQUIRED",
    CUSTOMER_TYPE_REQUIRED: "MSG_TYPE_REQUIRED",
    CUSTOMER_ID_TYPE_REQUIRED : "MSG_ID_TYPE_REQUIRED",
    CUSTOMER_NAME_MAXLENGTH: "MSG_NAME_MAXLENGTH",
    CUSTOMER_PARAM_REQUIRED: "CUSTOMER_PARAM_REQUIRED",
    CUSTOMER_UPDATE_SUSSCESS: "CUSTOMER_UPDATE_SUSSCESS",
    CUSTOMER_UPDATE_FAIL: "CUSTOMER_UPDATE_FAIL",
    CUSTOMER_CREATE_SUSSCESS: "CUSTOMER_CREATE_SUSSCESS",
    CUSTOMER_CREATE_FAIL: "CUSTOMER_CREATE_FAIL",

    // PartMaster 
    EXIST_PARTMASTER: "PartMaster already existed",
    DELETE_PARTMASTER_ERROR: "Have error PartMaster when deleted",
    PARTMASTER_NOT_EXIST: "PartMaster is not exist",

    //vehicleMake
    VEHICLE_MAKE_MSG_ERROR_EXIST_CODE: "VEHICLE_MAKE-MSG-ERROR_EXIST_CODE",
    VEHICLE_MAKE_CREATE_SUCCESS: "VEHICLE_MAKE_CREATE_SUCCESS",
    VEHICLE_MAKE_CREATE_FAIL: "VEHICLE_MAKE_CREATE_FAIL",
    VEHICLE_MAKE_UPDATE_SUCCESS: "VEHICLE_MAKE_UPDATE_SUCCESS",
    VEHICLE_MAKE_UPDATE_FAIL: "VEHICLE_MAKE_UPDATE_FAIL",
    VEHICLE_MAKE_PARAM_REQUIRED: "VEHICLE_MAKE_PARAM_REQUIRED",
    VEHICLE_MAKE_DESCRIPTION_REQUIRED: "VEHICLE_MAKE_DESCRIPTION_REQUIRED",
    VEHICLE_MAKE_NOT_FOUND  : "VEHICLE_MAKE_NOT_FOUND",
    VEHICLE_MAKE_CODE_MAXLENGTH: "VEHICLE_MAKE_CODE_MAXLENGTH",
    VEHICLE_MAKE_CODE_REQUIRED: "VEHICLE_MAKE_CODE_REQUIRED",
    VEHICLE_MAKE_DES_MAXLENGTH: "VEHICLE_MAKE_DES_MAXLENGTH",

    //verhicle model 
    VEHICLE_MODEL_EXIST_CODE: "VEHICLE_MAKE-ADD_UPDATE_UNIQUE_CODE",
    VEHICLE_MODEL_CREATE_SUCCESS: "VEHICLE_MODEL_MSG_CREATE_SUCCESS",
    VEHICLE_MODEL_CREATE_FAIL: "VEHICLE_MODEL_MSG_CREATE_FAIL",
    VEHICLE_MODEL_VEHICLEMAKE_CODE_REQUIRED: "VEHICLE_MODEL_MSG_VEHICLE_MAKE_CODE_MSG_CODE_REQUIRED",
    VEHICLE_MODEL_CODE_REQUIRED: "VEHICLE_MODEL_MSG_CODE_REQUIRED",
    VEHICLE_MODEL_CODE_MAXLENGTH: "VEHICLE_MODEL_MSG_CODE_MAXLENGTH",
    VEHICLE_MODEL_DESCRIPTION_REQUIRED: "VEHICLE_MODEL_DESCRIPTION_REQUIRED",
    VEHICLE_MODEL_DES_MAXLENGTH: "VEHICLE_MODEL_MSG_DES_MAXLENGTH",
    VEHICLE_MODEL_PARAM_REQUIRED: "VEHICLE_MODEL_MSG_PARAM_REQUIRED",
    VEHICLE_MODEL_UPDATE_SUCCESS: "VEHICLE_MODEL_MSG_UPDATE_SUCCESS",
    VEHICLE_MODEL_UPDATE_FAIL: "VEHICLE_MODEL_MSG_UPDATE_FAIL",
    VEHICLE_MODEL_NOTFOUND: "VEHICLE_MODEL_MSG_NOT_FOUND",

    //vehicle variant
    VEHICLE_VARIANT_VEHICLEMAKE_CODE_REQUIRED: "VEHICLE_VARIANT_VEHICLEMAKE_CODE_REQUIRED",
    VEHICLE_VARIANT_VEHICLEMODEL_CODE_REQUIRED: "VEHICLE_VARIANT_VEHICLEMODEL_CODE_REQUIRED",
    VEHICLE_VARIANT_CODE_REQUIRED: "VEHICLE_VARIANT_CODE_REQUIRED",
    VEHICLE_VARIANT_CODE_MAXLENGTH: "VEHICLE_VARIANT_CODE_MAXLENGTH",
    VEHICLE_VARIANT_DESCRIPTION_REQUIRED: "VEHICLE_VARIANT_DESCRIPTION_REQUIRED",
    VEHICLE_VARIANT_DES_MAXLENGTH: "VEHICLE_VARIANT_DES_MAXLENGTH",
    VEHICLE_VARIANT_PARAM_REQUIRED: "VEHICLE_VARIANT_PARAM_REQUIRED",
    VEHICLE_VARIANT_EXIST_CODE: "VEHICLE_VARIANT_EXIST_CODE",
    VEHICLE_VARIANT_CREATE_SUCCESS: "VEHICLE_VARIANT_CREATE_SUCCESS",
    VEHICLE_VARIANT_CREATE_FAIL: "VEHICLE_VARIANT_CREATE_FAIL",
    VEHICLE_VARIANT_UPDATE_SUCCESS: "VEHICLE_VARIANT_UPDATE_SUCCESS",
    VEHICLE_VARIANT_UPDATE_FAIL: "VEHICLE_VARIANT_UPDATE_FAIL",
    VEHICLE_VARIANT_NOTFOUND: "VEHICLE_VARIANT_NOTFOUND",

    // vehicle
    VEHICLE_EXIST_VIN_NO: "VinNo already existed",
    VEHICLE_NOTFOUND: "Vehicle not found",
    VEHICLE_CREATE_SUCCESS: "Create vehicle success!",
    VEHICLE_CREATE_FAIL: "Create vehicle fail!",
    VEHICLE_UPDATE_SUCCESS: "Update vehicle success!",
    VEHICLE_UPDATE_FAIL: "Update vehicle fail!",
    VEHICLE_VARIANT_REQUIRED: "variant must be required!",
    VEHICLE_VINNO_REQUIRED: "vinNo must be required!",

    // vehiclecustomer
    VEHICLE_CUSTOMER_EXIST_REGISTRATION_NO: "RegistrationNo already existed",
    VEHICLE_CUSTOMER_NOTFOUND: "Vehicle Customer not found",
    VEHICLE_CUSTOMER_REGISTRATION_NO_REQUIRED: "registrationNo must be required!",
    VEHICLE_CUSTOMER_VEHICLE_ID_REQUIRED: "vehicle must be required!",
    VEHICLE_CUSTOMER_CUSTOMER_ID_REQUIRED: "customer must be required!",

    //Common Message
    COMMON_CODE_REQUIRED: "code must be required!",
    COMMON_MAXLENGTH: "Please enter %s no more than %d characters",
    COMMON_RECORD_NOT_FOUND: "The record not found!",
    COMMON_CREATE_SUCCESS: "Create %s success!",
    COMMON_CREATE_FAIL: "Create %s fail!",
    COMMON_UPDATE_SUCCESS: "Update %s success!",
    COMMON_UPDATE_FAIL: "Update %s fail!",
    COMMON_PARAM_REQUIRED: "The param must be required!",
});