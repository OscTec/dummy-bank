import jwtDecode from "jwt-decode"
import { apiUrl } from "../config.json"

const apiEndpoint = apiUrl

export function getCurrentUser() {
  const jwt = localStorage.getItem('token')
  if (!jwt) return null

  return jwtDecode(jwt)
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

  if (res.status === 400) throw new Error('Invalid email or password.')

  const body = await res.json()
  localStorage.setItem('token', body);
}