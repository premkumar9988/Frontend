"use client";
import { useState } from "react";
import Link from "next/link";
import { useBooks } from "@/context/BooksContext";
import { useRouter } from "next/navigation";

const GENRES = [
  "Self-Help",
  "Fiction",
  "Finance",
  "Philosophy",
  "History",
  "Science",
  "Biography",
  "Technology",
  "Other",
];
const BADGES = [
  "",
  "Bestseller",
  "Popular",
  "Classic",
  "Top Rated",
  "New",
  "Must Read",
];

const badgeConfig = {
  Bestseller: { bg: "#fff3ed", color: "#c2440e", border: "#fdd5bc" },
  Popular: { bg: "#fef9ee", color: "#b45309", border: "#fde68a" },
  Classic: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "Top Rated": { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff" },
  New: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Must Read": { bg: "#fff1f2", color: "#be123c", border: "#fecdd3" },
};

const EMPTY_FORM = {
  title: "",
  author: "",
  price: "",
  oldPrice: "",
  image: "",
  rating: "",
  reviews: "",
  badge: "",
  genre: "",
};

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        background:
          type === "success"
            ? "linear-gradient(135deg,#15803d,#16a34a)"
            : "linear-gradient(135deg,#c2440e,#e8622a)",
        color: "#fff",
        padding: "14px 24px",
        borderRadius: 14,
        fontFamily: "'DM Sans',sans-serif",
        fontWeight: 700,
        fontSize: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,.22)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "bzSlideUp .3s ease",
      }}
    >
      <span>{type === "success" ? "✓" : "✕"}</span> {msg}
    </div>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 12,
        fontWeight: 700,
        color: "#6b5344",
        letterSpacing: ".07em",
        textTransform: "uppercase",
        marginBottom: 7,
      }}
    >
      {children}
      {required && <span style={{ color: "#c2440e", marginLeft: 3 }}>*</span>}
    </label>
  );
}

