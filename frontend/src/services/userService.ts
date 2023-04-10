import { apiUrl, env } from "../config.json"

const apiEndpoint = apiUrl + env

interface User {
  email: string
  password: string
  name: string
}

export async function register(user: User) {
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

  const json = await res.json()
  return json
}

export async function login(email: string, password: string) {
  const res = await fetch(apiEndpoint + "/logins", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      email,
      password
    }),
  })

  const json = await res.json()
  return json
}
