import { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CategoryIconProps {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
}

export default function CategoryIcon({ icon: Icon, label, href, active }: CategoryIconProps) {
  return (
    <Link
      to={href}
      className={`flex flex-col items-center justify-center gap-2 sm:gap-3 border-2 rounded p-3 sm:p-4 lg:p-6 hover:bg-secondary hover:text-white hover:border-secondary transition ${
        active ? 'bg-secondary text-white border-secondary' : 'border-gray-300'
      }`}
    >
      <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
      <span className="text-xs sm:text-sm">{label}</span>
    </Link>
  )
}

