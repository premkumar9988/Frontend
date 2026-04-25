"use client";
import { createContext, useContext, useState, useEffect } from "react";

const defaultBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 499, oldPrice: 699, image: "/images/image1.png", rating: 4.8, reviews: 2841, badge: "Bestseller", genre: "Self-Help" },
  { id: 2, title: "Ikigai", author: "Héctor García", price: 299, oldPrice: 499, image: "/images/image2.png", rating: 4.6, reviews: 1523, badge: "Popular", genre: "Philosophy" },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 399, oldPrice: 599, image: "/images/image3.png", rating: 4.7, reviews: 3210, badge: "Classic", genre: "Finance" },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", price: 349, oldPrice: 549, image: "/images/image4.png", rating: 4.9, reviews: 4102, badge: "Top Rated", genre: "Fiction" },
  { id: 5, title: "Think and Grow Rich", author: "Napoleon Hill", price: 279, oldPrice: 399, image: "/images/image5.png", rating: 4.5, reviews: 987, badge: null, genre: "Finance" },
  { id: 6, title: "The Psychology of Money", author: "Morgan Housel", price: 459, oldPrice: 699, image: "/images/image6.png", rating: 4.8, reviews: 2204, badge: "New", genre: "Finance" },
  { id: 7, title: "Deep Work", author: "Cal Newport", price: 379, oldPrice: 599, image: "/images/image7.png", rating: 4.6, reviews: 1340, badge: null, genre: "Self-Help" },
  { id: 8, title: "Sapiens", author: "Yuval Noah Harari", price: 499, oldPrice: 799, image: "/images/image8.png", rating: 4.7, reviews: 5671, badge: "Must Read", genre: "History" },
];

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(defaultBooks);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bz_books");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBooks(parsed);
        }
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("bz_books", JSON.stringify(books));
    } catch {}
  }, [books]);

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now(),
      price: Number(book.price),
      oldPrice: Number(book.oldPrice),
      rating: Number(book.rating),
      reviews: Number(book.reviews),
    };
    setBooks((prev) => [newBook, ...prev]);
    console.log("BOOK ADDED:", newBook);
    return newBook;
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

 const updateBook = (id, updates) => {
  setBooks((prev) =>
    prev.map((b) =>
      b.id === id || b._id === id
        ? {
            ...b,
            ...updates,
            price: updates.price ? Number(updates.price) : b.price,
            oldPrice: updates.oldPrice ? Number(updates.oldPrice) : b.oldPrice,
            rating: updates.rating ? Number(updates.rating) : b.rating,
            reviews: updates.reviews ? Number(updates.reviews) : b.reviews,
          }
        : b
    )
  );
};

  return (
    <BooksContext.Provider value={{ books, addBook, deleteBook, updateBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used inside BooksProvider");
  return ctx;
}