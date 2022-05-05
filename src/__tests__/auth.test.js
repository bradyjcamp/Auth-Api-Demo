'use strict';

const bearerMiddleware = require('../auth/middleware/bearer');
const aclMiddleware = require('../auth/middleware/acl');

describe('Testing our auth middleware', () => {
  test('Bearer middleware can authenticated using a token on the request', () => {

    let token = null; // create a valid token with your user model or jwt library, user must be in db.

    const req = { token }
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();

    bearerMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('Access control should allow request to go through with a valid token', () => {

    let token = null; // create a valid token with your user model or jwt library, user must be in db.

    const req = { token }
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res)
    };
    const next = jest.fn();

    aclMiddleware('create')(req, res, next);
    expect(next).toHaveBeenCalled();
  });
})


