"use client";

import Link from "next/link"; 
import React from "react";
import "@/styles/Footer.css";

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector("input");
    const email = emailInput.value.trim();

    if (email) {
      alert(`Thank you! You've subscribed with: ${email}`);
      emailInput.value = ""; // Clear input
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* LEFT */}
        <div className="section">
          <h2 className="logo">📖 Bookstore</h2>
          <p className="desc">
            Your premier destination for discovering, exploring, and collecting the world's best books.
          </p>
          <div className="socials">
            <a href="#" className="socialIcon">🌐</a>
            <a href="#" className="socialIcon">📘</a>
            <a href="#" className="socialIcon">📸</a>
            <a href="#" className="socialIcon">🐦</a>
          </div>
        </div>

        {/* SHOP */}
        <div className="section">
          <h4 className="title">Shop</h4>
          <LinkItem href="/popular">Popular Books</LinkItem>
          <LinkItem href="/fiction">Fiction</LinkItem>
          <LinkItem href="/non-fiction">Non-Fiction</LinkItem>
          <LinkItem href="/new-releases">New Releases</LinkItem>
        </div>

        {/* COMPANY */}
        <div className="section">
          <h4 className="title">Company</h4>
          <LinkItem href="/about">About Us</LinkItem>
          <LinkItem href="/careers">Careers</LinkItem>
          <LinkItem href="/privacy">Privacy Policy</LinkItem>
          <LinkItem href="/terms">Terms</LinkItem>
        </div>

        {/* CONTACT */}
        <div className="section">
          <h4 className="title">Contact</h4>
          <p className="contactItem">📧 hello@bookstore.com</p>
          <p className="contactItem">📞 +91 9876543210</p>
          <p className="contactItem">📍 Chennai, India</p>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="newsletterSection">
        <div className="newsletterContent">
          <h3 className="newsletterTitle">Stay Updated</h3>
          <p className="newsletterDesc">
            Subscribe to get notified about new releases and updates.
          </p>
          <form className="newsletterForm" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              required
            />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bottom">
        <div className="bottomContent">
          <span className="copyright">
            © 2026 Bookstore. All rights reserved.
          </span>
          <div className="bottomLinks">
            <LinkItem href="/privacy">Privacy</LinkItem>
            <LinkItem href="/terms">Terms</LinkItem>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Link Component
function LinkItem({ href, children }) {
  return (
    <a href={href} className="link">
      {children}
    </a>
  );
}