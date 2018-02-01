'use strict';

module.exports = Object.freeze({
    SUCCESS: "Action is successfull",
    ERROR: "Have a error",

    // customer 
    EXIST_CUSTOMER: "Customer already existed",
    DELETE_CUSTOMER_ERROR: "Have error customer when deleted",
    NOT_EXIST: "Customer is not exist",

    REPAIR_ORDER_EXIST_CODE: "RepairOrder code must be unique!",
    REPAIR_ORDER_CREATE_SUCCESS: "Create repair order success!",
    REPAIR_ORDER_CREATE_FAIL: "Create repair order fail!",
    REPAIR_ORDER_UPDATE_FAIL: "Update repair order fail!",
    REPAIR_ORDER_PARAM_REQUIRED: "The param must be required!",

    REPAIR_ORDER_COMEBACK_JOB_REQUIRED: "REPAIR_ORDER_COMEBACK_JOB_REQUIRED",
    REPAIR_ORDER_PAYMENT_TYPE_REQUIRED: "REPAIR_ORDER_PAYMENT_TYPE_REQUIRED",
    REPAIR_ORDER_JOB_SOURCE_REQUIRED: "REPAIR_ORDER_JOB_SOURCE_REQUIRED",
    REPAIR_ORDER_PART_SOURCE_REQUIRED: "REPAIR_ORDER_PART_SOURCE_REQUIRED",
    REPAIR_ORDER_UPDATE_SUCCESS : "REPAIR_ORDER_UPDATE_SUCCESS",
});