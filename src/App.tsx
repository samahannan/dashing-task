import "./App.scss";
import { useState } from "react";
import Table from "./components/Table/Table";
import Login from "./components/Login/Login";

function App() {
  const [loggedin, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (admin: boolean) => {
    setIsAdmin(admin);
    setLoggedIn(true);
  };
  return (
    <div className="app_wrapper">
      <header></header>
      <div className="container">
        {!loggedin && (
          <Login successCallback={(admin: boolean) => handleLogin(admin)} />
        )}
        {loggedin && <Table isAdmin={isAdmin} />}
      </div>
    </div>
  );
}

export default App;
