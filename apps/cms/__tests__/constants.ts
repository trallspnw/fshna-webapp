export const CONSTANTS = {
  requestUrl: 'https://localhost/api/fakeEndpoint',
  apiHeaders: { 'Content-Type': 'application/json' },
  email: 'test@test.com',
  email2: 'test2@test.com',
}

test('Constants file loads', () => {
  expect(CONSTANTS).toBeDefined()
})
