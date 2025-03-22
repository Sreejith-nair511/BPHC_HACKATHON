import Link from "next/link"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-bg p-4 text-center">
      <div className="animate-float">
        <Activity className="h-16 w-16 text-primary mb-4" />
      </div>
      <h1 className="text-4xl font-bold gradient-text glow mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="bg-primary hover:bg-primary/90 transition-colors">
        <Link href="/">Return Home</Link>
      </Button>

      <div className="mt-12 text-xs text-muted-foreground">Developed by srreejith and k debugger</div>
    </div>
  )
}

