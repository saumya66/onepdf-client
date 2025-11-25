export interface ApiError {
  message: string
  status?: number
  detail?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
}

