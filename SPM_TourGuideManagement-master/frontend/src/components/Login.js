import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//import css file from style sheets directory
import styles from "../style_sheets/Login.module.css";

export default function Login({ login }) {
  const initialUserEnteredInfo = {
    user_name: "",
    password: "",
  };

  const [data, setData] = useState();
  const [userEnteredInfo, setUserEnteredInfo] = useState(
    initialUserEnteredInfo
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserEnteredInfo({ ...userEnteredInfo, [name]: value });
  };

  function loginUser(e) {
    e.preventDefault();
    
    axios.post("http://localhost:8070/user/login", userEnteredInfo)  // Changed endpoint back to original
      .then((res) => {
        if (res.data.success) {
          const userRole = res.data.user.role;
          localStorage.setItem('userRole', userRole);
          login(res.data.user._id);
          window.location = '/home';
        } else {
          alert(res.data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        console.error("Login error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login failed. Please check your credentials.");
      });
  }

  return (
    <section className={styles.gradientForm}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{
                borderRadius: "15px",
                borderColor: "white",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div className="card-body p-5 text-center">
                <h2 className="mb-5">Sign in</h2>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="user_name"
                    className="form-control"
                    placeholder="Username"
                    value={userEnteredInfo.user_name}
                    onChange={handleInputChange}
                    name="user_name"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value={userEnteredInfo.password}
                    onChange={handleInputChange}
                    name="password"
                  />
                </div>

                <div
                  className="form-check d-flex justify-content-start mb-4"
                  style={{ marginTop: "25px" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="form1Example3"
                    style={{ marginLeft: "10px", color: "#585555" }}
                  >
                    Remember password
                  </label>
                </div>

                <Link
                  className={styles.btn_login}
                  style={{ marginTop: "15px", width: "fit-content" }}
                  to="#"
                  onClick={loginUser}
                >
                  Login
                </Link>

                <hr className="my-4" style={{ opacity: "0.15" }} />

                <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">Don't have an account?</p>
                  <Link to={"/new+user/signup"}>Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
