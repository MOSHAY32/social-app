import React from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <motion.div
        style={{ width: "400px" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SignIn routing="path" path="/login" />
        <SignUp routing="path" path="/register" />
      </motion.div>
    </div>
  );
};

export default Login;