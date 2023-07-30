"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisServer = exports.client = void 0;
const redis_1 = require("redis");
exports.client = (0, redis_1.createClient)();
const redisServer = () => {
    exports.client.connect().then(() => {
        console.log('Redis Connected');
    }).catch((err) => {
        console.error(err);
    });
};
exports.redisServer = redisServer;
exports.default = exports.client;
