import request from 'supertest';
import app from '../express'; // Adjust this import path based on your file structure

describe('Server', () => {
  it('should respond with a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
