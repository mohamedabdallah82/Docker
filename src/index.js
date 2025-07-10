const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
// const { Client } = require('pg');


// init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = redis.createClient({
    url : `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', (err) => console.log('Redis Client Connected...'));
redisClient.connect();


// connect mongo db
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_PORT = 27017;       // find when run docker ps(I think it does not change)
const DB_HOST = 'mongo';     // name of service (or we can get ip from another way)

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
    .connect(URI)
    .then(() => console.log('connected to mongo db...'))
    .catch((err) => console.log('failed to connect to mongo db: ', err));
    

/// postgres application ///

    // // connect postgres db
    // const DB_USER = 'root';
    // const DB_PASSWORD = 'root';
    // const DB_PORT = 5432;
    // const DB_HOST = 'postgres';

    // const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
    // const client = new Client({
    //     connectionString: URI,
    // });
    // client.
    //     connect()
    //     .then(() => console.log('connected to postgress db...'))
    //     .catch((err) => console.log('failed to connect to postgress db: ', err));



app.get('/', (req, res) => {
    redisClient.set('products', 'products..');
    res.send('<h1> Hello Tresmerge!</h1>');
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`<h1> Hello Tresmerge!</h1> <h2>${products}</h2>`);
});

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));