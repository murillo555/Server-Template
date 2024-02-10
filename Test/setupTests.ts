import { describe, expect, test } from '@jest/globals';
import superTest from 'supertest'
import Server from '../models/server'
import { removeTestDocuments } from './testUtils/removeTestDocuments';
import { createTestDocuments } from './testUtils/createTestDocuments';

const server = new Server()

declare global {
    namespace NodeJS {
        interface Global {
            appTest: import('supertest').SuperTest<import('supertest').Test>;
            serverTest: typeof Server
        }
    }
}

declare module global {
    let appTest: import('supertest').SuperTest<import('supertest').Test>;
    let serverTest: typeof server
}

beforeAll(async () => {
    global.serverTest = server
    //@ts-expect-error
    global.appTest = superTest(server.getApp())
    await removeTestDocuments()
    const { userData } = await createTestDocuments()
    await appTest
        .post('/auth/login')
        .send({ email: userData.email, password: '123456' })
        .expect((res) => process.env.TOKEN = res?.body?.token)
})

afterAll(async () => {
    global?.serverTest?.disconnectDB()
})

