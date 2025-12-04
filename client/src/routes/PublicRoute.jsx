import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../utils/supabase";
import Loading from "../components/Loading";
const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) console.error(error.message);

      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <Loading />;

  if (user) return <Navigate to="/dashboard" />; // redirect if logged in

  return children;
};

export default PublicRoute;
