var _ = require("underscore");
var STOP_WORDS = ["the", "in", "and"];

Parse.Cloud.beforeSave("Items", function(request, response) {
  var item = request.object;

  var toLowerCase = function(w) { return w.toLowerCase(); };
  var isValidWord = function(w) { return w.match(/^\w+$/) && ! _.contains(STOP_WORDS, w); };

  var words = item.get("title").split(/\b/);
  words = _.map(words, toLowerCase);
  words = _.filter(words, isValidWord);
  words = _.uniq(words);

  item.set("words", words);
  response.success();
});