const withdrawAction = (name, withdrawAmount, db) => {
  const isCustomerExist = db.some(item => item.name === name);
  if (!isCustomerExist) {
    return { status: 'FAIL', message: `The customer ${name} doesn't exist in our bank` }
  }
  if (withdrawAmount <= 0) {
    return { status: 'FAIL', message: `Withdraw amount should be greater than 0` }
  }
  const customer = db.filter(item => item.name === name)[0]
  if (customer.balance >= withdrawAmount) {
    customer.balance = customer.balance - withdrawAmount;
    return { status: 'SUCCESS', message: `Withdraw ${withdrawAmount}$ for ${name} successfully` }
  } else {
    return { status: 'FAIL', message: `The customer ${name} doesn't have enough money to withdraw ${withdrawAmount} in our bank` }
  }
}

module.exports = withdrawAction;