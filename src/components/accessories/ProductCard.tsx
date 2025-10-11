import { ReactNode } from 'react'

interface ProductCardProps {
  title: string
  description: string
  icon?: ReactNode
  href?: string
  className?: string
}

export function ProductCard({ 
  title, 
  description, 
  icon, 
  href, 
  className = "" 
}: ProductCardProps) {
  const CardComponent = href ? 'a' : 'article'
  const cardProps = href ? { href } : {}
  
  return (
    <CardComponent 
      {...cardProps}
      className={`rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow ${href ? 'block' : ''} ${className}`}
    >
      {icon && <div className="mb-4">{icon}</div>}
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </CardComponent>
  )
}