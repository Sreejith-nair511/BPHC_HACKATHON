"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Supported languages
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
]

// Comprehensive translations for common phrases
const translations: Record<string, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    overview: "Overview",
    patients: "Patients",
    analytics: "Analytics",
    settings: "Settings",
    login: "Login",
    signup: "Sign Up",
    welcome: "Welcome to VitalSync",
    logout: "Logout",
    patient_monitoring: "Patient Monitoring",
    disease_prediction: "Disease Prediction",
    medical_records: "Medical Records",
    cost_comparison: "Cost Comparison",
    medicine_verification: "Medicine Verification",
    health_assistant: "Health Assistant",
    total_patients: "Total Patients",
    active_monitoring: "Active Monitoring",
    critical_alerts: "Critical Alerts",
    ai_predictions: "AI Predictions",
    avg_treatment_cost: "Avg. Treatment Cost",
    hospital_network: "Hospital Network",
    doctors_available: "Doctors Available",
    verified_medicines: "Verified Medicines",
    patient_vitals: "Patient Vitals",
    recent_alerts: "Recent Alerts",
    upcoming_appointments: "Upcoming Appointments",
    features: "Features",
    stats: "Stats",
    testimonials: "Testimonials",
    contact: "Contact",
    search: "Search",
    notifications: "Notifications",
    my_account: "My Account",
    profile: "Profile",
    view: "View",
    join: "Join",
    accessibility_settings: "Accessibility Settings",
    text_size: "Text Size",
    high_contrast: "High Contrast",
    reduced_motion: "Reduced Motion",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    overview: "अवलोकन",
    patients: "मरीज़",
    analytics: "विश्लेषण",
    settings: "सेटिंग्स",
    login: "लॉग इन",
    signup: "साइन अप",
    welcome: "वाइटलसिंक में आपका स्वागत है",
    logout: "लॉग आउट",
    patient_monitoring: "रोगी निगरानी",
    disease_prediction: "रोग भविष्यवाणी",
    medical_records: "चिकित्सा रिकॉर्ड",
    cost_comparison: "लागत तुलना",
    medicine_verification: "दवा सत्यापन",
    health_assistant: "स्वास्थ्य सहायक",
    total_patients: "कुल मरीज़",
    active_monitoring: "सक्रिय निगरानी",
    critical_alerts: "महत्वपूर्ण अलर्ट",
    ai_predictions: "एआई भविष्यवाणियां",
    avg_treatment_cost: "औसत उपचार लागत",
    hospital_network: "अस्पताल नेटवर्क",
    doctors_available: "उपलब्ध डॉक्टर",
    verified_medicines: "सत्यापित दवाएं",
    patient_vitals: "रोगी के महत्वपूर्ण लक्षण",
    recent_alerts: "हाल के अलर्ट",
    upcoming_appointments: "आगामी अपॉइंटमेंट",
    features: "विशेषताएं",
    stats: "आंकड़े",
    testimonials: "प्रशंसापत्र",
    contact: "संपर्क",
    search: "खोज",
    notifications: "सूचनाएं",
    my_account: "मेरा खाता",
    profile: "प्रोफ़ाइल",
    view: "देखें",
    join: "शामिल हों",
    accessibility_settings: "पहुंच सेटिंग्स",
    text_size: "टेक्स्ट साइज़",
    high_contrast: "उच्च कंट्रास्ट",
    reduced_motion: "कम मोशन",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    overview: "கண்ணோட்டம்",
    patients: "நோயாளிகள்",
    analytics: "பகுப்பாய்வு",
    settings: "அமைப்புகள்",
    login: "உள்நுழைய",
    signup: "பதிவு செய்ய",
    welcome: "வைட்டல்சிங்கிற்கு வரவேற்கிறோம்",
    logout: "வெளியேறு",
    patient_monitoring: "நோயாளி கண்காணிப்பு",
    disease_prediction: "நோய் கணிப்பு",
    medical_records: "மருத்துவ பதிவுகள்",
    cost_comparison: "செலவு ஒப்பீடு",
    medicine_verification: "மருந்து சரிபார்ப்பு",
    health_assistant: "சுகாதார உதவியாளர்",
    total_patients: "மொத்த நோயாளிகள்",
    active_monitoring: "செயலில் கண்காணிப்பு",
    critical_alerts: "முக்கிய எச்சரிக்கைகள்",
    ai_predictions: "AI கணிப்புகள்",
    avg_treatment_cost: "சராசரி சிகிச்சை செலவு",
    hospital_network: "மருத்துவமனை நெட்வொர்க்",
    doctors_available: "கிடைக்கும் மருத்துவர்கள்",
    verified_medicines: "சரிபார்க்கப்பட்ட மருந்துகள்",
    patient_vitals: "நோயாளி உயிர்நாடி",
    recent_alerts: "சமீபத்திய எச்சரிக்கைகள்",
    upcoming_appointments: "வரவிருக்கும் சந்திப்புகள்",
    features: "அம்சங்கள்",
    stats: "புள்ளிவிவரங்கள்",
    testimonials: "சான்றுகள்",
    contact: "தொடர்பு",
    search: "தேடல்",
    notifications: "அறிவிப்புகள்",
    my_account: "எனது கணக்கு",
    profile: "சுயவிவரம்",
    view: "பார்க்க",
    join: "சேர",
    accessibility_settings: "அணுகல் அமைப்புகள்",
    text_size: "உரை அளவு",
    high_contrast: "அதிக வேறுபாடு",
    reduced_motion: "குறைந்த அசைவு",
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    overview: "అవలోకనం",
    patients: "రోగులు",
    analytics: "విశ్లేషణలు",
    settings: "సెట్టింగ్‌లు",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    welcome: "వైటల్‌సింక్‌కి స్వాగతం",
    logout: "లాగౌట్",
    patient_monitoring: "రోగి పర్యవేక్షణ",
    disease_prediction: "వ్యాధి అంచనా",
    medical_records: "వైద్య రికార్డులు",
    cost_comparison: "ఖర్చు పోలిక",
    medicine_verification: "మందుల ధృవీకరణ",
    health_assistant: "ఆరోగ్య సహాయకుడు",
    total_patients: "మొత్తం రోగులు",
    active_monitoring: "యాక్టివ్ మానిటరింగ్",
    critical_alerts: "క్రిటికల్ అలర్ట్స్",
    ai_predictions: "AI అంచనాలు",
    avg_treatment_cost: "సగటు చికిత్స ఖర్చు",
    hospital_network: "ఆసుపత్రి నెట్‌వర్క్",
    doctors_available: "అందుబాటులో ఉన్న వైద్యులు",
    verified_medicines: "ధృవీకరించబడిన మందులు",
    patient_vitals: "రోగి ప్రాణాధారాలు",
    recent_alerts: "ఇటీవలి హెచ్చరికలు",
    upcoming_appointments: "రాబోయే అపాయింట్మెంట్లు",
    features: "ఫీచర్లు",
    stats: "గణాంకాలు",
    testimonials: "టెస్టిమోనియల్స్",
    contact: "సంప్రదించండి",
    search: "శోధన",
    notifications: "నోటిఫికేషన్లు",
    my_account: "నా ఖాతా",
    profile: "ప్రొఫైల్",
    view: "వీక్షించండి",
    join: "చేరండి",
    accessibility_settings: "యాక్సెసిబిలిటీ సెట్టింగులు",
    text_size: "టెక్స్ట్ సైజు",
    high_contrast: "అధిక కాంట్రాస్ట్",
    reduced_motion: "తగ్గించిన మోషన్",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    overview: "ওভারভিউ",
    patients: "রোগীরা",
    analytics: "অ্যানালিটিক্স",
    settings: "সেটিংস",
    login: "লগইন",
    signup: "সাইন আপ",
    welcome: "ভাইটালসিঙ্কে স্বাগতম",
    logout: "লগআউট",
    patient_monitoring: "রোগী পর্যবেক্ষণ",
    disease_prediction: "রোগ পূর্বাভাস",
    medical_records: "মেডিকেল রেকর্ড",
    cost_comparison: "খরচ তুলনা",
    medicine_verification: "ওষুধ যাচাইকরণ",
    health_assistant: "স্বাস্থ্য সহকারী",
    total_patients: "মোট রোগী",
    active_monitoring: "সক্রিয় পর্যবেক্ষণ",
    critical_alerts: "গুরুতর সতর্কতা",
    ai_predictions: "এআই পূর্বাভাস",
    avg_treatment_cost: "গড় চিকিৎসা খরচ",
    hospital_network: "হাসপাতাল নেটওয়ার্ক",
    doctors_available: "উপলব্ধ ডাক্তার",
    verified_medicines: "যাচাইকৃত ওষুধ",
    patient_vitals: "রোগীর প্রাণশক্তি",
    recent_alerts: "সাম্প্রতিক সতর্কতা",
    upcoming_appointments: "আসন্ন অ্যাপয়েন্টমেন্ট",
    features: "বৈশিষ্ট্য",
    stats: "পরিসংখ্যান",
    testimonials: "প্রশংসাপত্র",
    contact: "যোগাযোগ",
    search: "অনুসন্ধান",
    notifications: "বিজ্ঞপ্তি",
    my_account: "আমার অ্যাকাউন্ট",
    profile: "প্রোফাইল",
    view: "দেখুন",
    join: "যোগ দিন",
    accessibility_settings: "অ্যাক্সেসিবিলিটি সেটিংস",
    text_size: "টেক্সট সাইজ",
    high_contrast: "উচ্চ কনট্রাস্ট",
    reduced_motion: "কমানো মোশন",
  },
}

// Create a context to manage translations
interface LanguageContextType {
  currentLanguage: string
  setLanguage: (code: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export function useTranslation() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    // Try to get language preference from localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && languages.some((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }

    // Set HTML lang attribute for screen readers
    document.documentElement.lang = currentLanguage
  }, [currentLanguage])

  const setLanguage = (code: string) => {
    setCurrentLanguage(code)
    localStorage.setItem("language", code)

    // Force re-render of components by setting a data attribute on body
    document.body.setAttribute("data-language", code)
  }

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations["en"]?.[key] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="glass-button border-none">
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline-block">
            {languages.find((lang) => lang.code === currentLanguage)?.flag}{" "}
            {languages.find((lang) => lang.code === currentLanguage)?.name}
          </span>
          <span className="sm:hidden">{languages.find((lang) => lang.code === currentLanguage)?.flag}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={cn("flex items-center gap-2", currentLanguage === language.code && "bg-primary/20")}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {currentLanguage === language.code && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

