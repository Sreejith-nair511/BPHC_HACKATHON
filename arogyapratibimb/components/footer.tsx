import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">ArogyaPratibimb</h3>
            <p className="text-sm text-muted-foreground">India's Digital Health Twin - Your health, your reflection</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/symptom-checker" className="text-muted-foreground hover:text-primary">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link href="/diseases" className="text-muted-foreground hover:text-primary">
                  Disease Encyclopedia
                </Link>
              </li>
              <li>
                <Link href="/health-tips" className="text-muted-foreground hover:text-primary">
                  Health Tips & Alerts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/emergency" className="text-muted-foreground hover:text-primary">
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link href="/ayurveda" className="text-muted-foreground hover:text-primary">
                  Ayurveda & Modern Medicine
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-muted-foreground hover:text-primary">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: info@arogyapratibimb.in</li>
              <li className="text-muted-foreground">Emergency: 108</li>
              <li className="text-muted-foreground">Health Helpline: 104</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ArogyaPratibimb. Made with ❤️ in India.</p>
        </div>
      </div>
    </footer>
  )
}

