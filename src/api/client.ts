import axios from 'axios'

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const authStore = localStorage.getItem('auth-storage')
    if (authStore) {
      try {
        const { state } = JSON.parse(authStore)
        const token = state?.token
        
        if (token) {
          config.headers['access-token'] = token
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error)
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized - auto logout
    if (error.response?.status === 401) {
      // Only auto-logout if user is authenticated AND it's not a login/signup request
      const isAuthRequest = error.config?.url?.includes('/auth/login') || 
                           error.config?.url?.includes('/auth/signup')
      
      if (!isAuthRequest) {
        // Check if user was actually authenticated
        const authStore = localStorage.getItem('auth-storage')
        if (authStore) {
          try {
            const { state } = JSON.parse(authStore)
            if (state?.isAuthenticated) {
              // Token is invalid/expired - logout user
              localStorage.removeItem('auth-storage')
              
              // Redirect to login (only if not already on login page)
              if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login'
              }
            }
          } catch (error) {
            console.error('Error parsing auth storage:', error)
          }
        }
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

