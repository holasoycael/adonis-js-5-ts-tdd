import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', () => {
  test.only('its should create an user', async () => {
    const userPayload = { email: 'test@test.com', username: 'test', password: 'test' }

    console.log('BASE_URL', BASE_URL)

    await supertest(BASE_URL).post('/users').send(userPayload).expect(201)
  })
})
