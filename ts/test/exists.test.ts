
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GroqSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GroqSDK.test()
    equal(testsdk instanceof GroqSDK, true,
      'GroqSDK.test() must return a client synchronously')
  })

})