export default function AdminPage() {
  const { books, addBook, deleteBook } = useBooks();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ msg: "", type: "success" });
  const [search, setSearch] = useState("");
  const [focusField, setFocusField] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const router = useRouter();

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 2800);
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.genre) e.genre = "Genre is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Valid price required";
    if (
      !form.oldPrice ||
      isNaN(Number(form.oldPrice)) ||
      Number(form.oldPrice) <= Number(form.price)
    )
      e.oldPrice = "Must be greater than price";
    if (
      !form.rating ||
      isNaN(Number(form.rating)) ||
      Number(form.rating) < 0 ||
      Number(form.rating) > 5
    )
      e.rating = "Rating 0–5";
    if (!form.reviews || isNaN(Number(form.reviews)) || Number(form.reviews) < 0)
      e.reviews = "Valid number";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    addBook({ ...form, badge: form.badge || null });
    const savedTitle = form.title;
    setForm(EMPTY_FORM);
    setErrors({});
    setSaving(false);
    showToast(`"${savedTitle}" added! Redirecting to Books…`);
    setTimeout(() => {
      router.push("/books");
    }, 1200);
  };

  const handleDelete = (id, title) => {
    if (deleteConfirm === id) {
      deleteBook(id);
      setDeleteConfirm(null);
      showToast(`"${title}" removed.`, "error");
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.genre?.toLowerCase().includes(search.toLowerCase())
  );

  const discount = (b) =>
    b.oldPrice > b.price
      ? Math.round(((b.oldPrice - b.price) / b.oldPrice) * 100)
      : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #fdf8f4; }

        @keyframes bzSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bzFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bzPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(194,68,14,.35); }
          50%      { box-shadow: 0 0 0 8px rgba(194,68,14,0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .adm-page { min-height: 100vh; background: #fdf8f4; }

        .adm-topbar {
          background: #fff; border-bottom: 1.5px solid #f0ebe3;
          padding: 0 40px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 16px rgba(60,30,5,.06);
        }
        .adm-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Playfair Display', serif; font-size: 20px;
          font-weight: 800; color: #1a1410; text-decoration: none;
        }
        .adm-logo-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg,#c2440e,#e8622a);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .adm-nav { display: flex; align-items: center; gap: 8px; }
        .adm-nav-link {
          padding: 8px 16px; border-radius: 8px; font-size: 13px;
          font-weight: 600; color: #6b5344; text-decoration: none;
          transition: background .2s, color .2s;
        }
        .adm-nav-link:hover { background: #fff3ed; color: #c2440e; }
        .adm-nav-link.active { background: #fff3ed; color: #c2440e; }
        .adm-badge-count {
          display: inline-flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 99px; background: #c2440e;
          color: #fff; font-size: 10px; font-weight: 800; margin-left: 4px;
        }

        .adm-body { display: grid; grid-template-columns: 440px 1fr; gap: 0; min-height: calc(100vh - 64px); }
        @media(max-width:900px){ .adm-body { grid-template-columns: 1fr; } }

        .adm-form-panel {
          background: #fff; border-right: 1.5px solid #f0ebe3;
          padding: 36px 32px; overflow-y: auto; max-height: calc(100vh - 64px);
          position: sticky; top: 64px;
          animation: bzFadeIn .4s ease;
        }
        .adm-panel-header { margin-bottom: 28px; }
        .adm-panel-kicker {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: #c2440e; background: #fff3ed;
          border: 1px solid #fdd5bc; padding: 3px 10px; border-radius: 99px;
          margin-bottom: 10px;
        }
        .adm-panel-title {
          font-family: 'Playfair Display', serif; font-size: 24px;
          font-weight: 800; color: #1a1410; line-height: 1.2;
        }
        .adm-panel-sub { font-size: 13px; color: #9c8878; margin-top: 5px; }

        .adm-form { display: flex; flex-direction: column; gap: 18px; }
        .adm-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .adm-field { display: flex; flex-direction: column; }

        .adm-input, .adm-select {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          border: 1.5px solid #f0ebe3; background: #fdf8f4;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: #1a1410; outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .adm-input:focus, .adm-select:focus {
          border-color: #c2440e; background: #fff;
          box-shadow: 0 0 0 3px rgba(194,68,14,.10);
        }
        .adm-input.error  { border-color: #f87171; background: #fff5f5; }
        .adm-input.filled { border-color: #bbf7d0; background: #f0fdf4; }
        .adm-select {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239c8878' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          padding-right: 36px;
        }
        .adm-err  { font-size: 11.5px; color: #ef4444; margin-top: 5px; font-weight: 600; }
        .adm-hint { font-size: 11px; color: #bbb0a4; margin-top: 4px; }

        .adm-img-preview {
          width: 100%; height: 120px; border-radius: 12px;
          border: 1.5px dashed #f0ebe3; background: #fdf8f4;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; margin-top: 8px;
        }
        .adm-img-preview img { height: 100%; object-fit: contain; padding: 8px; }
        .adm-img-placeholder { font-size: 28px; opacity: .3; }

        .adm-submit-row { display: flex; gap: 12px; margin-top: 4px; }
        .adm-btn-submit {
          flex: 1; padding: 14px; border-radius: 12px; border: none;
          background: linear-gradient(135deg,#c2440e,#e8622a); color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: opacity .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 6px 20px rgba(194,68,14,.30);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .adm-btn-submit:hover:not(:disabled) { opacity: .92; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(194,68,14,.38); }
        .adm-btn-submit:disabled { opacity: .65; cursor: not-allowed; }
        .adm-btn-clear {
          padding: 14px 20px; border-radius: 12px; border: 1.5px solid #f0ebe3;
          background: #fff; color: #9c8878;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: background .2s, color .2s;
        }
        .adm-btn-clear:hover { background: #fff3ed; color: #c2440e; border-color: #fdd5bc; }

        .adm-divider { border: none; border-top: 1.5px solid #f0ebe3; margin: 4px 0; }
        .adm-section-label {
          font-size: 11px; font-weight: 700; color: #bbb0a4;
          text-transform: uppercase; letter-spacing: .10em; margin-bottom: 14px;
        }

        /* Redirect banner */
        .adm-redirect-banner {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border: 1.5px solid #bbf7d0;
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13.5px;
          font-weight: 600;
          color: #15803d;
          margin-bottom: 20px;
          animation: bzFadeIn .4s ease;
        }
        .adm-spinner {
          width: 18px; height: 18px; border: 2.5px solid #bbf7d0;
          border-top-color: #15803d; border-radius: 50%;
          animation: spin 0.8s linear infinite; flex-shrink: 0;
        }

        .adm-list-panel { padding: 36px 36px; overflow-y: auto; }
        .adm-list-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px; gap: 16px; flex-wrap: wrap;
        }
        .adm-list-kicker {
          font-size: 10.5px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: #c2440e; margin-bottom: 6px;
        }
        .adm-list-title {
          font-family: 'Playfair Display', serif; font-size: 22px;
          font-weight: 800; color: #1a1410;
        }
        .adm-list-count { font-size: 13px; color: #9c8878; margin-top: 3px; font-weight: 500; }

        .adm-search-wrap { position: relative; flex-shrink: 0; }
        .adm-search {
          padding: 10px 16px 10px 40px; border-radius: 10px;
          border: 1.5px solid #f0ebe3; background: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          color: #1a1410; outline: none; width: 240px;
          transition: border-color .2s, box-shadow .2s;
        }
        .adm-search:focus { border-color: #c2440e; box-shadow: 0 0 0 3px rgba(194,68,14,.10); }
        .adm-search-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); opacity: .4; }

        .adm-table-wrap {
          background: #fff; border-radius: 18px;
          border: 1.5px solid #f0ebe3; overflow: hidden;
          box-shadow: 0 4px 24px rgba(60,30,5,.06);
        }
        .adm-table { width: 100%; border-collapse: collapse; }
        .adm-th {
          padding: 13px 16px; text-align: left;
          font-size: 11px; font-weight: 700; color: #9c8878;
          text-transform: uppercase; letter-spacing: .09em;
          background: #fdf8f4; border-bottom: 1.5px solid #f0ebe3;
          white-space: nowrap;
        }
        .adm-td {
          padding: 14px 16px; border-bottom: 1px solid #f8f4f0;
          vertical-align: middle;
          animation: bzFadeIn .35s ease;
        }
        .adm-tr:last-child .adm-td { border-bottom: none; }
        .adm-tr:hover .adm-td { background: #fdf8f4; }

        .adm-book-cell { display: flex; align-items: center; gap: 12px; }
        .adm-book-thumb {
          width: 42px; height: 52px; border-radius: 8px;
          background: #f3f4f6;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0; border: 1px solid #e5e7eb;
        }
        .adm-book-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .adm-book-thumb-placeholder {
          font-size: 10px; color: #9ca3af; font-weight: 600; text-align: center; padding: 4px;
        }
        .adm-book-name { font-weight: 700; font-size: 13.5px; color: #1a1410; line-height: 1.3; }
        .adm-book-author { font-size: 12px; color: #9c8878; margin-top: 2px; }

        .adm-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 700; padding: 2px 8px;
          border-radius: 6px; border-width: 1px; border-style: solid; white-space: nowrap;
        }
        .adm-genre-tag {
          font-size: 11px; font-weight: 600; color: #c2440e;
          background: #fff3ed; border: 1px solid #fdd5bc;
          padding: 2px 8px; border-radius: 6px; white-space: nowrap;
        }

        .adm-price { font-size: 14px; font-weight: 800; color: #c2440e; }
        .adm-old-price { font-size: 11px; color: #c4b8ac; text-decoration: line-through; display: block; }
        .adm-disc-chip {
          display: inline-block; font-size: 10px; font-weight: 700;
          color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0;
          padding: 1px 6px; border-radius: 5px; margin-top: 2px;
        }

        .adm-action-btns { display: flex; gap: 6px; }
        .adm-btn-del {
          padding: 7px 14px; border-radius: 8px; border: 1.5px solid #f0ebe3;
          background: #fff; color: #9c8878; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: all .18s; white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .adm-btn-del:hover { background: #fff1f2; color: #be123c; border-color: #fecdd3; }
        .adm-btn-del.confirm { background: #fff1f2; color: #be123c; border-color: #fecdd3; animation: bzPulse 1s infinite; }

        .adm-empty { text-align: center; padding: 64px 24px; color: #9c8878; }
        .adm-empty-icon { font-size: 48px; margin-bottom: 14px; }
        .adm-empty-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #1a1410; margin-bottom: 6px; }
        .adm-empty-sub { font-size: 13px; }

        .adm-stats-strip { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
        .adm-stat {
          background: #fff; border: 1.5px solid #f0ebe3; border-radius: 14px;
          padding: 18px 20px; display: flex; align-items: center; gap: 14px;
          box-shadow: 0 2px 12px rgba(60,30,5,.05);
          transition: transform .2s, box-shadow .2s;
        }
        .adm-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(60,30,5,.10); }
        .adm-stat-icon {
          width: 42px; height: 42px; border-radius: 12px; display: flex;
          align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
        }
        .adm-stat-val { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 800; color: #1a1410; line-height: 1; }
        .adm-stat-lbl { font-size: 11.5px; color: #9c8878; font-weight: 500; margin-top: 3px; }

        @media(max-width:640px){
          .adm-row-2 { grid-template-columns: 1fr; }
          .adm-stats-strip { grid-template-columns: 1fr 1fr; }
          .adm-list-panel { padding: 24px 16px; }
          .adm-form-panel { padding: 24px 20px; }
        }
      `}</style>

      <Toast msg={toast.msg} type={toast.type} />

      <div className="adm-page">
        {/* TOP BAR */}
        <div className="adm-topbar">
          <Link href="/" className="adm-logo">
            <div className="adm-logo-icon">📚</div>
            Bookstore
          </Link>
          <nav className="adm-nav">
            <Link href="/" className="adm-nav-link">← Storefront</Link>
            <Link href="/books" className="adm-nav-link">Books</Link>
            <span className="adm-nav-link active">
              Admin
              <span className="adm-badge-count">{books.length}</span>
            </span>
          </nav>
        </div>

        {/* BODY */}
        <div className="adm-body">

          {/* LEFT: FORM PANEL */}
          <div className="adm-form-panel">
            <div className="adm-panel-header">
              <div className="adm-panel-kicker">✦ Admin Panel</div>
              <h1 className="adm-panel-title">Add New Book</h1>
              <p className="adm-panel-sub">
                Fill in the details — after saving you will be taken to the Books page.
              </p>
            </div>

            {/* Redirect notice shown while saving */}
            {saving && (
              <div className="adm-redirect-banner">
                <div className="adm-spinner" />
                Saving book and redirecting to Books page…
              </div>
            )}

            <form className="adm-form" onSubmit={handleSubmit} noValidate>
              {/* Basic Info */}
              <div className="adm-section-label">📖 Book Details</div>

              <div className="adm-field">
                <FieldLabel required>Title</FieldLabel>
                <input
                  name="title"
                  className={`adm-input${errors.title ? " error" : form.title ? " filled" : ""}`}
                  placeholder="e.g. The Midnight Library"
                  value={form.title}
                  onChange={handleChange}
                  onFocus={() => setFocusField("title")}
                  onBlur={() => setFocusField("")}
                />
                {errors.title && <span className="adm-err">⚠ {errors.title}</span>}
              </div>

              <div className="adm-field">
                <FieldLabel required>Author</FieldLabel>
                <input
                  name="author"
                  className={`adm-input${errors.author ? " error" : form.author ? " filled" : ""}`}
                  placeholder="e.g. Matt Haig"
                  value={form.author}
                  onChange={handleChange}
                />
                {errors.author && <span className="adm-err">⚠ {errors.author}</span>}
              </div>

              <div className="adm-row-2">
                <div className="adm-field">
                  <FieldLabel required>Genre</FieldLabel>
                  <select name="genre" className="adm-select" value={form.genre} onChange={handleChange}>
                    <option value="">Select genre…</option>
                    {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.genre && <span className="adm-err">⚠ {errors.genre}</span>}
                </div>
                <div className="adm-field">
                  <FieldLabel>Badge</FieldLabel>
                  <select name="badge" className="adm-select" value={form.badge} onChange={handleChange}>
                    <option value="">No badge</option>
                    {BADGES.filter(Boolean).map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <hr className="adm-divider" />

              {/* Pricing */}
              <div className="adm-section-label">💰 Pricing</div>

              <div className="adm-row-2">
                <div className="adm-field">
                  <FieldLabel required>Sale Price (₹)</FieldLabel>
                  <input
                    name="price" type="number" min="1"
                    className={`adm-input${errors.price ? " error" : form.price ? " filled" : ""}`}
                    placeholder="299"
                    value={form.price}
                    onChange={handleChange}
                  />
                  {errors.price && <span className="adm-err">⚠ {errors.price}</span>}
                </div>
                <div className="adm-field">
                  <FieldLabel required>Original Price (₹)</FieldLabel>
                  <input
                    name="oldPrice" type="number" min="1"
                    className={`adm-input${errors.oldPrice ? " error" : form.oldPrice ? " filled" : ""}`}
                    placeholder="499"
                    value={form.oldPrice}
                    onChange={handleChange}
                  />
                  {errors.oldPrice && <span className="adm-err">⚠ {errors.oldPrice}</span>}
                  {form.price && form.oldPrice && !errors.oldPrice && Number(form.oldPrice) > Number(form.price) && (
                    <span className="adm-hint" style={{ color: "#15803d" }}>
                      ✓ {Math.round(((form.oldPrice - form.price) / form.oldPrice) * 100)}% discount
                    </span>
                  )}
                </div>
              </div>

              <hr className="adm-divider" />

              {/* Ratings */}
              <div className="adm-section-label">⭐ Ratings & Reviews</div>

              <div className="adm-row-2">
                <div className="adm-field">
                  <FieldLabel required>Rating (0–5)</FieldLabel>
                  <input
                    name="rating" type="number" step="0.1" min="0" max="5"
                    className={`adm-input${errors.rating ? " error" : form.rating ? " filled" : ""}`}
                    placeholder="4.7"
                    value={form.rating}
                    onChange={handleChange}
                  />
                  {errors.rating && <span className="adm-err">⚠ {errors.rating}</span>}
                </div>
                <div className="adm-field">
                  <FieldLabel required>Review Count</FieldLabel>
                  <input
                    name="reviews" type="number" min="0"
                    className={`adm-input${errors.reviews ? " error" : form.reviews ? " filled" : ""}`}
                    placeholder="1200"
                    value={form.reviews}
                    onChange={handleChange}
                  />
                  {errors.reviews && <span className="adm-err">⚠ {errors.reviews}</span>}
                </div>
              </div>

              <hr className="adm-divider" />

              {/* Image */}
              <div className="adm-section-label">🖼 Cover Image</div>

              <div className="adm-field">
                <FieldLabel>Image URL or Path</FieldLabel>
                <input
                  name="image"
                  className="adm-input"
                  placeholder="/images/book.png or https://…"
                  value={form.image}
                  onChange={handleChange}
                />
                <span className="adm-hint">Paste a URL to see a preview below.</span>
                <div className="adm-img-preview">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="preview"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <span className="adm-img-placeholder">📷</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="adm-submit-row">
                <button
                  type="submit"
                  className="adm-btn-submit"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="adm-spinner" style={{ borderTopColor: "#fff", borderColor: "rgba(255,255,255,.3)" }} />
                      Saving…
                    </>
                  ) : (
                    <>✦ Save Book &amp; Go to Books</>
                  )}
                </button>
                <button
                  type="button"
                  className="adm-btn-clear"
                  onClick={() => { setForm(EMPTY_FORM); setErrors({}); }}
                  disabled={saving}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: LIST PANEL */}
          <div className="adm-list-panel">
            {/* Stats */}
            <div className="adm-stats-strip">
              {[
                { icon: "📚", bg: "#fff3ed", val: books.length, lbl: "Total Books" },
                {
                  icon: "⭐",
                  bg: "#fef9ee",
                  val: books.length
                    ? (books.reduce((s, b) => s + Number(b.rating), 0) / books.length).toFixed(1)
                    : "—",
                  lbl: "Avg Rating",
                },
                { icon: "🏷", bg: "#f0fdf4", val: books.filter((b) => b.badge).length, lbl: "Badged Books" },
              ].map(({ icon, bg, val, lbl }) => (
                <div className="adm-stat" key={lbl}>
                  <div className="adm-stat-icon" style={{ background: bg }}>{icon}</div>
                  <div>
                    <div className="adm-stat-val">{val}</div>
                    <div className="adm-stat-lbl">{lbl}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* List header */}
            <div className="adm-list-header">
              <div>
                <div className="adm-list-kicker">✦ Book Inventory</div>
                <div className="adm-list-title">Book List</div>
                <div className="adm-list-count">
                  {filtered.length} of {books.length} books
                  {search && ` matching "${search}"`}
                </div>
              </div>
              <div className="adm-search-wrap">
                <svg className="adm-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9c8878" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  className="adm-search"
                  placeholder="Search books…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
              <div className="adm-empty">
                <div className="adm-empty-icon">{search ? "🔍" : "📭"}</div>
                <p className="adm-empty-title">{search ? "No books found" : "No books yet"}</p>
                <p className="adm-empty-sub">
                  {search ? `No results for "${search}"` : "Add your first book using the form on the left."}
                </p>
              </div>
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th className="adm-th">Book</th>
                      <th className="adm-th">Genre</th>
                      <th className="adm-th">Badge</th>
                      <th className="adm-th">Price</th>
                      <th className="adm-th">Rating</th>
                      <th className="adm-th">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((book, i) => {
                      const bConf = badgeConfig[book.badge];
                      const d = discount(book);
                      return (
                        <tr key={book.id} className="adm-tr">
                          <td className="adm-td">
                            <div className="adm-book-cell">
                              <div className="adm-book-thumb">
                                {book.image ? (
                                  <img
                                    src={book.image}
                                    alt={book.title}
                                    onError={(e) => { e.target.style.display = "none"; }}
                                  />
                                ) : (
                                  <span className="adm-book-thumb-placeholder">No Img</span>
                                )}
                              </div>
                              <div>
                                <div className="adm-book-name">{book.title}</div>
                                <div className="adm-book-author">by {book.author}</div>
                              </div>
                            </div>
                          </td>
                          <td className="adm-td">
                            <span className="adm-genre-tag">{book.genre || "—"}</span>
                          </td>
                          <td className="adm-td">
                            {bConf ? (
                              <span className="adm-badge" style={{ background: bConf.bg, color: bConf.color, borderColor: bConf.border }}>
                                {book.badge}
                              </span>
                            ) : (
                              <span style={{ color: "#c4b8ac", fontSize: 12 }}>—</span>
                            )}
                          </td>
                          <td className="adm-td">
                            <span className="adm-price">₹{book.price}</span>
                            <span className="adm-old-price">₹{book.oldPrice}</span>
                            {d > 0 && <span className="adm-disc-chip">{d}% off</span>}
                          </td>
                          <td className="adm-td">
                            <span style={{ fontWeight: 700, fontSize: 13.5, color: "#b45309" }}>
                              ★ {book.rating}
                            </span>
                            <div style={{ fontSize: 11, color: "#bbb0a4", marginTop: 2 }}>
                              {Number(book.reviews).toLocaleString()} reviews
                            </div>
                          </td>
                          <td className="adm-td">
                            <div className="adm-action-btns">
                              <button
                                className={`adm-btn-del${deleteConfirm === book.id ? " confirm" : ""}`}
                                onClick={() => handleDelete(book.id, book.title)}
                              >
                                {deleteConfirm === book.id ? "⚠ Sure?" : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}