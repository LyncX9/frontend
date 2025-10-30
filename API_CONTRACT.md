# 🔌 API CONTRACT - TechGears Frontend ↔ Laravel Backend

## Base Configuration

```env
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
```

## Authentication

All authenticated requests must include:
```http
Authorization: Bearer {token}
```

---

## 📦 ENDPOINTS

### 1. Categories

#### Get All Categories
```http
GET /api/categories
```

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Laptops",
      "slug": "laptops",
      "icon": "laptop",
      "parent_id": null,
      "children": [
        {
          "id": 2,
          "name": "Gaming Laptops",
          "slug": "gaming-laptops",
          "parent_id": 1
        }
      ]
    }
  ]
}
```

---

### 2. Products

#### Get Products (with filters)
```http
GET /api/products?category={slug}&q={search}&page={num}&sort={field}&order={asc|desc}&price_min={num}&price_max={num}
```

**Query Parameters:**
- `category` (optional): Category slug
- `q` (optional): Search query
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 12)
- `sort` (optional): Sort field (price, name, created_at)
- `order` (optional): Sort order (asc, desc)
- `price_min` (optional): Minimum price
- `price_max` (optional): Maximum price

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "MacBook Pro 16 M3",
      "slug": "macbook-pro-16-m3",
      "price": 2499.00,
      "old_price": 2799.00,
      "discount": 11,
      "stock": 15,
      "images": [
        "https://api.techgears.com/storage/products/macbook-1.jpg",
        "https://api.techgears.com/storage/products/macbook-2.jpg"
      ],
      "thumbnail": "https://api.techgears.com/storage/products/macbook-thumb.jpg",
      "rating": 4.8,
      "reviews_count": 127,
      "category": {
        "id": 1,
        "name": "Laptops",
        "slug": "laptops"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 12,
    "total": 58,
    "from": 1,
    "to": 12
  },
  "links": {
    "first": "http://api.test/products?page=1",
    "last": "http://api.test/products?page=5",
    "prev": null,
    "next": "http://api.test/products?page=2"
  }
}
```

#### Get Product by ID
```http
GET /api/products/{id}
```

**Response 200:**
```json
{
  "data": {
    "id": 1,
    "name": "MacBook Pro 16 M3",
    "slug": "macbook-pro-16-m3",
    "description": "The most powerful MacBook Pro ever...",
    "price": 2499.00,
    "old_price": 2799.00,
    "discount": 11,
    "stock": 15,
    "sku": "MBP-16-M3-2024",
    "images": [...],
    "category": {...},
    "variants": [
      {
        "id": 1,
        "name": "Storage",
        "options": ["512GB", "1TB", "2TB"]
      },
      {
        "id": 2,
        "name": "Color",
        "options": ["Space Gray", "Silver"]
      }
    ],
    "specifications": {
      "Processor": "Apple M3 Pro",
      "RAM": "18GB",
      "Storage": "512GB SSD",
      "Display": "16-inch Liquid Retina XDR"
    },
    "rating": 4.8,
    "reviews_count": 127,
    "reviews": [
      {
        "id": 1,
        "user": {
          "name": "John Doe",
          "avatar": "..."
        },
        "rating": 5,
        "comment": "Amazing performance!",
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "related_products": [...]
  }
}
```

