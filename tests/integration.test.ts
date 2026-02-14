import { jest } from '@jest/globals';
import request from 'supertest';

const API_URL = 'http://localhost:3000';

describe('Event-Driven System Integration', () => {

  jest.setTimeout(15000);

  it('should process events and maintain idempotency', async () => {
    const payload = {
      userId: "test_user_99",
      eventType: "PRODUCT_VIEW",
      payload: { item: "monitor" }
    };

 
    const response = await request(API_URL)
      .post('/events/generate')
      .send(payload);
    
    expect(response.status).toBe(201);
    const eventId = response.body.eventId;

   
    await new Promise(resolve => setTimeout(resolve, 5000));


    const processed = await request(API_URL).get('/events/processed');
    

    const found = processed.body.find((e: any) => e.eventId === eventId);
    
    expect(found).toBeDefined();
    expect(found.userId).toBe("test_user_99");
    expect(found.eventType).toBe("PRODUCT_VIEW");
  });
});