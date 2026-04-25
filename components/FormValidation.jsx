"use client"
import { useState } from "react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")       // ✅ was: set (unnamed)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = "Name is required."
    if (!email.trim()) errs.email = "Email is required."
    else if (!email.includes("@") || !email.includes("."))
      errs.email = "Enter a valid email address."
    return errs
  }

  const handleSubmit = (e) => {                // ✅ was: handlesubmit (casing)
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)                          // ✅ was: seterror (undefined)
      return
    }
    setErrors({})
    setSubmitted(true)
    setName("")
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} noValidate>  {/* ✅ was: onsumbit (typo) */}
      <h2>Contact us</h2>

      {submitted && (
        <p className="success">Form submitted successfully!</p>
      )}

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Your full name"
          onChange={(e) => setName(e.target.value)}   // ✅ was: onchange (casing)
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"                         // ✅ was: type="text"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}  // ✅ was: onchange + set
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}