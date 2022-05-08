const withdrawAction = require('./withdrawAction');
const db = require('./const/db');

describe('withdrawAction function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not withdraw with wrong name', () => {
    const { status, message } = withdrawAction('james', 100, db);
    expect(status).toBe('FAIL');
    expect(message).toBe(`The customer james doesn't exist in our bank`);
  });

  test('should not withdraw with 0 amount money', () => {
    const customer = db.filter(item => item.name === 'jack')[0];
    expect(customer.balance).toBe(1000)
    const { status, message } = withdrawAction('jack', 0, db);
    expect(customer.balance).toBe(1000)
    expect(status).toBe('FAIL');
    expect(message).toBe('Withdraw amount should be greater than 0');
  });

  test('should not withdraw with money greater than balance', () => {
    const customer = db.filter(item => item.name === 'jack')[0];
    expect(customer.balance).toBe(1000)
    const { status, message } = withdrawAction('jack', 1500, db);
    expect(customer.balance).toBe(1000)
    expect(status).toBe('FAIL');
    expect(message).toBe(`The customer jack doesn't have enough money to withdraw 1500 in our bank`);
  });

  test('should withdraw with correct name and amount money', () => {
    const customer = db.filter(item => item.name === 'jack')[0];
    expect(customer.balance).toBe(1000)
    const { status, message } = withdrawAction('jack', 500, db);
    expect(customer.balance).toBe(500)
    expect(status).toBe('SUCCESS');
    expect(message).toBe(`Withdraw 500$ for jack successfully`);
  });
})