const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
        
        test('1 stock', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'goog'})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'response should be an object');
                assert.property(res.body, 'stockData', 'stockData should be a property');
                assert.property(res.body.stockData, 'stock', 'stockData should contain a stock property');
                assert.property(res.body.stockData, 'price', 'stockData should contain a price property');
                assert.property(res.body.stockData, 'likes', 'stockData should contain a likes property');
                assert.isString(res.body.stockData.stock, 'stock should be a string');
                assert.isString(res.body.stockData.price, 'price should be a string');
                assert.isNumber(res.body.stockData.likes, 'likes should be a number');
                done();
            });
        });
        
        test('1 stock with like', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'goog', like: true})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'response should be an object');
                assert.property(res.body, 'stockData', 'stockData should be a property');
                assert.property(res.body.stockData, 'stock', 'stockData should contain a stock property');
                assert.property(res.body.stockData, 'price', 'stockData should contain a price property');
                assert.property(res.body.stockData, 'likes', 'stockData should contain a likes property');
                assert.isString(res.body.stockData.stock, 'stock should be a string');
                assert.isString(res.body.stockData.price, 'price should be a string');
                assert.isNumber(res.body.stockData.likes, 'likes should be a number');
                assert.equal(res.body.stockData.likes, 1, 'likes should be 1');
                done();
            });
        });
        
        test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({stock: 'goog', like: true})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.isObject(res.body, 'response should be an object');
                assert.property(res.body, 'stockData', 'stockData should be a property');
                assert.property(res.body.stockData, 'stock', 'stockData should contain a stock property');
                assert.property(res.body.stockData, 'price', 'stockData should contain a price property');
                assert.property(res.body.stockData, 'likes', 'stockData should contain a likes property');
                assert.isString(res.body.stockData.stock, 'stock should be a string');
                assert.isString(res.body.stockData.price, 'price should be a string');
                assert.isNumber(res.body.stockData.likes, 'likes should be a number');
                assert.equal(res.body.stockData.likes, 1, 'likes should be 1');
                done();
            });
        });
    });       
});

