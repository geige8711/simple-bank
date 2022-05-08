const transferAction = require('./transferAction');
const db = require('./const/db');

describe('transferAction function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not transfer with wrong sender name', () => {
    const { status, message } = transferAction('james', 'jack', 100, db);
    expect(status).toBe('FAIL');
    expect(message).toBe(`The Sender james doesn't exist in our bank`);
  });

  test('should not transfer with wrong receiver name', () => {
    const { status, message } = transferAction('jack', 'james', 100, db);
    expect(status).toBe('FAIL');
    expect(message).toBe(`The Receiver james doesn't exist in our bank`);
  });

  test('should not transfer with 0 amount money', () => {
    const sender = db.filter(item => item.name === 'jack')[0];
    const receiver = db.filter(item => item.name === 'michael')[0];
    expect(sender.balance).toBe(1000)
    expect(receiver.balance).toBe(800)
    const { status, message } = transferAction('jack', 'michael', 0, db);
    expect(receiver.balance).toBe(800)
    expect(status).toBe('FAIL');
    expect(message).toBe('Transfer amount should be greater than 0');
  });

  test('should not transfer with money greater than balance', () => {
    const sender = db.filter(item => item.name === 'jack')[0];
    const receiver = db.filter(item => item.name === 'michael')[0];
    expect(sender.balance).toBe(1000)
    expect(receiver.balance).toBe(800)
    const { status, message } = transferAction('jack', 'michael', 1500, db);
    expect(sender.balance).toBe(1000)
    expect(receiver.balance).toBe(800)
    expect(status).toBe('FAIL');
    expect(message).toBe(`The customer jack doesn't have enough money to transfer 1500 to michael`);
  });

  test('should transfer with correct name and amount money', () => {
    const sender = db.filter(item => item.name === 'jack')[0];
    const receiver = db.filter(item => item.name === 'michael')[0];
    expect(sender.balance).toBe(1000)
    expect(receiver.balance).toBe(800)
    const { status, message } = transferAction('jack', 'michael', 500, db);
    expect(sender.balance).toBe(500)
    expect(receiver.balance).toBe(1300)
    expect(status).toBe('SUCCESS');
    expect(message).toBe(`Transfer 500$ from jack to michael successfully`);
  });
})