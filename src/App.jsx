import Header from "./components/Header";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot"; // ✅ make sure this is imported
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />     {/* chat UI */}
        <Route path="/dashboard" element={<h2>Dashboard Page</h2>} />
      </Routes>
    </>
  );
}

export default App;

