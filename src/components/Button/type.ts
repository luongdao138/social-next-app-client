import { ButtonHTMLAttributes, CSSProperties } from 'react';

export interface ButtonBaseProps {
  clickHandler?: () => void;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}
