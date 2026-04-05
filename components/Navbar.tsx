import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/10 border-b border-white/20"
    >
      <div className="text-white font-bebas text-3xl tracking-wider">
        P R I M E
      </div>
      
      <button className="bg-gradient-to-r from-primeRed to-primeBlue px-8 py-3 rounded-full text-white font-bebas text-xl tracking-wide hover:scale-105 transition-transform shadow-lg shadow-black/20">
        $20 BUY NOW
      </button>
    </motion.nav>
  );
}
