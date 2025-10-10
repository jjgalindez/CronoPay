interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'blur' | 'solid';
}

export function LoadingSpinner({ 
  message = "Cargando...", 
  size = 'md',
  variant = 'blur'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  const backgroundClasses = {
    blur: 'bg-background/80 backdrop-blur-sm',
    solid: 'bg-background'
  };

  return (
    <div className={`fixed inset-0 ${backgroundClasses[variant]} flex items-center justify-center z-50`}>
      <div className="flex flex-col items-center gap-4">
        <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}