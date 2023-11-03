import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import Cookies from "js-cookie";

interface Client {
  Code_Client  : string,
  Libelle_Client: string,
  NIF:string,
  Raison_Social:string,
  Numero_Registre_Commerce:string,
  Type_Client:string,
  Cosider_Client:string,
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
  }, [clients]);

  const isCosiderBodyTemplate = (rowData:Client) => {
    return(
    <div>
      {rowData.Cosider_Client === 'true' ? (
          <i className='far fa-check-circle'/>
      ) : ( rowData.Cosider_Client === 'false' &&
          <i className='far fa-times-circle'/>
      )}
    </div>
    );

  }

  return (
      <div className="container-fluid" style={{marginTop:"20px"}}>

        <div className="card shadow mb-3" style={{ background: "#f8f9fa" }}>
          <div className="card-body">
            <DataTable value={clients} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column field="code_client" header="Code" sortable style={{ width: '25%' }}></Column>
              <Column field="type_client" header="Type" sortable style={{ width: '25%' }}></Column>
              <Column field="est_client_cosider" header="Cosider"  body={isCosiderBodyTemplate} sortable style={{ width: '25%' }}></Column>
              <Column field="libelle_client" header="Libelle" sortable style={{ width: '25%' }}></Column>
              <Column field="nif" header="NIF" sortable style={{ width: '25%' }}></Column>
              <Column field="raison_social" header="Raison social" sortable style={{ width: '25%' }}></Column>
              <Column field="num_registre_commerce" header="Registre commerce" sortable style={{ width: '25%' }}></Column>


            </DataTable>

          </div>
        </div>
      </div>
  );
};

export default ClientList;
