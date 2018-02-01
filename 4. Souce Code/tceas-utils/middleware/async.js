const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(err => {
                next(err, req, res)
            });
    };

module.exports = asyncMiddleware;