import styles from "./About.module.css";
import data from "../../../data.json"

import { motion } from "framer-motion";

const About = () => {
    return (
        <motion.div 
            id="about" 
            className={styles.AboutWrapper}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <h1>About Us</h1>
            <p>{data.about}</p>
        </motion.div>
    );
};

export default About;
