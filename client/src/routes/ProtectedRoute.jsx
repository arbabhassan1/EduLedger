import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../utils/supabase";
import Loading from "../components/Loading";
const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error(error.message);
      }

      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <Loading />; // optional loading spinner

  if (!user) {
    return <Navigate to="/" />; // redirect to login if not authenticated
  }

  return children;
};

export default PrivateRoute;
