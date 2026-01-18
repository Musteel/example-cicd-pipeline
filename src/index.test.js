const request = require('supertest');
const app = require('./index');

describe('Express App', () => {
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/hello', () => {
    it('should return hello world by default', async () => {
      const response = await request(app).get('/api/hello');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Hello, World!' });
    });

    it('should return hello with custom name', async () => {
      const response = await request(app).get('/api/hello?name=Alice');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Hello, Alice!' });
    });
  });

  describe('POST /api/calculate', () => {
    it('should add two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 5, b: 3, operation: 'add' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ result: 8 });
    });

    it('should subtract two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 4, operation: 'subtract' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ result: 6 });
    });

    it('should multiply two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 7, b: 6, operation: 'multiply' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ result: 42 });
    });

    it('should divide two numbers', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 15, b: 3, operation: 'divide' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ result: 5 });
    });

    it('should return error for division by zero', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 10, b: 0, operation: 'divide' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Cannot divide by zero' });
    });

    it('should return error for invalid operation', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 5, b: 3, operation: 'power' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Invalid operation' });
    });

    it('should return error for non-number inputs', async () => {
      const response = await request(app)
        .post('/api/calculate')
        .send({ a: 'five', b: 3, operation: 'add' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Both a and b must be numbers' });
    });
  });
});