import test from 'japa'
import supertest from 'supertest'
import { UserFactory } from 'Database/factories'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

/**
  {
    "users": {
      "id": number
      "email": string
      "username": string
      "password": string
      "avatar": string
    }
  }
*/

test.group('User', (group) => {
  test('its should create an user', async (assert) => {
    const userPayload = {
      email: 'test@test.com',
      username: 'test',
      password: 'test',
      avatar: 'https://images.com/image/1',
    }
    const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(201)

    assert.exists(body.user, 'User undefined')
    assert.exists(body.user.id, 'Id undefined')
    assert.equal(body.user.email, userPayload.email)
    assert.equal(body.user.username, userPayload.username)
    assert.equal(body.user.avatar, userPayload.avatar)
    assert.notExists(body.user.password, 'Password defined')
  })

  test('is should return 409 when is already in use', async (assert) => {
    const { email } = await UserFactory.create()

    const userPayload = {
      email,
      username: 'test',
      password: 'test',
      avatar: 'https://images.com/image/1',
    }
    const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(409)

    assert.exists(body.message)
    assert.exists(body.code)
    assert.exists(body.status)
    assert.include(body.message, 'email')
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
