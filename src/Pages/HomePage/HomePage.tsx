import * as React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AddClientForm from "../../components/Clients/AddClientForm/AddClientForm";


const HomePage: React.FC<any> = () => {

  return (
      <>
        <NavigationBar/>
          <AddClientForm/>

      </>
  );
};

export default HomePage;
