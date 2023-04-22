const config: { [key: string]: string } = {
  serviceName: 'QuarkBank',
  userTable: 'UserTable',
  accountTable: 'AccountTable',
  transactionTable: 'TransactionTable',
}

export const getConfig = (value: string) => {
  return config[value]
}
