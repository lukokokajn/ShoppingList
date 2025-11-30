import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'icon' | 'sm' | 'lg';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}

function cn(...classes: Array<string | undefined | null | false>) {
    return classes.filter(Boolean).join(' ');
}

const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-sm';

const variantClasses: Record<ButtonVariant, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
};

const sizeClasses: Record<ButtonSize, string> = {
    default: 'h-10 px-4 rounded-md',
    sm: 'h-8 px-3 rounded-md text-xs',
    lg: 'h-11 px-6 rounded-md text-base',
    icon: 'h-9 w-9 rounded-full p-0', // pro ikonová tlačítka (křížek, šipka, atd.)
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            asChild = false,
            variant = 'default',
            size = 'default',
            className,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref}
                className={cn(
                    baseClasses,
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
