import * as React from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'text'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const baseClasses =
  'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand rounded-[6px]'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white border border-brand',
  ghost: 'bg-white text-brand border border-brand',
  text: 'bg-transparent text-brand border-none px-0 py-0 underline-offset-4 hover:underline',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => {
    const variantClass = variantClasses[variant]

    const classes =
      variant === 'text'
        ? `${variantClass} ${className}`
        : `${baseClasses} ${variantClass} ${className}`

    return <button ref={ref} className={classes} {...props} />
  },
)

Button.displayName = 'Button'

