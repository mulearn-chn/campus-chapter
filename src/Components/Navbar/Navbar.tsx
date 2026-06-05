import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { ULearn } from "../../assets/svg/svg";
import { useReactPath } from "./path.hook.ts";
import { AiOutlineMenu } from "react-icons/ai";
import data from "../../../data.json";

import { motion } from "framer-motion";

const Navbar = () => {
    const [openmenu, setopenmenu] = useState<boolean>(false);
    const [navbg, setNavBg] = useState<boolean>(false);
    function openMenu() {
        setopenmenu(!openmenu);
    }
    const path:string = useReactPath();
    const navContent:string[] = ["home", "about", "gallery", "team", "contact"];
    useEffect(() => {
        if(path === "/") return;
        setopenmenu(false);
     }, [path]);
    const changeNavBg = ():void => {
        window.scrollY >= 150 ? setNavBg(true) : setNavBg(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNavBg);
        return () => {
            window.removeEventListener("scroll", changeNavBg);
        };
    }, []);
    return (
        <motion.div
            className={styles.navbarWrapper}
            style={{
                background: navbg ? "rgba(255,255,255,0.4)" : "transparent",
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={styles.navbarLeft}>
                <a href="#home">
                    <ULearn/>
                    <p>{data.collegeCode}</p>
                </a>
            </div>
            <div className={styles.navbarRight}>
                <div>
                    {navContent.map((content, i) => (
                        <a href={`#${content}`} 
                        key={i.toString() + content}
                        >
                            <p
                                style={{
                                    borderBottom: window.location.href.includes(
                                        `#${content}`
                                    )
                                        ? "4px solid #B3B3FF"
                                        : "",
                                    height: "18px",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                }}
                            >
                                {content}
                            </p>
                        </a>
                    ))}
                </div>
                <button>
                    <a target="_blank" href="http://app.mulearn.org/register">Join µlearn</a>
                </button>
            </div>
            
            <div className={styles.navbarMobile}>
                <button onClick={openMenu} className={styles.hamburger}>
                    <AiOutlineMenu />
                </button>
                {openmenu && (
                    <div>
                        {navContent.map((content, i) => (
                            <a
                                href={`#${content}`}
                                key={i.toString() + content}
                            >
                                <p
                                    style={{
                                        borderBottom:
                                            window.location.href.includes(
                                                `#${content}`
                                            )
                                                ? "4px solid #B3B3FF"
                                                : "",
                                        height: "18px",
                                    }}
                                >
                                    {content}
                                </p>
                            </a>
                        ))}
                        <button>
                            <a href="http://app.mulearn.org">Join µlearn</a>
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Navbar;