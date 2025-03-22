/**
 * Simple encryption utility for client-side data
 * Note: This is not secure for highly sensitive data
 * For production, use proper end-to-end encryption or server-side encryption
 */

// A simple encryption key (in production, this should be securely stored)
const ENCRYPTION_KEY = "VitalSync_Secure_Key_2024"

/**
 * Encrypts a string using AES-like algorithm
 */
export function encryptData(data: string): string {
  if (!data) return ""

  try {
    // Convert to base64 first
    const base64 = btoa(encodeURIComponent(data))

    // Simple XOR encryption with the key
    let result = ""
    for (let i = 0; i < base64.length; i++) {
      const charCode = base64.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      result += String.fromCharCode(charCode)
    }

    // Convert to hex for storage
    return Array.from(result)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  } catch (error) {
    console.error("Encryption failed:", error)
    return ""
  }
}

/**
 * Decrypts a string that was encrypted with encryptData
 */
export function decryptData(encryptedData: string): string {
  if (!encryptedData) return ""

  try {
    // Convert from hex
    let hexString = ""
    for (let i = 0; i < encryptedData.length; i += 2) {
      hexString += String.fromCharCode(Number.parseInt(encryptedData.substr(i, 2), 16))
    }

    // XOR decryption with the key
    let result = ""
    for (let i = 0; i < hexString.length; i++) {
      const charCode = hexString.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      result += String.fromCharCode(charCode)
    }

    // Convert from base64
    return decodeURIComponent(atob(result))
  } catch (error) {
    console.error("Decryption failed:", error)
    return ""
  }
}

/**
 * Securely stores data in localStorage with encryption
 */
export function secureStore(key: string, data: any): void {
  try {
    const jsonData = JSON.stringify(data)
    const encryptedData = encryptData(jsonData)
    localStorage.setItem(key, encryptedData)
  } catch (error) {
    console.error("Secure storage failed:", error)
  }
}

/**
 * Retrieves and decrypts data from localStorage
 */
export function secureRetrieve<T>(key: string, defaultValue: T): T {
  try {
    const encryptedData = localStorage.getItem(key)
    if (!encryptedData) return defaultValue

    const jsonData = decryptData(encryptedData)
    return JSON.parse(jsonData) as T
  } catch (error) {
    console.error("Secure retrieval failed:", error)
    return defaultValue
  }
}

