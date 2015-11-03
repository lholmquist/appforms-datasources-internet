module.exports = function handleError(err, response){
  var error = {
    "message": err,
    "code": 500
  };
  response.writeHead(500);
  response.end(JSON.stringify(error));
}
