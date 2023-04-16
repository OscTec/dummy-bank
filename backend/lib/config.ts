const config: { [key: string]: string } = {
  serviceName: 'QuarkBank',
  userTable: 'UserTable',
}

export const getConfig = (value: string) => {
  return config[value]
}
