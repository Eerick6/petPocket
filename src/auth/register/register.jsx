import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppSettings } from "../../config/app-settings.js";

function Register() {
  const context = useContext(AppSettings);
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reEmail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setMessages([]);

    let newErrors = [];
    if (!firstName || !lastName || !email || !reEmail || !password) {
      newErrors.push("Todos los campos son obligatorios.");
    }
    if (email !== reEmail) {
      newErrors.push("Los correos electrónicos no coinciden.");
    }
    if (!agreement) {
      newErrors.push("Debe aceptar los términos y condiciones.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setMessages(["Registro exitoso. Redirigiendo..."]);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div id="app" className="app">
      <div className="register register-with-news-feed">
        <div className="news-feed">
          <div
            className="news-image"
            style={{ backgroundImage: "url(https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.webp?w=1600&h=1067)" }}
          ></div>
          <div className="news-caption">
            <h4 className="caption-title">
              <b>Pet</b> Pocket App
            </h4>
            <p>
              Como Pocketistrador de la aplicación Pet Pocket, puedes usar la consola de Pocketistración
              para gestionar la cuenta de tu organización, agregar nuevos usuarios, Pocketistrar la seguridad
              y activar los servicios que tu equipo necesita.
            </p>
          </div>
        </div>

        <div className="register-container">
          <div className="register-header mb-25px h1">
            <div className="mb-1">Regístrate</div>
            <small className="d-block fs-15px lh-16">
              Crea tu cuenta en Pet Pocket. Es gratis y siempre lo será.
            </small>
          </div>

          <div className="register-content">
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

              <div className="mb-3">
                <label className="mb-2">
                  Nombre <span className="text-danger">*</span>
                </label>
                <div className="row gx-3">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <input
                      type="text"
                      className="form-control fs-13px"
                      placeholder="Nombre"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control fs-13px"
                      placeholder="Apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="mb-2">
                  Correo electrónico <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control fs-13px"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="mb-2">
                  Confirmar correo electrónico <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control fs-13px"
                  placeholder="Confirma tu correo electrónico"
                  value={reEmail}
                  onChange={(e) => setReEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="mb-2">
                  Contraseña <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control fs-13px"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreementCheckbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="agreementCheckbox">
                  Al hacer clic en Registrarse, aceptas nuestros{" "}
                  <a href="#">Términos</a> y confirmas que has leído nuestra{" "}
                  <a href="#">Política de Datos</a>, incluyendo el uso de{" "}
                  <a href="#">Cookies</a>.
                </label>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="btn btn-theme d-block w-100 btn-lg h-45px fs-13px"
                >
                  Registrarse
                </button>
              </div>

              <div className="mb-4 pb-5">
                ¿Ya tienes una cuenta? Haz clic{" "}
                <Link to="/" className="text-primary">
                  aquí
                </Link>{" "}
                para iniciar sesión.
              </div>

              <hr className="bg-gray-600 opacity-2" />
              <p className="text-center text-gray-600">
                &copy; Pet Pocket Todos los derechos reservados 2025
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
