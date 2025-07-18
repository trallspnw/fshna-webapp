export function isValidEmail(email: string): boolean {
  // https://owasp.org/www-community/OWASP_Validation_Regex_Repository
  const owaspEmailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
  return owaspEmailRegex.test(email)
}
