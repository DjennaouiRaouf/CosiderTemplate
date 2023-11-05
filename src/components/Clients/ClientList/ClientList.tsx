import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import Cookies from "js-cookie";
import {classNames} from "primereact/utils";

interface Client {
  Code_Client  : string,
  Libelle_Client: string,
  NIF:string,
  Raison_Social:string,
  Numero_Registre_Commerce:string,
  Type_Client:string,
  Cosider_Client:boolean,
}

const ClientList: React.FC<any> = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getclients/`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
      }
    })
        .then((response) => {
          setClients(response.data);


        })
        .catch((error) => {
          console.error('Error:', error);
        });


  }
  useEffect(() => {
    getClients()
  });

  const cosiderClientBodyTemplate= (rowData: any) => {
    return <i className={classNames('pi', { 'pi-check-circle': rowData.est_client_cosider, 'pi-times-circle': !rowData.est_client_cosider })}></i>;
  };

  return (
      <div className="container-fluid" style={{marginTop:"20px", width:"100%"}}>

          <div className="card shadow mb-3" style={{ background: "#f8f9fa" }}>
              <div className="card-body">
                  <DataTable value={clients}  columnResizeMode="expand" resizableColumns showGridlines paginator rows={20} rowsPerPageOptions={[20, 40, 60, 80,100]} tableStyle={{ minWidth: '50rem' }} >
                      <Column field="code_client" header="Code" ></Column>
                      <Column field="type_client" header="Type"  ></Column>
                      <Column field="libelle_client" header="Libelle"  ></Column>
                      <Column field="nif" header="NIF" ></Column>
                      <Column field="raison_social" header="Raison social" ></Column>
                      <Column field="num_registre_commerce" header="Registre commerce" ></Column>
                      <Column field="est_client_cosider" header="Cosider Client" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '100px' }} body={cosiderClientBodyTemplate}  />
                  </DataTable>
              </div>
          </div>
      </div>



  );
};

export default ClientList;
