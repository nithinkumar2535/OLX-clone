import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import { Link, useNavigate } from "react-router-dom";
import {FirebaseContext} from '../../store/Context'
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const {firebase,} = useContext(FirebaseContext);

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(firebase, email, password)
      .then((result) => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }



  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-5 col-xl-4 col-md-6 col-sm-8">
            <div
              className="card text-black"
              style={{ borderRadius: "10px", backgroundColor: "#d8e8dc" }}
            >
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-12 col-xl-11 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold ">Login</p>
                    <div className=" m-auto col-md-10 col-lg-6 col-xl-7 d-flex align-items-center justify-content-center order-1 order-lg-2">
                      <img
                        src={Logo}
                        className="img-fluid"
                        id="image-signup"
                        alt="Sample image"
                      />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 mb-4 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="email" htmlFor="email">
                            Your Email
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center justify-content-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 mb-4 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        {loading ? (
                          <button
                            class="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Loading...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary btn"
                          >
                            Login
                          </button>
                        )}
                      </div>
                    </form>
                    <p>
                      Don't have an account?{" "}
                      <Link to={"/signup"} className="text-dark">
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
