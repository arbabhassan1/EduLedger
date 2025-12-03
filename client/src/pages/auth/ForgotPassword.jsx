import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { loginContent } from "../../utils/data";
import { useState } from "react";

export const ForgotPasswordScreen = ({ onBackToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(loginContent.validation.emailInvalid)
      .required(loginContent.validation.emailRequired),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log("Reset email:", values.email);
      setSubmittedEmail(values.email);
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1500);
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 lg:p-16 flex-col justify-between relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Password Recovery
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              We'll help you regain access to your School Funds Record System
              account in just a few steps.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">Quick & Secure</p>
                <p className="text-blue-100 text-sm">
                  Your account will be protected with a secure reset link
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1">Instant Delivery</p>
                <p className="text-blue-100 text-sm">
                  Reset instructions delivered to your email immediately
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 mt-8 lg:mt-0"
        >
          <p className="text-sm text-blue-200">
            Developed with care by{" "}
            <a
              href={`mailto:${loginContent.developer.email}`}
              className="font-semibold text-white hover:text-blue-100 transition-colors underline decoration-2 underline-offset-2"
            >
              {loginContent.developer.brand}
            </a>
          </p>
        </motion.div>
      </motion.div>

      <div className="w-full lg:w-1/2 bg-gray-50 lg:bg-white p-6 sm:p-8 lg:p-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full lg:max-w-md bg-white lg:bg-transparent rounded-xl lg:rounded-none shadow-sm lg:shadow-none border border-gray-200 lg:border-none p-6 lg:p-0"
            >
              <motion.button
                onClick={onBackToLogin}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors group"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {loginContent.forgotPassword.backToLogin}
              </motion.button>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {loginContent.forgotPassword.title}
                </h2>
                <p className="text-gray-600">
                  {loginContent.forgotPassword.subtitle}
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {loginContent.forgotPassword.emailLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`block w-full pl-10 pr-3 py-3 border ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                      placeholder={loginContent.forgotPassword.emailPlaceholder}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {formik.errors.email}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    loginContent.forgotPassword.submitButton
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full lg:max-w-md bg-white lg:bg-transparent rounded-xl lg:rounded-none shadow-sm lg:shadow-none border border-gray-200 lg:border-none p-6 lg:p-0 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="mb-6 flex justify-center"
              >
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {loginContent.forgotPassword.successMessage}
                </h2>
                <p className="text-gray-600 mb-6">
                  {loginContent.forgotPassword.successDescription}
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
                >
                  <p className="text-sm text-blue-900 font-medium break-all">
                    {submittedEmail}
                  </p>
                </motion.div>

                <motion.button
                  onClick={onBackToLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                  {loginContent.forgotPassword.backToLogin}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
