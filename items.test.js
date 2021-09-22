process.env.NODE_ENV = "test";
const { ExpectationFailed } = require('http-errors');
const { test } = require('media-typer');
const request = require('supertest');

const app = require('./app');
let items = require('./fakeDb');

let milk = {name: "milk", price: 5.99};

beforeEach(function() {
    items.push(milk);
});

afterEach(function() {
    items.length = 0;
});

describe('GET /items', function() {
    test('gets list of all items', async function() {
        const resp = await request(app).get('/items');
        
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [{name: "milk", price: 5.99}]});
    });
});

describe('POST /items', function() {
    test('creates new item', async function() {
        const resp = await request(app)
        .post('/items')
        .send({
            name: 'eggs',
            price: 3.99
        });
        
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({item: {name: "eggs", price: 3.99}});
    });
});

describe('GET /items/:name', function() {
    test('gets single item', async function() {
        const resp = await request(app).get('/items/milk');
        
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [{name: "milk", price: 5.99}]});
    });
});

describe('PATCH /items/:name', function() {
    test('updates single item', async function() {
        const resp = await request(app)
        .patch(`/items/${milk.name}`)
        .send({
            name: 'whole milk',
            price: 2.99
        });
        
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [{name: "whole milk", price: 2.99}]});
    });
});

