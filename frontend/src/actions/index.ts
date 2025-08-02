'use server'

const API_URL = process.env.API_URL as string

// Custom error class for API errors
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public operation: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Enhanced helper function
export async function handleApiResponse(response: Response, operation: string) {
  if (!response.ok) {
    let errorMessage = `Failed to ${operation}`
    
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch {
      errorMessage += `: ${response.statusText}`
    }
    
    throw new ApiError(errorMessage, response.status, operation)
  }

  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  if (contentType?.includes('application/pdf')) {
    return response.blob()
  }

  if (response.status === 204) {
    return null
  }

  return response.text()
}

// Generic fetch wrapper
export async function apiRequest(
  endpoint: string,
  options: RequestInit,
  operation: string
) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    return handleApiResponse(response, operation)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(`Network error during ${operation}`, 0, operation)
  }
}
