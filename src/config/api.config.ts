export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  useMock: import.meta.env.VITE_USE_MOCK_API === 'true',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const APP_CONFIG = {
  name: 'TechGears',
  description: 'Premium Electronics & Technology Store',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  enableDarkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false',
}

export const FEATURE_FLAGS = {
  enableQuickView: true,
  enableWishlist: true,
  enableComparison: true,
  enableReviews: true,
  enableLiveChat: true,
}


