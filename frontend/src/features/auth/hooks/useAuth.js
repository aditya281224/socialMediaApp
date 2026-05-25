import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, getMe } from "../services/auth.api.js";

export function useAuth() {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (userName, password) => {
    setLoading(true);
    try {
      const response = await login(userName, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userName, email, password) => {
    setLoading(true);
    try {
      const response = await register(userName, email, password);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,loading,handleLogin,handleRegister
  };
}
