import Link from "next/link"
import { Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-background/50 backdrop-blur-sm py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold gradient-text">VitalSync</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} VitalSync. All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-xs text-muted-foreground mt-2 md:mt-0">Developed by srreejith and k debugger</div>
        </div>
      </div>
      <div className="container mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-medium mb-3">Corporate Office</h3>
            <address className="text-xs text-muted-foreground not-italic">
              VitalSync Healthcare Technologies
              <br />
              12th Floor, Cyber Towers
              <br />
              Hitech City, Hyderabad
              <br />
              Telangana 500081, India
            </address>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Regional Offices</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>Mumbai, Maharashtra</li>
              <li>Bengaluru, Karnataka</li>
              <li>New Delhi, Delhi</li>
              <li>Chennai, Tamil Nadu</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Support</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>Toll-free: 1800-123-4567</li>
              <li>Email: support@vitalsync.in</li>
              <li>WhatsApp: +91 98765 43210</li>
              <li>24x7 Helpline</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Certifications</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>ISO 27001 Certified</li>
              <li>HIPAA Compliant</li>
              <li>NABH Accredited</li>
              <li>MeitY Approved</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          VitalSync is committed to improving healthcare accessibility across India.
          <br />
          Registered with Ministry of Health and Family Welfare, Government of India.
        </div>
      </div>
    </footer>
  )
}

