/**
 * Text Primitive - Typography Hierarchy
 *
 * Follows DESIGN.md typography system:
 * - Title: 700, 28px, 1.3 - Screen and section headers
 * - Body: 400, 16px, 1.6 - Question text, chunk content
 * - Label: 600, 12px, 1.5, uppercase - Tags, categories
 *
 * All text uses clamp-based sizing for responsiveness.
 */

import React from 'react';

type TextVariant = 'title' | 'title-lg' | 'title-sm' | 'body' | 'body-lg' | 'label';
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'white' | 'danger';

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  className?: string;
  children: React.ReactNode;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
}

const colorClasses: Record<TextColor, string> = {
  primary: 'text-[var(--color-surface-900)]',
  secondary: 'text-[var(--color-surface-500)]',
  tertiary: 'text-[var(--color-tertiary)]',
  muted: 'text-[var(--color-surface-200)]',
  white: 'text-white',
  danger: 'text-[var(--color-danger)]',
};

const variantClasses: Record<TextVariant, string> = {
  title: 'text-[clamp(24px,4vw,28px)] font-bold leading-[1.3]',
  'title-lg': 'text-[clamp(28px,5vw,32px)] font-bold leading-[1.3]',
  'title-sm': 'text-[clamp(20px,3vw,24px)] font-bold leading-[1.3]',
  body: 'text-[16px] font-normal leading-[1.6]',
  'body-lg': 'text-[clamp(18px,3vw,20px)] font-normal leading-[1.6]',
  label: 'text-[12px] font-semibold leading-[1.5] uppercase tracking-[0.05em]',
};

const maxWidthClasses: Record<Exclude<TextMaxWidth, 'none'>, string> = {
  sm: 'max-w-[20ch]',
  md: 'max-w-[40ch]',
  lg: 'max-w-[65ch]',
  xl: 'maxw-[75ch]',
};

export function Text({
  variant = 'body',
  color = 'primary',
  maxWidth = 'none',
  className = '',
  children,
  as = 'p',
}: TextProps) {
  const Tag = as;

  return (
    <Tag
      className={`
        ${variantClasses[variant]}
        ${colorClasses[color]}
        ${maxWidth !== 'none' ? maxWidthClasses[maxWidth] : ''}
        ${className}
      `.trim()}
    >
      {children}
    </Tag>
  );
}

/**
 * Convenience components for common text elements
 */

export function Title(props: Omit<TextProps, 'variant'>) {
  return <Text {...props} variant="title" as="h2" />;
}

export function Body(props: Omit<TextProps, 'variant'>) {
  return <Text {...props} variant="body" as="p" />;
}

export function Label(props: Omit<TextProps, 'variant'>) {
  return <Text {...props} variant="label" as="span" />;
}
