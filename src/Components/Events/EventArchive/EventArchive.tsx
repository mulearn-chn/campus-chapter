import { useState } from "react";
import styles from "./EventArchive.module.css";
import data from "../../../../data.json";

const EventArchive = () => {
  const years = Object.keys(data.eventArchive).reverse();
  const [activeYear, setActiveYear] = useState(years[0]);

  const events = data.eventArchive[
    activeYear as keyof typeof data.eventArchive
  ];

  return (
    <div className={styles.eventArchive}>
      <h2>Event Archive</h2>

      <div className={styles.yearTabs}>
        {years.map((year) => (
          <button
            key={year}
            className={`${styles.yearBtn} ${
              activeYear === year ? styles.active : ""
            }`}
            onClick={() => setActiveYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className={styles.eventsGrid}>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className={styles.eventCard}>
              <img
                src={event.img}
                alt={event.head}
                loading="lazy"
              />

              <div className={styles.eventContent}>
                <span className={styles.eventDate}>
                  {event.month} {event.date}
                </span>

                <h3>{event.head}</h3>

                <p>{event.para}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            No events added for {activeYear} yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventArchive;