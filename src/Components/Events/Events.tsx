import styles from "./Events.module.css";
import data from "../../../data.json";

import { motion } from "framer-motion";

const Events = () => {
  return (
    <div className={styles.events}>
      <h2>Our Event Journey</h2>
      <div className={styles.innerDiv}>
        <motion.div 
          className={styles.card + " " + styles.large}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
          <div className={styles.content}>
            <div className={styles.date}>
              <span>{data["events"][0].month}</span>
              <span>{data["events"][0].date}</span>
            </div>
            <div className={styles.text}>
              <strong>{data["events"][0].head}</strong>
              <span>{data["events"][0].para}</span>
            </div>
          </div>
          <img src={data["events"][0].img} alt="" />
        </motion.div>
        <div className={styles.subContent}>
          {data.events.slice(1).map((event, index) => {
            return (
              <motion.div 
                className={styles.card + " " + styles.small} 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 60, damping: 20, delay: index * 0.1 }}
              >
                <div className={styles.content}>
                  <div className={styles.date}>
                    <span>{event.month}</span>
                    <span>{event.date}</span>
                  </div>
                  <div className={styles.text}>
                    <strong>{event.head}</strong>
                    <span>{event.para}</span>
                  </div>
                </div>
                <img src={event.img} alt="" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
