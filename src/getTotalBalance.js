const getTotalBalance = (db) => {
  return db.reduce((total, current) => total += current.balance, 0);
}

module.exports = getTotalBalance;