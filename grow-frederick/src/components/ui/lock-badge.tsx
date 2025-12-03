import { Lock } from "lucide-react"
import { Button } from "./Button"
import { cn } from "@/lib/utils"

interface LockBadgeProps {
  className?: string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export function LockBadge({ className, size = "sm", onClick }: LockBadgeProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  }

  // If no onClick, render as span to avoid nested button issues
  if (!onClick) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border-amber-200 bg-amber-50 text-amber-600",
          sizeClasses[size],
          className
        )}
      >
        <Lock className={sizeClasses[size]} />
      </span>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "rounded-full border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100",
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      <Lock className={sizeClasses[size]} />
    </Button>
  )
}

interface FeatureGateProps {
  children: React.ReactNode
  hasAccess: boolean
  featureName: string
  upgradeRequired?: string
  onUpgrade?: () => void
  className?: string
}

export function FeatureGate({ 
  children, 
  hasAccess, 
  featureName, 
  upgradeRequired,
  onUpgrade,
  className 
}: FeatureGateProps) {
  if (hasAccess) {
    return <>{children}</>
  }

  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none opacity-50">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <LockBadge size="lg" onClick={onUpgrade} />
          <p className="text-sm font-medium text-muted-foreground">
            {featureName}
          </p>
          {upgradeRequired && (
            <p className="text-xs text-muted-foreground">
              Upgrade to {upgradeRequired} to unlock
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

