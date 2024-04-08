import React from "react";
import { motion } from "framer-motion";
export default function AnimatePage({ children }) {
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
}


export function AnimateOnHover({ children }) {
  return (
    <motion.div
      className="box"
      whileHover={{ scale: [null, 1.2, 1.2] }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

