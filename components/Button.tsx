import React, { ReactNode } from 'react';

// FIX: Updated props to be more flexible for polymorphic use.
// It accepts all button attributes, plus 'as', 'href', 'to', 'target', 'rel'
// to satisfy usage with `<a>` and `NavLink` and fix TS errors.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'filled' | 'tonal' | 'outlined' | 'ghost' | 'filled-to-ghost';
  icon?: string;
  as?: React.ElementType;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  // FIX: Added 'download' property to support the download attribute on anchor tags.
  download?: boolean | string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'filled', icon, as, href, ...props }) => {
  // FIX: Implement polymorphic behavior to correctly render `button`, `a`, or custom components like `NavLink`.
  const Component = as || (href ? 'a' : 'button');

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

  const allProps = {
    ...props,
    href,
    className,
  };

  // The cast to `any` is a pragmatic way to handle the polymorphic nature
  // without overly complex conditional types, given the mixed props.
  return (
    <Component {...allProps as any}>
      {content}
    </Component>
  );
};

export default Button;
