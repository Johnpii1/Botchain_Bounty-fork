// SignUp.jsx
import AuthModal from "./AuthModal";
import { useState } from "react";

function SignUp() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="
          rounded-lg
          border border-[#D4AF37]
          bg-[#D4AF37]
          px-5 py-2
          text-sm font-semibold
          text-white
          shadow-[0_4px_16px_rgba(212,175,55,0.18)]
          transition-all duration-200
          hover:bg-[#C9A227]
          hover:border-[#C9A227]
          hover:shadow-[0_6px_22px_rgba(212,175,55,0.28)]
          active:scale-[0.98]
        "
      >
        Sign Up
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

export default SignUp;