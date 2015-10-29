var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('underscore');
var request = require('request');
var $ = require('cheerio');


function hobbiesRoute() {
  var hobbiesRouter = new express.Router();
  hobbiesRouter.use(cors());
  hobbiesRouter.use(bodyParser());

  // console.log('in hobby');


  function handleError(err, response){
    var error = {
      "message": err,
      "code": 500
    };
    response.writeHead(500);
    response.end(JSON.stringify(error));
  }

  /**
   * Getting a list of assets from the server.

    This list of assets, once retrieved, will be properly formatted as a Data Source to be used in Forms Apps

    An example of this format is:

    [
        {
            "key": "some_key",
            "value": "some_value"
        }
    ]
   */
  hobbiesRouter.get('/', function(req, res) {
    // We are going to scrape the website:  http://www.notsoboringlife.com/list-of-hobbies/ for a list
    // of hobbies.
    console.log('in get');
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

      // And then we wil parse it into the DataSource format

      var parsedHobbies = parsedHTML('ol.list-of-hobbies li.loh_column1');

      var listOfHobbies = [];

      parsedHobbies.map(function  (index, el) {
        listOfHobbies.push({
          key: index,
          value: $(el).text()
        });
      });

      console.log(listOfHobbies);

      res.send(listOfHobbies);
    });

    // And then return it
  });

  return hobbiesRouter;
}

module.exports = hobbiesRoute;