#### Search Suggestions (Autocomplete)
```http
GET /api/products/search/suggestions?q={query}
```

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "MacBook Pro 16 M3",
      "slug": "macbook-pro-16-m3",
      "thumbnail": "...",
      "price": 2499.00
    }
  ]
}
```

---

### 3. Cart

#### Get Cart
```http
GET /api/cart
```

**Response 200:**
```json
{
  "data": {
    "items": [
      {
        "id": 1,
        "product_id": 5,
        "product": {
          "id": 5,
          "name": "iPhone 15 Pro",
          "slug": "iphone-15-pro",
          "price": 999.00,
          "thumbnail": "..."
        },
        "quantity": 2,
        "price": 999.00,
        "subtotal": 1998.00,
        "variant": {
          "storage": "256GB",
          "color": "Titanium"
        }
      }
    ],
    "subtotal": 1998.00,
    "shipping": 0,
    "tax": 0,
    "discount": 0,
    "total": 1998.00,
    "items_count": 2
  }
}
```

#### Add to Cart
```http
POST /api/cart
Content-Type: application/json
```

**Request Body:**
```json
{
  "product_id": 5,
  "quantity": 1,
  "variant": {
    "storage": "256GB",
    "color": "Titanium"
  }
}
```

**Response 201:**
```json
{
  "message": "Product added to cart",
  "data": {
    "cart": {...}
  }
}
```

#### Update Cart Item
```http
PUT /api/cart/{item_id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response 200:**
```json
{
  "message": "Cart updated",
  "data": {
    "cart": {...}
  }
}
```

#### Remove from Cart
```http
DELETE /api/cart/{item_id}
```

**Response 200:**
```json
{
  "message": "Item removed from cart",
  "data": {
    "cart": {...}
  }
}
```

#### Apply Coupon
```http
POST /api/cart/coupon
Content-Type: application/json
```

**Request Body:**
```json
{
  "code": "TECHGEARS10"
}
```

**Response 200:**
```json
{
  "message": "Coupon applied",
  "data": {
    "discount": 199.80,
    "cart": {...}
  }
}
```

---

### 4. Checkout

#### Create Order
```http
POST /api/checkout
Content-Type: application/json
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  },
  "billing_address": {
    "same_as_shipping": true
  },
  "payment_method": "credit_card",
  "payment_details": {
    "card_number": "4242424242424242",
    "exp_month": "12",
    "exp_year": "2025",
    "cvv": "123"
  },
  "notes": "Please deliver after 5 PM"
}
```

**Response 201:**
```json
{
  "message": "Order created successfully",
  "data": {
    "order_id": "ORD-2024-001234",
    "order_number": "001234",
    "total": 1998.00,
    "status": "pending",
    "payment_url": "https://payment.gateway.com/pay/abc123",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### 5. Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```

**Response 201:**
```json
{
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response 200:**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "..."
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Logout successful"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "...",
    "phone": "+1234567890",
    "addresses": [...]
  }
}
```

---

### 6. Orders (User)

#### Get User Orders
```http
GET /api/orders?status={status}&page={num}
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "data": [
    {
      "id": "ORD-2024-001234",
      "order_number": "001234",
      "status": "delivered",
      "total": 1998.00,
      "items_count": 2,
      "created_at": "2024-01-15T10:30:00Z",
      "items": [...]
    }
  ],
  "meta": {...}
}
```

#### Get Order Details
```http
GET /api/orders/{order_id}
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "data": {
    "id": "ORD-2024-001234",
    "order_number": "001234",
    "status": "delivered",
    "total": 1998.00,
    "shipping_address": {...},
    "items": [...],
    "timeline": [
      {
        "status": "placed",
        "timestamp": "2024-01-15T10:30:00Z"
      },
      {
        "status": "shipped",
        "timestamp": "2024-01-16T14:20:00Z",
        "tracking_number": "TRACK123"
      }
    ]
  }
}
```

---

### 7. Wishlist

#### Get Wishlist
```http
GET /api/wishlist
Authorization: Bearer {token}
```

#### Add to Wishlist
```http
POST /api/wishlist
Content-Type: application/json
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "product_id": 5
}
```

#### Remove from Wishlist
```http
DELETE /api/wishlist/{product_id}
Authorization: Bearer {token}
```

---

### 8. Reviews

#### Submit Review
```http
POST /api/products/{product_id}/reviews
Content-Type: application/json
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "rating": 5,
  "title": "Excellent product!",
  "comment": "Very satisfied with the purchase...",
  "images": [
    "data:image/jpeg;base64,..."
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid",
  "errors": {
    "product_id": ["The selected product is invalid."]
  }
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Internal server error occurred"
}
```

---

## Frontend Implementation

### API Service Layer

```typescript
// src/services/api.ts
import axios from '@/lib/axios'

export const categoryApi = {
  getAll: () => axios.get('/categories'),
}

export const productApi = {
  getAll: (params: ProductParams) => 
    axios.get('/products', { params }),
  
  getById: (id: string) => 
    axios.get(`/products/${id}`),
  
  searchSuggestions: (query: string) =>
    axios.get('/products/search/suggestions', { params: { q: query } }),
}

export const cartApi = {
  get: () => axios.get('/cart'),
  add: (data: AddToCartData) => axios.post('/cart', data),
  update: (itemId: number, quantity: number) =>
    axios.put(`/cart/${itemId}`, { quantity }),
  remove: (itemId: number) => axios.delete(`/cart/${itemId}`),
  applyCoupon: (code: string) => axios.post('/cart/coupon', { code }),
}

export const checkoutApi = {
  create: (data: CheckoutData) => axios.post('/checkout', data),
}

export const authApi = {
  register: (data: RegisterData) => axios.post('/auth/register', data),
  login: (data: LoginData) => axios.post('/auth/login', data),
  logout: () => axios.post('/auth/logout'),
  me: () => axios.get('/auth/me'),
}

export const orderApi = {
  getAll: (params?: OrderParams) => axios.get('/orders', { params }),
  getById: (id: string) => axios.get(`/orders/${id}`),
}
```

---

## Mock Server (Development)

### Using JSON files

Create `public/mock/` folder:
```
public/
└── mock/
    ├── categories.json
    ├── products.json
    ├── product-{id}.json
    └── cart.json
```

### Switch between Mock & Real API

```typescript
// src/config/api.ts
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === 'true'

export const getApiUrl = (endpoint: string) => {
  if (USE_MOCK_API) {
    return `/mock/${endpoint}.json`
  }
  return `${import.meta.env.VITE_API_URL}${endpoint}`
}
```

---

## Postman Collection

Import this collection to test all endpoints:

[Download Postman Collection](./TechGears-API.postman_collection.json)

---

**Last Updated:** 2024-01-15

