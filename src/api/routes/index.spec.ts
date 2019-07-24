import { Contact } from './../models/contact.model'
import request from 'supertest'
import app from '../../server';




describe('Test the root path', async() => {
    beforeAll(async() => {
      const contacts = [
        {name: 'test', phone: '0700777888'},
        {name: 'random', phone: '0700888777'},
      ]
      await Contact.bulkCreate(contacts);
    });
    test('It should response the GET method', async() => {
      const response = await request(app).get('/api/contacts');
      expect(response.status).toBe(200);
    });
    test('Can create contacts', async() => {
      const payload = { name: 'some name', phone_number: '0701777888' }
      const response = await request(app).post('/api/contacts')
        .set('Content-Type', 'application/json')
        .send(payload)
      expect(JSON.parse(response.text).message).toEqual('contact created successfully')
    })
    test('phone_number is required when creating contacts', async() => {
      const payload = { name: 'some name' }
      const response = await request(app).post('/api/contacts')
        .set('Content-Type', 'application/json')
        .send(payload)
      expect(JSON.parse(response.text).phone_number).toEqual('error, phone_number is required')
    })
    test('receiver should have been registered when creating sms', async() => {
      const payload = { from: '0700777888', to: '0708888777', message: 'test message' }
      const response = await request(app).post('/api/sms')
        .set('Content-Type', 'application/json')
        .send(payload)
      expect(JSON.parse(response.text).message).toEqual(`${payload.to} doesn't exist, please provide a valid receiver phone number.`)
    })
    test('should create sms', async() => {
      const payload = { from: '0700777888', to: '0700888777', message: 'test message' }
      const res = await request(app).post('/api/sms')
        .set('Content-Type', 'application/json')
        .send(payload)
     expect(JSON.parse(res.text).status).toEqual('Message sent');
    })
    test('should show list sms', async() => {
      const payload = { from: '0700777888', to: '0700888777', message: 'test message' }
      await request(app).post('/api/sms')
        .set('Content-Type', 'application/json')
        .send(payload)
     const res = await request(app).get('/api/sms')
     expect(res.body.sms[0].message).toEqual('test message');

    })
});


