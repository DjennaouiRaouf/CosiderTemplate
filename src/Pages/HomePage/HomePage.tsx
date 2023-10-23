import * as React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Menu from "../../components/Menu/Menu";



const HomePage: React.FC<any> = () => {

  return (
      <>
        <NavigationBar/>
        <Menu/>
      </>
  );
};

export default HomePage;
