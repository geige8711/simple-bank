const depositAction = (name, depositAmount, db) => {
  const isCustomerExist = db.some(item => item.name === name);
  if (!isCustomerExist) {
    return { status: 'FAIL', message: `The customer ${name} doesn't exist in our bank` }
  }
  const customer = db.filter(item => item.name === name)[0]
  if (depositAmount > 0) {
    customer.balance = customer.balance + depositAmount
    return { status: 'SUCCESS', message: `Deposit ${depositAmount}$ for ${name} successfully` }
  }
  return { status: 'FAIL', message: `deposit amount should be greater than 0` }
}

module.exports = depositAction;