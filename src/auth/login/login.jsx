import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppSettings } from "../../config/app-settings.js";

function Login() {
  const context = useContext(AppSettings);
  const navigate = useNavigate();

  // Estados para manejar el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState([]); // Array de errores
  const [messages, setMessages] = useState([]); // Array de mensajes de éxito

  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("");
    };
  }, []);

  // Simulación de autenticación
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]); // Limpiar errores previos
    setMessages([]); // Limpiar mensajes previos

    let newErrors = [];
    let newMessages = [];

    if (!email || !password) {
      newErrors.push("Todos los campos son obligatorios");
    }

    if (email === "admin@example.com" && password === "123456") {
        navigate("/home");
      
    } else {
      newErrors.push("Correo o contraseña incorrectos");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }
  };

  return (
    <div id="app" className="app">
      <div className="login login-with-news-feed">
        <div className="news-feed">
          <div
            className="news-image"
            style={{
              backgroundImage: "url(../assets/img/perrito.jpg)",
            }}
          ></div>
          <div className="news-caption">
            <h4 className="caption-title">
              <b>Pet</b> Pocket App
            </h4>
          </div>
        </div>

        <div className="login-container">
          <div className="login-header mb-30px">
            <div className="brand">
              <b>Pet</b> Pocket
              <small>Amamos a tu mascota</small>
            </div>
          </div>

          <div className="login-content">
            <form onSubmit={handleSubmit} className="fs-13px">
              {errors.length > 0 && (
                <div className="alert alert-danger">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              {messages.length > 0 && (
                <div className="alert alert-success">
                  {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                  ))}
                </div>
              )}
              <div className="form-floating mb-15px">
                <input
                  type="email"
                  className="form-control h-45px fs-13px"
                  placeholder="Email Address"
                  id="emailAddress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="emailAddress">Email Address</label>
              </div>
              <div className="form-floating mb-15px">
                <input
                  type="password"
                  className="form-control h-45px fs-13px"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-check mb-30px">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <div className="mb-15px">
                <button
                  type="submit"
                  className="btn btn-theme d-block h-45px w-100 btn-lg fs-14px"
                >
                  Sign me in
                </button>
              </div>
              <div className="mb-40px pb-40px text-dark">
                No eres miembro? Click{" "}
                <Link to="/register" className="text-primary">
                  aquí
                </Link>{" "}
                para registrarse.
              </div>
              <hr className="bg-gray-600 opacity-2" />
              <div className="text-gray-600 text-center">
                &copy; Pet Pocket All Right Reserved 2025
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
