import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";

function Login() {
  const [sname, setSname] = useState("");
  const [pwd, setPwd] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaPrompt, setCaptchaPrompt] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const navigate = useNavigate(); 
  const passwordRule = /^.{8}$/;

 const generateCaptcha = () => {
  const first = Math.floor(Math.random() * 9) + 1;
  const second = Math.floor(Math.random() * 9) + 1;
  const useAddition = Math.random() > 0.5;

  if (useAddition) {
    setCaptchaPrompt(`${first} + ${second} = ?`);
    setCaptchaAnswer(first + second);
  } else {
    const larger = Math.max(first, second);
    const smaller = Math.min(first, second);
    setCaptchaPrompt(`${larger} - ${smaller} = ?`);
    setCaptchaAnswer(larger - smaller);
  }
 };

 useEffect(() => {
  generateCaptcha();
 }, []);

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!passwordRule.test(pwd)) {
    alert("Password must be exactly 8 characters.");
    return;
  }

  if (Number(captchaValue) !== captchaAnswer) {
    alert("Captcha does not match. Please try again.");
    setCaptchaValue("");
    generateCaptcha();
    return;
  }

  const stored = JSON.parse(localStorage.getItem("formData"));
  if (stored && stored.name === sname && stored.passwd === pwd) {
    localStorage.setItem("formData", JSON.stringify(stored));
    alert("Login successful!");
    navigate("/home");
  } else {
    alert("Invalid credentials!");
  }
};


  return (
    <div className="page-wrap">
      <style>{`
        body {
          margin: 0;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          font-weight: bold;
          background-image: url('bg.png');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
        }
        .page-wrap {
          min-height: 100vh;
          padding: 110px 14px 24px;
        }
        h2 {
          text-align: left;
          color: rgb(118, 12, 122);
          margin-left: 20px;
        }
        form {
          background-color: rgba(255, 235, 205, 0.8);
          width: min(420px, 100%);
          margin: 0 auto;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          box-sizing: border-box;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #130404;
        }
        input[type="text"], input[type="password"] {
          width: 100%;
          padding: 10px;
          margin-bottom: 14px;
          border: 1px solid #cccccc;
          border-radius: 5px;
          box-sizing: border-box;
          font-size: 16px;
        }
        .captcha-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          margin-bottom: 14px;
          align-items: center;
        }
        .captcha-box {
          background: #f2e3c9;
          border: 1px dashed #8d7341;
          border-radius: 5px;
          padding: 10px;
          color: #2f2616;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .refresh-captcha {
          border: none;
          border-radius: 6px;
          background: #2b6fbd;
          color: #fff;
          padding: 10px 12px;
          cursor: pointer;
          font-size: 14px;
        }
        .refresh-captcha:hover {
          background: #225892;
        }
        input[type="submit"] {
          width: 100%;
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        input[type="submit"]:hover {
          background-color: #45a049;
        }
        h3 {
          text-align: center;
          color: black;
        }
          .header {
            display: flex;
            align-items: center;
            padding: 15px 20px;
          }

        .logo {
          width: 60px;
          height: 60px;
          border-radius: 100%;  
          margin-right: 15px;
        }

    .topbar {
      width: auto;
      height: 100px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;  
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }

    .topbar h2 {
      white-space: nowrap;
      margin: 0;
      font-size: 20px;
      color: rgba(239, 239, 239, 1);
    }
    @media (max-width: 600px) {
      .page-wrap {
        padding-top: 90px;
      }
      form {
        padding: 20px;
      }
      .logo {
        width: 46px;
        height: 46px;
      }
      .topbar {
        height: 72px;
        padding: 10px 12px;
      }
      .topbar h2 {
        font-size: 17px;
      }
    }
      `}</style>

      <div className="topbar">
        <img src="/logo.jpg" alt="logo" className="logo" />
        <h2>Heritage Connect</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sname">Name:</label>
        <input type="text" id="sname" value={sname} onChange={(e) => setSname(e.target.value)} required />

        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          id="pwd"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          pattern="^.{8}$"
          title="Password must be exactly 8 characters"
          required
        />

        <label htmlFor="captchaInput">Captcha:</label>
        <div className="captcha-box">Solve: {captchaPrompt}</div>
        <div className="captcha-row">
          <input
            type="text"
            id="captchaInput"
            value={captchaValue}
            onChange={(e) => setCaptchaValue(e.target.value)}
            placeholder="Enter result"
            required
          />
          <button type="button" className="refresh-captcha" onClick={generateCaptcha}>
            Refresh
          </button>
        </div>

        <input type="submit" value="Login" />
        <h3>
          Don’t have an account? <Link to="/">Sign up</Link>
        </h3>
      </form>
    </div>
  );
}

export default Login;
