import { getSession } from "next-auth/react"

async function authenticatedRequest(url, options = {}) {
  const session = await getSession()
  
  if (!session) {
    throw new Error("No authenticated session")
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${session.accessToken}`,
  }

  const response = await fetch(url, { ...options, headers })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export default authenticatedRequest