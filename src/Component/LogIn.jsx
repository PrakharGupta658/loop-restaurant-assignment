import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import LoginPic from "../Images/loginPic.jpg";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkCredentials = async (username, password) => {
    const config = {
      headers: {
        Authorization: "Bearer keyfXgn8PL6pB3x32",
      },
    };

    try {
      const response = await axios.get(
        `https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?filterByFormula=AND(username%3D%22${username}%22%2Cpassword%3D%22${password}%22)`,
        config
      );
      // console.log("responce is" , response);
      return response.data.records.length > 0;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };

  const handleLogin = async () => {
    const isValid = await checkCredentials(email, password);
    if (isValid) {
      toast.success("login successful ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Login successful");
      setErrorMessage("");
      // Redirect the user to the dashboard page or perform any other action you want
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid username or password");
      console.log("Invalid username or password");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <MDBCol md="8">
          <MDBContainer fluid className="my-5">
            <MDBRow className="g-0 align-items-center">
              <MDBCol col="6">
                <MDBCard
                  className="my-5 cascading-right"
                  style={{
                    background: "hsla(0, 0%, 100%, 0.55)",
                    backdropFilter: "blur(30px)",
                  }}
                >
                  <MDBCardBody className="p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Log In</h2>

                    <MDBInput
                      wrapperClass="mb-4"
                      label="Username"
                      id="form3"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      id="form4"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="d-flex justify-content-center mb-4  text-danger">
                      {errorMessage}
                    </div>

                    <MDBBtn
                      className="w-100 mb-4"
                      size="md"
                      onClick={handleLogin}
                    >
                      Log In
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol col="6">
                <img
                  src={LoginPic}
                  className="w-100 rounded-4 shadow-4"
                  alt=""
                  fluid
                  style={{ height: "610px" }}
                />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default LogIn;
