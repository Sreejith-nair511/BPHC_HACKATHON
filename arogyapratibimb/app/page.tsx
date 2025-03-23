import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import LanguageSelector from "@/components/language-selector"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="fixed top-20 right-4 z-10">
        <LanguageSelector />
      </div>
      <HeroSection />
      <FeatureSection />
    </div>
  )
}

