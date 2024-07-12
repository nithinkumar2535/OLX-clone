import React, { useState ,useContext} from "react";
import Logo from "../../olx-logo.png";
import { useNavigate,Link} from "react-router-dom";
import {FirebaseContext} from '../../store/Context'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { updateProfile } from "firebase/auth/web-extension";
import { addDoc, collection } from "firebase/firestore";





function Signup() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [confirmPass,setConfirmPass] = useState('');
  const [phone,setPhone] = useState('');
  const [loading,setLoading] = useState(false)
  const {firebase,db} = useContext(FirebaseContext);
  const navigate = useNavigate();


  

  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true)

    if(password !== confirmPass){
      alert("password do not match")
      setLoading(false)
      return;
    }




      createUserWithEmailAndPassword(firebase,email,password)
      .then((result) => {
       const user = result.user;
       updateProfile(user,{displayName:name})
       .then(()=>{
        addDoc(collection(db,"users"),{
          id: user.uid,
          name: name,
          phone:phone
        })
        .then(()=>{
          setLoading(false)
          navigate('/login')
        })
       
       })
       .catch((err)=>{
        setLoading(false)
        console.log("error storing in firebase",err);
       })
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        // ..
      });
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-10">
            <div
              className="card text-black"
              style={{ borderRadius: "25px", backgroundColor: "#d8e8dc" }}
            >
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3  mb-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="text"
                            id="fname"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="fname">
                            Your Name
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 mb-3 fa-fw"></i>
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
                            required
                          />
                          <label className="email" htmlFor="email">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3  mb-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="number"
                            id="phone"
                            className="form-control"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Mobile Number
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3  mb-3 fa-fw"></i>
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
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3  mb-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <input
                            type="password"
                            id="setpass"
                            className="form-control"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="setpass">
                            Repeat your password
                          </label>
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                          required
                        />
                        I agree to all statements in{" "}
                        <a href="#!" id="terms" className="text-dark">
                          Terms of service
                        </a>
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
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </form>
                    <p>
                      Already have an account?{" "}
                      <Link to={"/login"} className="text-dark">
                        {" "}
                        Login
                      </Link>
                    </p>
                  </div>
                  <div className="col-md-5 col-lg-6 col-xl-7 col-sm-6 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={Logo}
                      className="img-fluid"
                      id="image-signup"
                      alt="Sample image"
                    />
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

export default Signup;
