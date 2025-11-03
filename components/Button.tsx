import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'filled' | 'tonal' | 'outlined' | 'ghost' | 'filled-to-ghost';
  icon?: string;
  as?: 'button' | 'a';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'filled', icon, as = 'button', href, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-6 h-10 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-sys-color-background)]';
  
  const variantClasses = {
    filled: 'bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] hover:shadow-md hover:brightness-110 active:brightness-100 focus-visible:ring-[var(--md-sys-color-primary)]',
    tonal: 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] hover:shadow-sm hover:brightness-95 active:brightness-90 focus-visible:ring-[var(--md-sys-color-secondary-container)]',
    outlined: 'text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/10 active:bg-[var(--md-sys-color-primary)]/15 focus-visible:ring-[var(--md-sys-color-primary)]',
    ghost: 'border border-[var(--md-sys-color-outline)] text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)] hover:text-[var(--md-sys-color-on-primary)] focus-visible:ring-[var(--md-sys-color-primary)]',
    'filled-to-ghost': 'bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] border-2 border-transparent hover:bg-transparent hover:text-[var(--md-sys-color-primary)] hover:border-[var(--md-sys-color-outline)] focus-visible:ring-[var(--md-sys-color-primary)]'
  };

  const className = `${baseClasses} ${variantClasses[variant]} ${props.className || ''}`;

  const content = (
    <>
      {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
      {children}
    </>
  );

  if (as === 'a') {
    return (
      <a href={href} className={className} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={className} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};

export default Button;