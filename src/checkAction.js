const checkAction = (name, db) => {
  const isCustomerExist = db.some(item => item.name === name);
  if (!isCustomerExist) {
    return { status: 'FAIL', message: `The customer ${name} doesn't exist in our bank` }
  }
  const customer = db.filter(item => item.name === name)[0]
  return { balance: customer.balance }
}

module.exports = checkAction;