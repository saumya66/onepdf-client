import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authAPI } from '@/api/auth.api'
import { useAuthStore } from '@/store/useAuthStore'
import type { LoginRequest, SignupRequest } from '@/types/auth.types'
import type { ApiError } from '@/types/api.types'

export const useLogin = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (data) => {
      setAuth(data)
      toast.success('Login successful!', {
        description: `Welcome back, ${data.name}!`,
      })
      navigate({ to: '/app' })
    },
    onError: (error: ApiError) => {
      toast.error('Login failed', {
        description: error.detail || 'Invalid credentials',
      })
    },
  })
}

export const useSignup = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: SignupRequest) => authAPI.signup(data),
    onSuccess: (data) => {
      toast.success('Signup successful!', {
        description: `Welcome, ${data.name}! Please login to continue.`,
      })
      navigate({ to: '/login' })
    },
    onError: (error: ApiError) => {
      toast.error('Signup failed', {
        description: error.detail || 'Please try again',
      })
    },
  })
}

export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  return () => {
    logout()
    toast.success('Logged out successfully')
    navigate({ to: '/login' })
  }
}

