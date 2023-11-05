import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "../../components/Routes/Routes";


const MainPage: React.FC<any> = () => {
  return (
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
  )
};

export default MainPage;
