var assert = require('assert');
var request = require('supertest');
var proxyquire = require('proxyquire');
var nock = require('nock');

var corsMock = function () {
    return function (req, res, next) {

        return next();
    }
};
var mbaasApiStub = {
    mbaasExpress: function () {
        return {
            sys: function () {
                return function (req, res, next) {return next()};
            },
            mbaas: function (req, res, next) {
                return next()
            },
            fhmiddleware: function () {
                return function (req, res, next) {
                    return next()
                };
            },
            cloud: function () {
                return function (req, res, next) {return next()};
            },
            errorHandler: function () {
                return function (req, res, next) {return next()};
            }
        }
    },
    '@global': true
}

var mocks = {
    'fh-mbaas-api': mbaasApiStub
};


var app = proxyquire('../../application.js', mocks);


exports['test /sw endpoint'] = function (done) {
  nock('http://swapi.co/api/')
    .get('/films/')
    .reply(200, {});

  request(app)
  .get('/sw').expect(200).end(function (err, response) {
    return done();
  })
};

exports['test /hobbies endpoint'] = function (done) {
  nock('http://www.notsoboringlife.com/')
    .get('list-of-hobbies/')
    .reply(200, {});

  request(app)
  .get('/hobbies').expect(200).end(function (err, response) {
    return done();
  })
};
