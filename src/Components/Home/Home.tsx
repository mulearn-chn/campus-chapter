import styles from "./Home.module.css";
import image from "./assets/homeimg.svg";
import { BlueStar, WhiteStar, Mu } from "./assets/svg";
import data from '../../../data.json'

import { motion } from "framer-motion";

const Home = () => {
    return (
        <div id="home" className={styles.HomeWrapper}>
            <motion.div 
                className={styles.contentWraper}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
                <h1>Welcome to the</h1>
                <h2>µverse</h2>
                <p>{data.college}</p>
            </motion.div>
            <motion.img 
                src={image} 
                alt="" 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            <div className={styles.start1}>
                <BlueStar size="50px" />
            </div>{" "}
            <div className={styles.start2}>
                <BlueStar size="70px" />
            </div>{" "}
            <div className={styles.start3}>
                <WhiteStar size="40px" />
            </div>
            <div className={styles.start4}>
                <WhiteStar size="40px" />
            </div>{" "}
            <div className={styles.start5}>
                <Mu size="23vw" rotate="30deg" />
            </div>
            <div className={styles.start6}>
                <Mu size="15vw" rotate="30deg" />
            </div>{" "}
            <div className={styles.start7}>
                <Mu size="15vw" rotate="-10deg" />
            </div>{" "}
            <div className={styles.start8}>
                <Mu size="7vw" rotate="-10deg" />
            </div>
        </div>
    );
};

export default Home;