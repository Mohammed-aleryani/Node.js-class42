import app from '../app';
import request from 'supertest';

describe('GET /', () => {
  it('responds with Hello from backend to frontend!', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .expect('Hello from backend to frontend!');
  });
});

describe('POST /weather', () => {
  it('responds with the temperature', async () => {
    const response = await request(app)
      .post('/weather')
      .send({ cityName: 'New York' })
      .expect(200)

    const { Temperature } = response.body;
    expect(Temperature).toBeDefined();
  });

  it('responds with an error if no city name is provided', async () => {
    const response = await request(app)
      .post('/weather')
      .send({ cityName: '' })
      .expect(400)

    const { error } = response.body;
    expect(error).toEqual('Please write a city name!');
  });

  it('responds with an error if no city name is provided', async () => {
    const response = await request(app)
      .post('/weather')
      .send({ cityName: 'Hello Hello Hello Hello Hello Hello Hello Hello Hello' })
      .expect(400)

    const { error } = response.body;
    expect(error).toEqual('Please enter only a city name!');
  });
});
