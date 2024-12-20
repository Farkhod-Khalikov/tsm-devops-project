"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("../express")); // Adjust this import path based on your file structure
describe('Server', () => {
    it('should respond with a 200 status code', async () => {
        const response = await (0, supertest_1.default)(express_1.default).get('/');
        expect(response.status).toBe(200);
    });
});
