const checkAction = require('./checkAction');
const db = require('./const/db');

describe('checkAction function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get error with the name that is not in the bank', () => {
    const { status, message } = checkAction('james', db);
    expect(status).toBe('FAIL');
    expect(message).toBe(`The customer james doesn't exist in our bank`);
  });

  test('should return balance with correct name', () => {
    expect(db.length).toBe(2);
    const { balance } = checkAction('jack', db);
    expect(balance).toBe(1000);
  });

})