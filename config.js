// Shahed Home Renovation - Configuration File
// This file stores core business info, colors, and image paths
// JavaScript reads from this file but never writes page content from it

const ShahedConfig = {
  // Business Info
  businessName: "Shahed Home Renovation",
  ownerName: "Shahed Sadeqi",
  tagline: "Clean Work. Fair Price. Free Estimate.",
  subTagline: "Professional Home Renovation Services in Scarborough, Toronto",
  location: "Scarborough Village, Toronto, ON",
  phone: "416-575-8791",
  phoneHref: "tel:4165758791",
  email: "your@email.com",
  hours: "Monday–Saturday: 7:00 AM – 7:00 PM",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORMSPREE_ID",

  // Colors — 60-30-10 Rule (derived from logo)
  primaryColor: "#E8751A",      // Orange from logo — icons, accents, buttons
  primaryDark: "#C5601A",       // Darker orange for hover states
  bgLight: "#F5F5F5",           // Light gray background
  bgWhite: "#FFFFFF",           // White sections
  textDark: "#1C1C1C",          // Dark charcoal for headings
  textGray: "#6B6B6B",          // Gray from logo for body text
  borderColor: "#E8E8E8",       // Subtle borders

  // Hero Slideshow Images (3 photos on homepage)
  heroImages: [
    "assets/images/portfolio/deck-complete.jpg",
    "assets/images/portfolio/interior-floor.jpg",
    "assets/images/portfolio/wood-gate.jpg"
  ]
};