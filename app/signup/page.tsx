"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HauntedLayout from "@/src/components/HauntedLayout";
import GlitchTitle from "@/src/components/GlitchTitle";
import SignUpForm from "@/src/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <HauntedLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <GlitchTitle text="Join the Darkness" size="md" />
          <motion.p
            className="mt-4 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Bind your soul to the haunted realm...
          </motion.p>
        </motion.div>

        {/* Sign Up Form */}
        <SignUpForm />

        {/* Link to Sign In */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm">
            Already bound to the darkness?{" "}
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 transition-colors underline"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </HauntedLayout>
  );
}
