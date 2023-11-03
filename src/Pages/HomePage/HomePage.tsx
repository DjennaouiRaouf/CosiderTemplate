import * as React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AddClientForm from "../../components/Clients/AddClientForm/AddClientForm";
import ClientList from "../../components/Clients/ClientList/ClientList";



const HomePage: React.FC<any> = () => {

  return (
      <>
        <NavigationBar/>
          <ClientList/>


      </>
  );
};

export default HomePage;
