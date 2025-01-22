import React from "react";
import Home from "./views/Home";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Home />
    </div>
  );
};

export default App;
