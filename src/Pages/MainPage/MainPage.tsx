import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "../../components/Routes/Routes";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
type MainPageProps = {
  //
};

const MainPage: React.FC<any> = () => {
  return (
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
  )
};

export default MainPage;
