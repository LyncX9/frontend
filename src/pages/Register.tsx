import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      navigate('/login')
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
            <h1 className="text-4xl font-medium mb-3">Create an account</h1>
            <p className="text-gray-600 mb-8">Enter your details below</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email or Phone Number"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pb-2 border-b border-gray-300 focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary text-white px-12 py-4 rounded hover:bg-secondary/90 transition disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Account'}
                </button>

                <button
                  type="button"
                  className="w-full border border-gray-300 px-12 py-4 rounded hover:bg-gray-50 transition flex items-center justify-center gap-3"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  Sign up with Google
                </button>
              </div>

              <p className="text-center text-gray-600">
                Already have account?{' '}
                <Link to="/login" className="font-medium border-b border-gray-600 hover:text-black">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

