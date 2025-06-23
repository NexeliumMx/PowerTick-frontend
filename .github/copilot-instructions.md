# Copilot Code Review Instructions

## 1. Avoid using magic numbers

**Description:**  
Don't use magic numbers in code. Numbers should be defined as constants or variables with meaningful names.

**Path patterns:**  
`**/*.py`

---

## 2. Use `fetch` for HTTP requests

**Description:**  
Use `fetch` for HTTP requests, not `axios`, `superagent`, or other libraries.

**Path patterns:**  
`**/*.ts`, `**/*.js`, `**/*.jsx`, `**/*.tsx`

---

## 3. Follow Airbnb React/JSX Style Guide

**Description:**  
All React code must follow the [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/). This includes best practices for component naming, prop validation, hooks usage, code formatting, and file organization.

**Path patterns:**  
`**/*.js`, `**/*.jsx`, `**/*.ts`, `**/*.tsx`

---