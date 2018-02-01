ResponseApi = {
     StatusCode: String,
     Message: String,
     IsError: Boolean,
     Data: Object
}

var ResponseApi = function (statusCode, message, isError) {
    this.StatusCode = statusCode;
    this.Message = message;
    this.IsError = isError;
}

module.exports = ResponseApi;