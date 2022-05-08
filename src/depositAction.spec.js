const depositAction = require('./depositAction');
const db = require('./const/db');

describe('depositAction function)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not deposit with wrong name', () => {
    const { status, message } = depositAction('james', 100, db);
    expect(status).toBe('FAIL');
    expect(message).toBe(`The customer james doesn't exist in our bank`);
  });

  test('should not deposit with 0 amount money', () => {
    const customer = db.filter(item => item.name === 'jack')[0];
    expect(customer.balance).toBe(1000)
    const { status, message } = depositAction('jack', 0, db);
    expect(customer.balance).toBe(1000)
    expect(status).toBe('FAIL');
    expect(message).toBe('deposit amount should be greater than 0');
  });

  test('should deposit with correct name and amount money', () => {
    const customer = db.filter(item => item.name === 'jack')[0];
    expect(customer.balance).toBe(1000)
    const { status, message } = depositAction('jack', 500, db);
    expect(customer.balance).toBe(1500)
    expect(status).toBe('SUCCESS');
    expect(message).toBe(`Deposit 500$ for jack successfully`);
  });
})