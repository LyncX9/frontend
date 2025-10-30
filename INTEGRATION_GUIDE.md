# 🔗 Integration Guide - Frontend ↔ Backend

## Overview

This guide helps you integrate the TechGears frontend with your Laravel backend API.

---

## 🎯 Prerequisites

### Frontend
- Node.js 18+
- npm or yarn
- Environment variables configured

### Backend
- Laravel 10+
- API routes configured
- CORS enabled
- Authentication (JWT or Sanctum)

---

## 🔧 Configuration

### 1. Frontend Environment

Create `.env` file:
```env
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK=false
VITE_API_TIMEOUT=10000
```

### 2. Axios Configuration

File: `src/lib/axios.ts`

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### 3. Backend CORS (Laravel)

File: `config/cors.php`

```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

---

## 📝 API Service Layer

### Create API Services

File: `src/services/api.ts`

```typescript
import axios from '@/lib/axios'

// Products
export const productApi = {
  getAll: async (params) => {
    const response = await axios.get('/products', { params })
    return response.data
  },
  
  getById: async (id) => {
    const response = await axios.get(`/products/${id}`)
    return response.data
  },
}

// Categories
export const categoryApi = {
  getAll: async () => {
    const response = await axios.get('/categories')
    return response.data
  },
}

// Cart
export const cartApi = {
  get: async () => {
    const response = await axios.get('/cart')
    return response.data
  },
  
  add: async (data) => {
    const response = await axios.post('/cart', data)
    return response.data
  },
  
  update: async (itemId, quantity) => {
    const response = await axios.put(`/cart/${itemId}`, { quantity })
    return response.data
  },
  
  remove: async (itemId) => {
    const response = await axios.delete(`/cart/${itemId}`)
    return response.data
  },
}

// Auth
export const authApi = {
  register: async (data) => {
    const response = await axios.post('/auth/register', data)
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data.user))
    }
    return response.data
  },
  
  login: async (data) => {
    const response = await axios.post('/auth/login', data)
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data.user))
    }
    return response.data
  },
  
  logout: async () => {
    await axios.post('/auth/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  
  me: async () => {
    const response = await axios.get('/auth/me')
    return response.data
  },
}
```

---

## 🔄 State Management Integration

### Update Cart Store with API

File: `src/store/cartStore.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartApi } from '@/services/api'
import type { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  loading: boolean
  
  fetchCart: () => Promise<void>
  addItem: (productId: string, quantity: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => void
  
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      
      fetchCart: async () => {
        set({ loading: true })
        try {
          const data = await cartApi.get()
          set({ items: data.data.items, loading: false })
        } catch (error) {
          console.error('Failed to fetch cart:', error)
          set({ loading: false })
        }
      },
      
      addItem: async (productId, quantity = 1) => {
        try {
          const data = await cartApi.add({ product_id: productId, quantity })
          set({ items: data.data.cart.items })
        } catch (error) {
          console.error('Failed to add item:', error)
          throw error
        }
      },
      
      updateQuantity: async (itemId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(itemId)
          return
        }
        
        try {
          const data = await cartApi.update(itemId, quantity)
          set({ items: data.data.cart.items })
        } catch (error) {
          console.error('Failed to update quantity:', error)
          throw error
        }
      },
      
      removeItem: async (itemId) => {
        try {
          const data = await cartApi.remove(itemId)
          set({ items: data.data.cart.items })
        } catch (error) {
          console.error('Failed to remove item:', error)
          throw error
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
```

### Update Auth Store with API

File: `src/store/authStore.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '@/services/api'
import type { User } from '@/types'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          const response = await authApi.login({ email, password })
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          })
        } catch (error) {
          console.error('Login failed:', error)
          throw error
        }
      },
      
      register: async (data) => {
        try {
          const response = await authApi.register(data)
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          })
        } catch (error) {
          console.error('Registration failed:', error)
          throw error
        }
      },
      
      logout: async () => {
        try {
          await authApi.logout()
          set({ user: null, token: null, isAuthenticated: false })
        } catch (error) {
          console.error('Logout failed:', error)
          set({ user: null, token: null, isAuthenticated: false })
        }
      },
      
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

---

## 🧪 Testing Integration

### 1. Test API Connection

```bash
# In frontend directory
npm run dev
```

Open browser console and test:
```javascript
// Test Categories
fetch('http://localhost:8000/api/categories')
  .then(r => r.json())
  .then(console.log)

// Test Products
fetch('http://localhost:8000/api/products')
  .then(r => r.json())
  .then(console.log)
```

### 2. Use Postman Collection

Import the provided Postman collection:
- `TechGears-API.postman_collection.json`
- Test all endpoints
- Verify responses match API contract

### 3. Mock API for Development

If backend is not ready, use mock data:

File: `src/services/mockApi.ts`

```typescript
export const mockProductApi = {
  getAll: async () => {
    const response = await fetch('/mock/products.json')
    return response.json()
  },
  
  getById: async (id: string) => {
    const response = await fetch(`/mock/product-${id}.json`)
    return response.json()
  },
}
```

Create mock files in `public/mock/`:
```
public/
└── mock/
    ├── categories.json
    ├── products.json
    ├── product-1.json
    └── cart.json
```

---

## 🐛 Troubleshooting

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` error

**Solution:**
1. Check Laravel CORS config
2. Verify frontend URL in `allowed_origins`
3. Restart Laravel server

### 401 Unauthorized

**Problem:** API returns 401 even with token

**Solution:**
1. Check token in localStorage
2. Verify Authorization header
3. Check token expiration
4. Verify backend authentication guard

### Network Timeout

**Problem:** Requests timing out

**Solution:**
1. Increase `VITE_API_TIMEOUT`
2. Check backend response time
3. Verify API endpoint is correct

### Request/Response Format

**Problem:** Data not matching expected format

**Solution:**
1. Check API contract documentation
2. Verify backend response structure
3. Update TypeScript types if needed

---

## 📦 Deployment

### Frontend Build

```bash
npm run build
```

Output in `dist/` folder.

### Environment Variables (Production)

```env
VITE_API_URL=https://api.techgears.com/api
VITE_USE_MOCK=false
VITE_API_TIMEOUT=15000
```

### Backend Configuration

Ensure Laravel `.env`:
```env
FRONTEND_URL=https://techgears.com
SANCTUM_STATEFUL_DOMAINS=techgears.com
SESSION_DOMAIN=.techgears.com
```

---

## ✅ Integration Checklist

### Before Integration
- [ ] Backend API endpoints ready
- [ ] API documentation available
- [ ] CORS configured
- [ ] Authentication working

### During Integration
- [ ] Axios instance configured
- [ ] API service layer created
- [ ] Zustand stores updated
- [ ] Error handling implemented
- [ ] Loading states added

### Testing
- [ ] All API calls working
- [ ] Authentication flow works
- [ ] Cart operations functional
- [ ] Error messages display
- [ ] Loading states show

### Production Ready
- [ ] Environment variables set
- [ ] Build tested
- [ ] CORS working
- [ ] SSL configured
- [ ] Monitoring setup

---

## 📞 Support

For integration issues:
1. Check API contract documentation
2. Verify request/response format
3. Check browser console for errors
4. Review Laravel logs
5. Contact backend team

---

**Last Updated:** 2024-01-15

