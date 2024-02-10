import { describe, expect, test } from '@jest/globals';

test('Users are returned as json', async () => {
    await appTest
        .get('/user/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .set({ 'xtoken': `${process.env.TOKEN}`, Accept: 'application/json' })
})

test('there is at least one user', async () => {
    const response = await appTest
        .get('/user/')
        .set({ 'xtoken': `${process.env.TOKEN}`, Accept: 'application/json' })
    expect(response.body.users).toHaveLength(1)
    expect(response.body.total).toBeGreaterThan(0)
})