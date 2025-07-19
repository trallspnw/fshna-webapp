export function isValidEmail(email: string): boolean {
  // https://owasp.org/www-community/OWASP_Validation_Regex_Repository
  const owaspEmailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
  return owaspEmailRegex.test(email)
}

export function isValidUsdAmount(amount: string): boolean {
  const normalized = amount.replace(/^\$/, '').trim()
  const regex = /^(?!0*(?:\.0+)?$)\d+(\.\d{1,2})?$/
  return regex.test(normalized)
}

export function isValidUsPhone(phone: string):boolean {
  return (
    phone.length === 10 ||
    (phone.length === 11 && phone.startsWith('1'))
  )
}