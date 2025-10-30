import { Link } from 'react-router-dom'
import { TruckIcon, HeadphonesIcon, ShieldCheck, ShoppingBag, DollarSign, Users } from 'lucide-react'
import { Twitter, Instagram, Linkedin } from 'lucide-react'

const teamMembers = [
  {
    name: 'Tom Cruise',
    role: 'Founder & Chairman',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    socials: { twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    name: 'Emma Watson',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
    socials: { twitter: '#', instagram: '#', linkedin: '#' }
  },
  {
    name: 'Will Smith',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop',
    socials: { twitter: '#', instagram: '#', linkedin: '#' }
  },
]

export default function About() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-semibold mb-8">Our Story</h1>
            <div className="space-y-4 text-gray-700">
              <p>
                Launced in 2015, Exclusive is South Asia's premier online shopping 
                makterplace with an active presense in Bangladesh. Supported 
                by wide range of tailored marketing, data and service solutions, 
                Exclusive has 10,500 sallers and 300 brands and serves 3 
                millioons customers across the region.
              </p>
              <p>
                Exclusive has more than 1 Million products to offer, growing at a 
                very fast. Exclusive offers a diverse assotment in categories 
                ranging from consumer.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
              alt="Our Story" 
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="border rounded-lg p-8 text-center hover:bg-secondary hover:text-white transition group">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-secondary">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">10.5k</h3>
            <p className="text-sm">Sallers active our site</p>
          </div>

          <div className="border rounded-lg p-8 text-center bg-secondary text-white">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">33k</h3>
            <p className="text-sm">Mopnthly Produduct Sale</p>
          </div>

          <div className="border rounded-lg p-8 text-center hover:bg-secondary hover:text-white transition group">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-secondary">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">45.5k</h3>
            <p className="text-sm">Customer active in our site</p>
          </div>

          <div className="border rounded-lg p-8 text-center hover:bg-secondary hover:text-white transition group">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-secondary">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">25k</h3>
            <p className="text-sm">Anual gross sale in our site</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-96 object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex items-center justify-center gap-4">
                <a href={member.socials.twitter} className="hover:text-primary">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={member.socials.instagram} className="hover:text-primary">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={member.socials.linkedin} className="hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-gray-200">
              <TruckIcon className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">FREE AND FAST DELIVERY</h3>
            <p className="text-sm">Free delivery for all orders over $140</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-gray-200">
              <HeadphonesIcon className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 CUSTOMER SERVICE</h3>
            <p className="text-sm">Friendly 24/7 customer support</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-gray-200">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-sm">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}

