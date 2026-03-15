"use client";

import styles from "../bookingModal/BookingModal.module.css";

interface CabanaInfoModalProps {
  cabanaId: string;
  room: string | null;
  guestName: string | null;
  onClose: () => void;
}

export default function CabanaInfoModal({
  cabanaId,
  room,
  guestName,
  onClose,
}: CabanaInfoModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Cabana {cabanaId}</h2>

        <p>
          This cabana is already booked.
          {room && guestName && (
            <>
              <br />
              <strong>Room:</strong> {room}
              <br />
              <strong>Guest:</strong> {guestName}
            </>
          )}
        </p>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
