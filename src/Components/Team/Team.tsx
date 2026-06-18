import { useState, useEffect, useRef } from "react";
import styles from "./Team.module.css";
import data from "../../../data.json";
import line from "./assets/line.png";
import line2 from "./assets/line2.png";
import { motion } from "framer-motion";

const Team = () => {
  const teamMembers = Object.keys(data.team).length;
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.screen.width : 1200
  );
  const [screenHeight, setScreenHeight] = useState(
    typeof window !== "undefined" ? window.screen.height : 800
  );
  const [rowCount, setRowCount] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function calculateLinePositions(
    numRows: number,
    topOffsetPercent: number = 3
  ): string[] {
    const positions: string[] = [];
    if (numRows <= 1) {
      return [topOffsetPercent + "%"];
    }

    const usableHeight = 100 - topOffsetPercent;

    for (let i = 0; i < numRows; i++) {
      const position = topOffsetPercent + (i / (numRows - 1)) * usableHeight;
      const clampedPosition = Math.min(position, 100);
      const factor =
        i === 0
          ? 0
          : window.innerWidth <= 768
          ? i === 1
            ? 0
            : 1 * i
          : i !== numRows - 1
          ? 5 * i
          : 20;
      positions.push(parseFloat(clampedPosition.toFixed(2)) - factor + "%");
    }

    return positions;
  }

  interface RowCalculationParams {
    totalItems: number;
    containerWidth: number;
    imageWidth: number;
  }

  const calculateRows = ({
    totalItems,
    containerWidth,
    imageWidth,
  }: RowCalculationParams): number => {
    const imagesPerRow = Math.floor(containerWidth / imageWidth);
    if (imagesPerRow === 0) return totalItems;
    return Math.ceil(totalItems / imagesPerRow) + (window.innerWidth <= 768
      ? 0
      : window.innerWidth <= 1300?0:1);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.screen.width);
      setScreenHeight(window.screen.height);

      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      } else {
        setContainerWidth(screenWidth * 0.8);
      }
    };

    handleResize();
   // window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth, screenHeight]);

  useEffect(() => {
    let imageWidth;
    if (screenWidth <= 400) {
      imageWidth = screenWidth * 0.4;
    } else if (screenWidth <= 500) {
      imageWidth = screenWidth * 0.35;
    } else if (screenWidth <= 900) {
      imageWidth = screenWidth * 0.25;
    } else if (screenWidth <= 1200) {
      imageWidth = screenWidth * 0.2;
    } else {
      imageWidth = 250;
    }

    const rows = calculateRows({
      totalItems: teamMembers,
      containerWidth,
      imageWidth,
    });
    setRowCount(Math.max(rows, 1));
  }, [teamMembers, containerWidth, screenWidth]);

  const linePositions = calculateLinePositions(rowCount, 3);

  const lineImages = [];
  for (let i = 0; i < rowCount; i++) {
    lineImages.push(
      <img
        key={`line-${i}`}
        src={i % 2 === 0 ? line : line2}
        alt=""
        loading="lazy"
        className={styles.lineImage}
        style={{ top: linePositions[i] }}
      />
    );
  }

  return (
    <div className={styles.teamWrapper} id="team">
      <h1>Our Team</h1>
      <div className={styles.teamBodyWrapper}>
        <div className={styles.teamBgLineWrapper}>{lineImages}</div>
        <motion.div 
          ref={containerRef} 
          className={styles.teamMembersDetailsWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
        >
          {[
            { member: data.team.staffAdvisor, title: "Lead Enabler", adjust: true },
            { member: data.team.campusLead, title: "Campus Lead" },
            { member: data.team.campusCoLead, title: "Campus Co-Lead" },
            { member: data.team.creativeLead, title: "Creative Lead" },
            { member: data.team.operationLead, title: "Operation Lead" },
            { member: data.team.technicalLead, title: "Technical Lead", adjust: true },
            { member: data.team.mediaLead, title: "Media Lead" },
            { member: data.team.contentLead, title: "Content Lead" },
            { member: data.team.operationTeam1, title: "Operation Team" },
            { member: data.team.operationTeam2, title: "Operation Team" },
            { member: data.team.designer1, title: "Designer" },
            { member: data.team.designer2, title: "Designer" },
            { member: data.team.contentTeam1, title: "Content Team" },
            { member: data.team.contentTeam2, title: "Content Team", adjust: true },
            { member: data.team.mediaTeam1, title: "Media Team" },
            { member: data.team.mediaTeam2, title: "Media Team" },
            { member: data.team.igLeadAI, title: "IG Lead-AI" },
            { member: data.team.igLeadDesign, title: "IG Lead-UI/UX" },
            { member: data.team.igLeadCyberSecurity, title: "IG Lead-Cyber Security" },
            { member: data.team.igLeadWeb, title: "IG Lead-Web" },
            { member: data.team.igLeadEntrepreneurship, title: "IG Lead-Entrepreneurship" }
          ].map((item, index) => (
            <motion.div 
              className={styles.team} 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 70, damping: 15 }
                }
              }}
            >
              <div className={styles.team1Img}>
                <img
                  className={`${styles.teamImageIndividual}${item.adjust ? ` ${styles.ImagePositionAdjust}` : ''}`}
                  src={item.member.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.teamNameDesignation}>
                <div className={styles.teamMemberName}>
                  {item.member.name}
                </div>
                <div className={styles.teamMemberDesignation}>{item.title}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
