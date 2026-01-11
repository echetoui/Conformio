# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Conformio, please email security@conformio.com with:

- Description of the vulnerability
- Steps to reproduce it
- Potential impact
- Suggested fix (if available)

Please do not publicly disclose the vulnerability until we have had a chance to address it.

## Security Standards

### Dependencies
- All npm dependencies are regularly audited using `npm audit`
- Dependabot is configured to automatically check for security updates weekly
- We aim to keep all dependencies up-to-date with the latest security patches

### Environment Variables
- Sensitive information (API keys, passwords) are never committed to the repository
- All credentials must be stored as environment variables
- Frontend code never has access to backend secrets

### HTTPS/SSL
- All communication with external services uses HTTPS
- SSL/TLS certificates are required in production

### Input Validation
- All user input is validated on the frontend using Zod
- All backend requests perform additional server-side validation
- No user input is directly used in SQL queries or system commands

## Security Updates

We follow the principle of releasing security patches as soon as possible when vulnerabilities are discovered. Security updates may be released outside of the normal release schedule.

## Current Status

- npm audit: ✅ 0 vulnerabilities
- Dependabot: ✅ Enabled
- Security scanning: ✅ Active

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.1   | ✅ Current version |

## Contact

For security concerns, please contact the development team through your account representative.
