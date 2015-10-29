var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('underscore');
/**
 * Including fh-mbaas-api to be able to use $fh.db to retrieve assets
 */
var fh = require('fh-mbaas-api');


function assetsRoute() {
  var assetsRouter = new express.Router();
  assetsRouter.use(cors());
  assetsRouter.use(bodyParser());


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
  assetsRouter.get('/', function(req, res) {
    /**
     * Finding a list of assets located in mongo database
     */
    fh.db({
      act: "list",
      type: "assets"
    }, function(err, listResult){
      if(err){
        handleError(err, res);
      } else {
        var assets = _.map(listResult.list, function(assetEntry){
          return assetEntry.fields;
        });

        // Here we format the assets into the Datasource format.  We use the array index as the key
        res.json(assets[0].assets.map(function (asset, index) {
          return {
            key: index,
            value: asset
          };
        }));
      }
    });
  });

  return assetsRouter;
}

module.exports = assetsRoute;
