
import { motion } from "framer-motion";

const FadeIn = ({ children, duration = 2 }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration }}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
