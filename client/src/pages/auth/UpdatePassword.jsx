// import { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { motion } from "framer-motion";
// import {
//   Lock,
//   GraduationCap,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   ArrowLeft,
// } from "lucide-react";
// import supabase from "../../utils/supabase";
// const updatePasswordSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), undefined], "Passwords must match")
//     .required("Please confirm your password"),
// });

// const UpdatePassword = ({ email, onBack, onSuccess }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [completed, setCompleted] = useState(false);

//   const updateUserPassword = async (password) => {
//     try {
//       const { data, error } = await supabase.auth.updateUser({
//         password: password,
//       });

//       if (error) {
//         console.error("Error updating password:", error.message);
//         return { success: false, message: error.message };
//       }

//       console.log("Password updated successfully");
//       return { success: true };
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       return { success: false, message: "Unexpected error occurred" };
//     }
//   };

//   const handleSubmit = async () => {
//     const result = await updateUserPassword(password);

//     if (result.success) {
//       alert("Password updated! Please log in again.");
//       navigate("/login");
//     } else {
//       alert(result.message);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-gray-50 to-gray-100"
//     >
//       <div className="w-full max-w-md">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="flex items-center justify-center gap-3 mb-8"
//         >
//           <div className="p-2 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl">
//             <GraduationCap size={32} className="text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">EduManage</h1>
//             <p className="text-sm text-gray-600">School Management</p>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-xl p-8 sm:p-10"
//         >
//           {!completed ? (
//             <>
//               <div className="mb-8">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                   Create New Password
//                 </h2>
//                 <p className="text-gray-600">
//                   Enter a strong password for your account
//                 </p>
//               </div>

//               <Formik
//                 initialValues={{ password: "", confirmPassword: "" }}
//                 validationSchema={updatePasswordSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ isSubmitting, touched, errors }) => (
//                   <Form className="space-y-6">
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.4 }}
//                     >
//                       <label
//                         htmlFor="password"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         New Password
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                           <Lock className="text-gray-400" size={20} />
//                         </div>
//                         <Field
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           id="password"
//                           className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                             touched.password && errors.password
//                               ? "border-red-500 bg-red-50"
//                               : "border-gray-300 bg-gray-50 hover:bg-white"
//                           }`}
//                           placeholder="Enter new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
//                         >
//                           {showPassword ? (
//                             <EyeOff
//                               className="text-gray-400 hover:text-gray-600"
//                               size={20}
//                             />
//                           ) : (
//                             <Eye
//                               className="text-gray-400 hover:text-gray-600"
//                               size={20}
//                             />
//                           )}
//                         </button>
//                       </div>
//                       <ErrorMessage
//                         name="password"
//                         component="div"
//                         className="mt-2 text-sm text-red-600"
//                       />
//                       <p className="mt-2 text-xs text-gray-500">
//                         Password must contain: 8+ characters, uppercase,
//                         lowercase, and number
//                       </p>
//                     </motion.div>

//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       <label
//                         htmlFor="confirmPassword"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Confirm Password
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                           <Lock className="text-gray-400" size={20} />
//                         </div>
//                         <Field
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           id="confirmPassword"
//                           className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                             touched.confirmPassword && errors.confirmPassword
//                               ? "border-red-500 bg-red-50"
//                               : "border-gray-300 bg-gray-50 hover:bg-white"
//                           }`}
//                           placeholder="Re-enter password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setShowConfirmPassword(!showConfirmPassword)
//                           }
//                           className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff
//                               className="text-gray-400 hover:text-gray-600"
//                               size={20}
//                             />
//                           ) : (
//                             <Eye
//                               className="text-gray-400 hover:text-gray-600"
//                               size={20}
//                             />
//                           )}
//                         </button>
//                       </div>
//                       <ErrorMessage
//                         name="confirmPassword"
//                         component="div"
//                         className="mt-2 text-sm text-red-600"
//                       />
//                     </motion.div>

//                     <motion.button
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.6 }}
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <svg
//                             className="animate-spin h-5 w-5"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                               fill="none"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             />
//                           </svg>
//                           Updating Password...
//                         </span>
//                       ) : (
//                         "Update Password"
//                       )}
//                     </motion.button>
//                   </Form>
//                 )}
//               </Formik>

//               <motion.button
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.7 }}
//                 onClick={onBack}
//                 className="w-full mt-6 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
//               >
//                 <ArrowLeft size={18} />
//                 Back to Sign In
//               </motion.button>
//             </>
//           ) : (
//             <>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                   delay: 0.3,
//                   duration: 0.5,
//                   type: "spring",
//                   stiffness: 100,
//                 }}
//                 className="flex justify-center mb-6"
//               >
//                 <div className="p-4 bg-green-100 rounded-full">
//                   <CheckCircle size={48} className="text-green-600" />
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5, duration: 0.5 }}
//                 className="text-center"
//               >
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Password Reset Successfully
//                 </h2>
//                 <p className="text-gray-600">
//                   Your password has been updated. Redirecting to sign in...
//                 </p>
//               </motion.div>
//             </>
//           )}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="mt-8 text-center"
//         >
//           <p className="text-sm text-gray-500">
//             Powered by{" "}
//             <a
//               href="https://codewith.ab"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
//             >
//               CodeWith.AB
//             </a>
//           </p>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default UpdatePassword;

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  Lock,
  GraduationCap,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

const updatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

const UpdatePassword = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  // ---- FIXED ----
  const updateUserPassword = async (password) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.error("Error updating password:", error.message);
        return { success: false, message: error.message };
      }

      console.log("Password updated successfully");
      return { success: true };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { success: false, message: "Unexpected error occurred" };
    }
  };

  // ---- FIXED: Receive Formik values ----
  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await updateUserPassword(values.password);

    setSubmitting(false);

    if (result.success) {
      setCompleted(true);

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } else {
      alert(result.message);
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
        {/* Branding */}
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
          {!completed ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Create New Password
                </h2>
                <p className="text-gray-600">
                  Enter a strong password for your account
                </p>
              </div>

              {/* ------------ FORM START ------------ */}
              <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={updatePasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form className="space-y-6">
                    {/* Password Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="text-gray-400" size={20} />
                        </div>

                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl transition-all duration-200 ${
                            touched.password && errors.password
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-gray-50 hover:bg-white"
                          }`}
                          placeholder="Enter new password"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="text-gray-400" size={20} />
                        </div>

                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl transition-all duration-200 ${
                            touched.confirmPassword && errors.confirmPassword
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 bg-gray-50 hover:bg-white"
                          }`}
                          placeholder="Re-enter password"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="mt-2 text-sm text-red-600"
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-70"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </motion.button>
                  </Form>
                )}
              </Formik>
              {/* ------------ FORM END ------------ */}

              <motion.button
                onClick={onBack}
                className="w-full mt-6 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
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
                transition={{ delay: 0.3 }}
                className="flex justify-center mb-6"
              >
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Password Reset Successfully
                </h2>
                <p className="text-gray-600">Redirecting to sign in...</p>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UpdatePassword;
