import React, { useState } from "react";
import "./App.css";

function App() {
  const [obj, setObj] = useState({});
  const [invalidMsg, setInvalidMsg] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.username === "user" && obj.password === "password")
      setWelcomeMsg(true);
    // {const welcome = "Welcome, user!";
    // else { const invalid = "Invalid username or password"
    else setInvalidMsg(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target; // destructuring the values from e event
    // console.log(e.target.type, "e.target")
    const newObj = { ...obj, [`${name}`]: value };
    // console.log(newObj, "before change")

    setObj(newObj);
    // console.log(newObj, "after change")
  };

  return (
    <div className="App">
      <h1>Login Page</h1>
      {welcomeMsg ? (
        <p>Welcome, {obj.username}!</p>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>

          {invalidMsg ? <p>Invalid username or password</p> : ""}
          <label>
            Username:
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              required
              onChange={handleInput}
            ></input>
          </label>

          <label>
            Password:
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              onChange={handleInput}
            ></input>
          </label>

          <div className="submitBtn">
            {/* <button type="submit" onClick={handleSubmit}>Submit</button> */}
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
