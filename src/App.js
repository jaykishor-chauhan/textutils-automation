import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TextBox from "./components/TextBox";
import Alert from "./components/Alert";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  // Theme state with localStorage persistence
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("textutils-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("textutils-theme", mode);
  }, [mode]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      showAlert("Dark mode enabled successfully!", "success");
    } else {
      setMode("light");
      showAlert("Light mode enabled successfully!", "success");
    }
  };

  // Toast Alert state
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  };

  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} onClose={() => setAlert(null)} />
        <Routes>
          <Route
            path="/"
            element={
              <TextBox showAlert={showAlert} mode={mode} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
