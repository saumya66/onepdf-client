import apiClient from './client'
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/auth.types'

export const authAPI = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data)
    return response.data
  },

  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await apiClient.post<SignupResponse>('/auth/signup', data)
    return response.data
  },
}

