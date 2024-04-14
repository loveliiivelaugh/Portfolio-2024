import { useEffect} from "react";
import { animate, motion } from "framer-motion";

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  backgroundColor: "black",
  borderRadius: "50%"
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around"
};

export default function ThreeDotsWave(props) {
  useEffect(() => {
    console.log("isLoading: ", props.isLoading)
    if (props.isLoading) {
      const intervalId = setInterval(() => {
        animate(".dot", {
          transition: {
            y: -200,
            duration: 0.5,
            yoyo: Infinity,
            ease: "easeInOut"
          }
        });
        animate(".dot", {
          transition: {
            y: 200,
            duration: 0.5,
            yoyo: Infinity,
            ease: "easeInOut"
          }
        });
      }, 20); // Adjust interval as needed

      return () => clearInterval(intervalId);
    }
  }, [props.isLoading]);

  return (
    <div
      style={{
        paddingTop: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={LoadingContainer}>
        <motion.span style={LoadingDot} className="dot" />
        <motion.span style={LoadingDot} className="dot" />
        <motion.span style={LoadingDot} className="dot" />
      </div>
    </div>
  );
}
