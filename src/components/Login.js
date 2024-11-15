import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const[error,setError]=useState("");
  

  const navigate = useNavigate();

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSumbit = async () => {
    try {
      const response = await fetch(
        "https://assignment.stage.crafto.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, otp }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/quotes");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (err) {
      setError("Error connecting to the server.");
    }
  };

  const handleEnter = (e) =>{
    if(e.key ==="Enter"){
        handleSumbit()
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="m-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            UserName
          </label>
          <input
            type="text"
            className="w-full p-2 mt-1 border border-gray-200 rounded-lg"
            onChange={handleUsername}
            value={username}
           
          />
        </div>
        <div className="m-4">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700"
          >
            OTP
          </label>
          <input
            type="text"
            className="w-full p-2 mt-1 border border-gray-200 rounded-lg"
            onChange={handleOtp}
            value={otp}
            onKeyDown={handleEnter}
          />
        </div>
        <div className="text-center ">
          <button
            className="w-32 bg-orange-400 text-white p-2 rounded-lg justify-center"
            onClick={handleSumbit}
          >
            Sumbit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
