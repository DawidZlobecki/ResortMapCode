"use client";

import { useState } from "react";
import styles from "./BookingModal.module.css";

interface BookingModalProps {
  cabanaId: string;
  onClose: () => void;
  onSuccess: () => void;
}

function normalizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default function BookingModal({
  cabanaId,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [room, setRoom] = useState("");
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const normalizedGuest = normalizeName(guestName);

    try {
      const res = await fetch("http://localhost:4000/api/cabanas/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cabanaId,
          room,
          guestName: normalizedGuest,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed");
        setLoading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Book Cabana {cabanaId}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Room Number</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Guest Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Booking..." : "Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
