import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
