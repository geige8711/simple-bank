const createAccount = require('./createAccount');
const db = require('./const/db');

describe('createAccount function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not create account without initialDeposit', () => {
    expect(db.length).toBe(2);
    const { status, message } = createAccount('james', 0, db);
    expect(db.length).toBe(2);
    expect(status).toBe('FAIL');
    expect(message).toBe('initalDeposit should be greater than 0');
  });

  test('should not create account with name already exists in the bank', () => {
    expect(db.length).toBe(2);
    const { status, message } = createAccount('jack', 100, db);
    expect(db.length).toBe(2);
    expect(status).toBe('FAIL');
    expect(message).toBe('The customer jack already exists in our bank');
  });

  test('should create account with initialDeposit', () => {
    expect(db.length).toBe(2);
    const { status, message } = createAccount('mike', 500, db);
    expect(db.length).toBe(3);
    expect(status).toBe('SUCCESS');
    expect(message).toBe('create account for mike with initalDeposit 500 successfully');
  });
})