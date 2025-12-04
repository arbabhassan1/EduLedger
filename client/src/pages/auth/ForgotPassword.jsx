import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Mail, GraduationCap, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: import.meta.env.VITE_APP_RESET_REDIRECT_URL,
        }
      );

      if (error) {
        console.error("Error sending password reset email:", error.message);
      } else {
        console.log("Password reset requested for:", values.email);
      }
    } finally {
      setSubmitting(false);
      setSubmittedEmail(values.email);
      setSubmitted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="p-2 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl">
            <GraduationCap size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">EduManage</h1>
            <p className="text-sm text-gray-600">School Management</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-10"
        >
          {!submitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Reset Password
                </h2>
                <p className="text-gray-600">
                  Enter your email address and we'll send you a link to reset
                  your password
                </p>
              </div>

              <Formik
                initialValues={{ email: "" }}
                validationSchema={forgotPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="text-gray-400" size={20} />
                        </div>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            touched.email && errors.email
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-gray-50 hover:bg-white"
                          }`}
                          placeholder="your.email@school.com"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      />
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending Link...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </motion.button>
                  </Form>
                )}
              </Formik>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate("/")}
                className="w-full mt-6 flex items-center justify-center cursor-pointer gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                <ArrowLeft size={18} />
                Back to Sign In
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex justify-center mb-6"
              >
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-600 mb-2">
                  We've sent a password reset link to:
                </p>
                <p className="font-semibold text-gray-800 mb-6 break-all">
                  {submittedEmail}
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  If you don't see the email, please check your spam folder. The
                  link will expire in 24 hours.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium bg-blue-50 hover:bg-blue-100 py-3 rounded-xl cursor-pointer"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={18} />
                Back to Sign In
              </motion.button>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <a
              href="https://codewith.ab"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              CodeWith.AB
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
