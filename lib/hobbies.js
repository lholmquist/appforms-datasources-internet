var express = require('express');
var router = express.Router();
var request = require('request');
var handleError = require('./error-helper');
var $ = require('cheerio');

/**
   * Getting a list of hobbies from a source on the internet.

    This list of hobbies, once retrieved, will be properly formatted as a Data Source to be used in Forms Apps

    An example of this format is:

    [
        {
            "key": "some_key",
            "value": "some_value"
        }
    ]
   */

router.get('/', function(req, res) {
  // We are going to scrape the website:  http://www.notsoboringlife.com/list-of-hobbies/ for a list
  // of hobbies.
  var url = 'http://www.notsoboringlife.com/list-of-hobbies/';

  request(url, function (err, resp, html) {
    if (err) {
      return handleError(err, res);
    }

    // We are using a library called cheerio, https://www.npmjs.com/package/cheerio
    // This is an html parser that gives us the familiar jQuery syntax for traversing DOM
    var parsedHTML = $.load(html);

    // On the page, the list of hobbies is an ordered list <ol>, with a class of 'list-of-hobbies'
    // ex:  <ol class="list-of-hobbies">...</ol>
    // So we will search for this list by the classname

    var parsedHobbies = parsedHTML('ol.list-of-hobbies li.loh_column1');

    // And then we will parse it into the DataSource format
    // This .map function is overidden by the cheerio library, thus acts slightly different from the native Array.prototpye.map
    // https://github.com/cheeriojs/cheerio#map-functionindex-element-
    var listOfHobbies = parsedHobbies.map(function  (index, el) {
      return {
        key: index,
        value: $(el).text()
      }
    }).get();

    // And then return it
    res.json(listOfHobbies);
  });

});

module.exports = router;
