const getTotalBalance = require('./getTotalBalance');
const db = require('./const/db');

describe('checkAction function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should total balance of the bank', () => {
    expect(getTotalBalance(db)).toBe(1800);
  });
})