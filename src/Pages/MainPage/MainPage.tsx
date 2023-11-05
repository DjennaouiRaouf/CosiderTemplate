import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "../../components/Routes/Routes";
import { AuthProvider } from "../../components/Context/AuthContext";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
type MainPageProps = {
  //
};

const MainPage: React.FC<any> = () => {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
  )
};

export default MainPage;
