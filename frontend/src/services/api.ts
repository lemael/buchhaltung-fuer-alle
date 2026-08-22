const API_URL = import.meta.env.VITE_API_URL


async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status}`
    )
  }

  // DELETE peut ne rien retourner
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

export const api = {
  get<T>(endpoint: string) {
    return request<T>(endpoint, {
      method: 'GET',
    })
  },

  post<T>(endpoint: string, data: unknown) {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  put<T>(endpoint: string, data: unknown) {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  patch<T>(endpoint: string, data: unknown) {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  delete<T = void>(endpoint: string) {
    return request<T>(endpoint, {
      method: 'DELETE',
    })
  },
}