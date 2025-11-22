// Validation utilities for forms

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Email validation
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "Email është i detyrueshëm" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Email nuk është i vlefshëm" };
  }
  
  return { isValid: true };
}

// Phone validation (Albanian format)
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === "") {
    return { isValid: true }; // Phone is optional
  }
  
  // Remove spaces, dashes, and plus signs for validation
  const cleaned = phone.replace(/[\s\-+]/g, "");
  
  // Albanian phone numbers: 9 digits (mobile) or 8 digits (landline)
  const phoneRegex = /^[0-9]{8,9}$/;
  if (!phoneRegex.test(cleaned)) {
    return { isValid: false, error: "Numri i telefonit nuk është i vlefshëm" };
  }
  
  return { isValid: true };
}

// Name validation
export function validateName(name: string): ValidationResult {
  if (!name || name.trim() === "") {
    return { isValid: false, error: "Emri është i detyrueshëm" };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: "Emri duhet të jetë të paktën 2 karaktere" };
  }
  
  if (name.trim().length > 100) {
    return { isValid: false, error: "Emri nuk mund të jetë më shumë se 100 karaktere" };
  }
  
  return { isValid: true };
}

// Message validation
export function validateMessage(message: string): ValidationResult {
  if (!message || message.trim() === "") {
    return { isValid: false, error: "Mesazhi është i detyrueshëm" };
  }
  
  if (message.trim().length < 10) {
    return { isValid: false, error: "Mesazhi duhet të jetë të paktën 10 karaktere" };
  }
  
  if (message.trim().length > 2000) {
    return { isValid: false, error: "Mesazhi nuk mund të jetë më shumë se 2000 karaktere" };
  }
  
  return { isValid: true };
}

// Price validation
export function validatePrice(price: number | undefined): ValidationResult {
  if (price === undefined || price === null) {
    return { isValid: false, error: "Çmimi është i detyrueshëm" };
  }
  
  if (isNaN(price)) {
    return { isValid: false, error: "Çmimi duhet të jetë një numër" };
  }
  
  if (price < 0) {
    return { isValid: false, error: "Çmimi nuk mund të jetë negativ" };
  }
  
  if (price > 10000000) {
    return { isValid: false, error: "Çmimi është shumë i lartë" };
  }
  
  return { isValid: true };
}

// Year validation
export function validateYear(year: number | undefined): ValidationResult {
  if (year === undefined || year === null) {
    return { isValid: false, error: "Viti është i detyrueshëm" };
  }
  
  if (isNaN(year)) {
    return { isValid: false, error: "Viti duhet të jetë një numër" };
  }
  
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  
  if (year < minYear) {
    return { isValid: false, error: `Viti nuk mund të jetë më i vjetër se ${minYear}` };
  }
  
  if (year > currentYear + 1) {
    return { isValid: false, error: `Viti nuk mund të jetë më i madh se ${currentYear + 1}` };
  }
  
  return { isValid: true };
}

// Mileage validation
export function validateMileage(mileage: number | undefined): ValidationResult {
  if (mileage === undefined || mileage === null) {
    return { isValid: false, error: "Kilometrazha është e detyrueshme" };
  }
  
  if (isNaN(mileage)) {
    return { isValid: false, error: "Kilometrazha duhet të jetë një numër" };
  }
  
  if (mileage < 0) {
    return { isValid: false, error: "Kilometrazha nuk mund të jetë negative" };
  }
  
  if (mileage > 1000000) {
    return { isValid: false, error: "Kilometrazha është shumë e lartë" };
  }
  
  return { isValid: true };
}

// Slug validation
export function validateSlug(slug: string): ValidationResult {
  if (!slug || slug.trim() === "") {
    return { isValid: false, error: "Slug është i detyrueshëm" };
  }
  
  // Slug should be lowercase, alphanumeric with hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    return { isValid: false, error: "Slug duhet të jetë me shkronja të vogla, numra dhe vizat" };
  }
  
  if (slug.length < 3) {
    return { isValid: false, error: "Slug duhet të jetë të paktën 3 karaktere" };
  }
  
  if (slug.length > 100) {
    return { isValid: false, error: "Slug nuk mund të jetë më shumë se 100 karaktere" };
  }
  
  return { isValid: true };
}

// Brand validation
export function validateBrand(brand: string): ValidationResult {
  if (!brand || brand.trim() === "") {
    return { isValid: false, error: "Marka është e detyrueshme" };
  }
  
  if (brand.trim().length < 2) {
    return { isValid: false, error: "Marka duhet të jetë të paktën 2 karaktere" };
  }
  
  return { isValid: true };
}

// Model validation
export function validateModel(model: string): ValidationResult {
  if (!model || model.trim() === "") {
    return { isValid: false, error: "Modeli është i detyrueshëm" };
  }
  
  if (model.trim().length < 1) {
    return { isValid: false, error: "Modeli duhet të jetë të paktën 1 karakter" };
  }
  
  return { isValid: true };
}

// Power HP validation (optional)
export function validatePowerHp(powerHp: number | undefined): ValidationResult {
  if (powerHp === undefined || powerHp === null) {
    return { isValid: true }; // Optional field
  }
  
  if (isNaN(powerHp)) {
    return { isValid: false, error: "Fuqia duhet të jetë një numër" };
  }
  
  if (powerHp < 0) {
    return { isValid: false, error: "Fuqia nuk mund të jetë negative" };
  }
  
  if (powerHp > 2000) {
    return { isValid: false, error: "Fuqia është shumë e lartë" };
  }
  
  return { isValid: true };
}

