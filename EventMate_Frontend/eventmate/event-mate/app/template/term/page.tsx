"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TermsPage({ onAgree }: { onAgree: () => void }) {
  const [agree, setAgree] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-01.jpg')" }}>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl px-8 py-10 w-full max-w-md mx-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Terms and Conditions</h2>
        
        <div className="text-gray-700 text-sm space-y-4 max-h-60 overflow-y-auto p-4 border border-gray-300 rounded-md bg-white">
          <p>By using this service, you agree to the following terms...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisl nec...</p>
          <p>We reserve the right to modify these terms at any time...</p>
          <p>More terms and conditions details here...</p>
        </div>
        
        <div className="mt-4">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-gray-700 text-sm cursor-pointer">
            I have read the terms and agree
          </label>
        </div>

        <motion.button
          onClick={onAgree}
          disabled={!agree}
          className={`w-full py-2 rounded-md font-semibold transition-all duration-300 mt-4
            ${agree ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          whileHover={agree ? { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.3)" } : {}}
        >
          Back to Sign Up
        </motion.button>
      </motion.div>
    </div>
  );
}
