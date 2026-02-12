import { motion } from "motion/react";

const Description = ({ title, subtitle, sentence }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-14 pb-2 px-10 text-center relative overflow-hidden"
      style={{ fontFamily: "var(--techovier)" }}
    >
      {/* Glow */}
      <div
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      />

      <h2 className="text-5xl tracking-wider font-black leading-tight font-heading text-gray-100 relative">
        {title}
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          {subtitle}
        </span>
      </h2>

      <p className="text-white text-xl max-w-2xl mx-auto mt-3 font-heading relative">
        {sentence}
      </p>
    </motion.section>
  );
};

export default Description;