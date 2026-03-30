import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/Home.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tokenFromURL = params.get("token");
    const nameFromURL = params.get("name");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      localStorage.setItem("username", nameFromURL);
    }

    const token = localStorage.getItem("token");
    window.history.replaceState({}, document.title, "/"); // remove token from url

    if (!token) {
      window.location.href = "https://trade7-frontend.vercel.app/login";
    }
  }, []);
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
        }}
      />
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
