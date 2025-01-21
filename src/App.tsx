import React from "react";
import Home from "./views/Home";
import "./App.css";

/// TODO .json file to have a local db
/// TODO use id in json while retrieving them. add a limit and page count
/// channel: {id, title, timestamps, image_url}
/// use mvvm and axios for networking
/// create a detail page (optional)
/// make it more modular

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Home />
    </div>
  );
};

export default App;
