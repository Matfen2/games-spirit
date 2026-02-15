import { motion } from "motion/react";

const Description = ({ title, subtitle, sentence }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-6 pb-2 px-4 sm:px-6 md:px-10 text-center relative overflow-hidden"
      style={{ fontFamily: "var(--techovier)" }}
    >
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" />

      <h2
        className="text-3xl sm:text-4xl md:text-5xl tracking-wider font-black leading-tight font-heading text-gray-100 relative"
        style={{ letterSpacing: "0.25em" }}
      >
        {title}
        <span
          className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          style={{ letterSpacing: "0.25em" }}
        >
          {subtitle}
        </span>
      </h2>

      <p
        className="text-white text-sm sm:text-base md:text-xl max-w-3xl mx-auto mt-2 sm:mt-3 font-heading relative"
        style={{ letterSpacing: "0.15em" }}
      >
        {sentence}
      </p>
    </motion.section>
  );
};

export default Description;