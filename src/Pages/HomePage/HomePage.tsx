import * as React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AddClientForm from "../../components/Clients/AddClientForm/AddClientForm";
import AddSiteForm from "../../components/Sites/AddSiteForm/AddSiteForm";


const HomePage: React.FC<any> = () => {

  return (
      <>
        <NavigationBar/>
          <AddClientForm/>
          <AddSiteForm/>


      </>
  );
};

export default HomePage;
