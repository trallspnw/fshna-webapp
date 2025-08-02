/**
 * Validates an email address using OWASP standard.
 * @param email A requested email address
 * @returns True if valid, else false
 */
export function isValidEmail(email: string): boolean {
  // https://owasp.org/www-community/OWASP_Validation_Regex_Repository
  const owaspEmailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
  return owaspEmailRegex.test(email)
}

/**
 * Validates USD amounts. '$' may or may not be includes. Allows numeric chars optionally followed by a '.' and up to 
 * two numeric chars.
 * @param amount A USD amount string to validate
 * @returns True if valid, else false
 */
export function isValidUsdAmount(amount: string): boolean {
  const normalized = amount.replace(/^\$/, '').trim()
  const regex = /^(?!0*(?:\.0+)?$)\d+(\.\d{1,2})?$/
  return regex.test(normalized)
}

/**
 * Validates US based phone numbers. Accepts digets only. Validates with our without the leading '1'.
 * @param phone A requested phone number
 * @returns True if valid, else false
 */
export function isValidUsPhone(phone: string):boolean {
  return (
    phone.length === 10 ||
    (phone.length === 11 && phone.startsWith('1'))
  )
}