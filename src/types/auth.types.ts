export interface User {
  user_id: string
  user_email: string
  name: string
  avatar?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  name: string
  user_email: string
  user_id: string
  access_token: string
}

export interface SignupRequest {
  email: string
  name: string
  password: string
}

export interface SignupResponse {
  user_email: string
  user_id: string
  name: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (data: LoginResponse) => void
  logout: () => void
}

