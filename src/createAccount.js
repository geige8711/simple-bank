const createAccount = (name, initalDeposit, db) => {
  if (initalDeposit <= 0) {
    return { status: 'FAIL', message: `initalDeposit should be greater than 0` }
  }
  const isCustomerExist = db.some(item => item.name === name);
  if (isCustomerExist) {
    return { status: 'FAIL', message: `The customer ${name} already exists in our bank` }
  }

  db.push({ name, initalDeposit })
  return { status: 'SUCCESS', message: `create account for ${name} with initalDeposit ${initalDeposit} successfully` }
}

module.exports = createAccount;
