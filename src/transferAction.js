const transferAction = (sender, receiver, transferAmount, db) => {
  const isSenderExist = db.some(item => item.name === sender);
  if (!isSenderExist) {
    return { status: 'FAIL', message: `The Sender ${sender} doesn't exist in our bank` }
  }
  const isReceiverExist = db.some(item => item.name === receiver);
  if (!isReceiverExist) {
    return { status: 'FAIL', message: `The Receiver ${receiver} doesn't exist in our bank` }
  }
  if (transferAmount <= 0) {
    return { status: 'FAIL', message: `Transfer amount should be greater than 0` }
  }
  const senderAccount = db.filter(item => item.name === sender)[0]
  const receiverAccount = db.filter(item => item.name === receiver)[0]
  if (senderAccount.balance >= transferAmount) {
    senderAccount.balance = senderAccount.balance - transferAmount;
    receiverAccount.balance = receiverAccount.balance + transferAmount;
    return { status: 'SUCCESS', message: `Transfer ${transferAmount}$ from ${sender} to ${receiver} successfully` }
  } else {
    return { status: 'FAIL', message: `The customer ${sender} doesn't have enough money to transfer ${transferAmount} to ${receiver}` }
  }
}

module.exports = transferAction;