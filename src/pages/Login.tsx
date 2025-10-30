import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      login(
        {
          id: '1',
          name: 'User Demo',
          email: email,
        },
        'demo-token'
      )
      setLoading(false)
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop" 
              alt="Shopping" 
              className="w-full rounded-lg object-cover"
            />
          </div>

          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl font-medium mb-3">Log in to Exclusive</h1>
            <p className="text-gray-600 mb-8">Enter your details below</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-secondary text-white px-12 py-4 rounded hover:bg-secondary/90 transition disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Log In'}
                </button>
                <Link to="/forgot-password" className="text-secondary hover:underline">
                  Forget Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

