import React from 'react';
import './theme.css';
import "primeicons/primeicons.css";
import MainPage from "./Pages/MainPage/MainPage";
import {PrimeReactProvider} from "primereact/api";



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
