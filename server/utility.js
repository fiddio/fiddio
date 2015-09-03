var url = require('url');
    _   = require('lodash');

module.exports.resolveUrl = function() {
  return [].slice.call(arguments, 1).reduce(function(memo, path) {
    return url.resolve(memo, path);
  }, arguments[0]);
};

module.exports.getId = function(req) {
  return module.exports.getUrlParamNums(req, 'id').id;
}

module.exports.getUrlParamNums = function(req) {
  return [].slice.apply(arguments,1)
  .reduce( function(memo, arg) {
    id = req.params[arg];
    if (_.isNaN(id) || !_.isNumber(id)) {
      id = parseInt(url.parse(req.url, true).query[arg]);
    }
    memo[arg] = id;
    return memo;
  }, {});
};

module.exports.hasSession = function(req, res, next) {
  if (req.user) {
    next();
  } else { res.sendStatus(403); }
}