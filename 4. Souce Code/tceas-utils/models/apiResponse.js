'use strict';

module.exports.success = (data, message = null) => {
    if (message != null)
        return {
            success: true,
            message,
            data
        };

    return {
        success: true,
        data
    };
}

module.exports.error = (message, errorCode = null) => {
    if (errorCode != null)
        return {
            success: false,
            message,
            errorCode
        };

    return {
        success: false,
        message
    };
}