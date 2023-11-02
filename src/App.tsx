import React from 'react';
import './theme.css';
import "primeicons/primeicons.css";
import { PrimeReactProvider } from 'primereact/api';
import MainPage from "./Pages/MainPage/MainPage";



function App() {
    return (
        <PrimeReactProvider>
            <div className="App">
                <MainPage/>
            </div>
        </PrimeReactProvider>
  );
}

export default App;
