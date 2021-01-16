import React, { useState } from "react";

import LoginForm from "./Form/LoginForm";
import authApi from "../../apis/auth";
// import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "../../helpers/storage";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.auth_token,
        email,
        userId: response.data.userId,
      });
    //   setAuthHeaders();
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
