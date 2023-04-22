import { apiUrl } from "../config.json"

const apiEndpoint = apiUrl

interface User {
  email: string
  password: string
  name: string
}

export async function register(user: User): Promise<Response> {
  const res = await fetch(apiEndpoint + "/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      name: user.name,
    }),
  })

  return res
}
