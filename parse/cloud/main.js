var CATEGORY_COUNT_IDS = {
  'all': 'uxqQiCY7Uh',
  'apparel': 'EGRYCZ1D7D',
  'appliances': 'UJQOo0cfYg',
  'bikes': 'a2y1OuLCB8',
  'books': 'S6ELlcDjUx',
  'cars': 'pciWtJaYM2',
  'electronics': '5hHcz8zgnQ',
  'furniture': 'gQew90AYUq',
  'housing': 'VtekKqwXsy',
  'miscellaneous': 'HryWB8LtW4',
  'wanted': '0fEnCxfSVL',
  'free': 'sD0xhLj3Dt',
};

var ALL_CATEGORIES = 'all';

Parse.Cloud.beforeSave("Items", function(request, response) {
  var item = request.object;
  //if (!item.id) {
    query = new Parse.Query("Counter");
    query.get(CATEGORY_COUNT_IDS[item.get("category")], {
    	success: function(counter) {
    	  console.log(counter);
    	  counter.increment("value");
    	  counter.save();
    	},
    	error: function(error) {
    		console.error(error.code + " : " + error.message);
    	}
    });
    query.get(CATEGORY_COUNT_IDS[ALL_CATEGORIES], {
    	success: function(counter) {
    	  console.log(counter);
    	  counter.increment("value");
    	  counter.save();
    	},
    	error: function(error) {
    		console.error(error.code + " : " + error.message);
    	}
    });
  //}
  response.success();
});