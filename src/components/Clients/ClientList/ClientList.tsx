import React, {useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import Cookies from "js-cookie";
import {classNames} from "primereact/utils";
import {Toast as PRToast} from "primereact/toast";

interface Client {
  code_client : string,
  libelle_client: string,
  nif:string,
  raison_social:string,
  num_registre_commerce:string,
  type_client:string,
  est_client_cosider:boolean,
}


const ClientList: React.FC<any> = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [countByCC, setCountByCC] = useState<Record<string, number>>({});
  const toast = useRef<PRToast>(null);
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
            toast.current?.show({ severity: 'error', summary: 'Client', detail: String(error.response.data.detail), life: 3000 });
        });
  }



  useEffect(() => {
    getClients()
  },[clients]);
  useEffect(() => {

        const counts: Record<string, number> = {};
        clients.forEach((obj) => {
            const cc:any = obj.est_client_cosider;
            if (!counts[cc]) {
                counts[cc] = 1;
            } else {
                counts[cc]++;
            }
        });
        setCountByCC(counts);
        }, [clients]);


  const cosiderClientBodyTemplate= (rowData: any) => {
    return <i className={classNames('pi', { 'pi-check-circle text-success': rowData.est_client_cosider, 'pi-times-circle text-danger': !rowData.est_client_cosider })}></i>;
  };
    // press  win  and click on header to multiple sorting
  return (
      <>
      <PRToast ref={toast} position="top-right" />
          <div className="container-fluid">
              <h3 className="text-dark mb-4">Clients</h3>
              <div className="card shadow">
                  <div className="card-body">
                      <div className="row d-xl-flex justify-content-xl-center">
                          {Object.keys(countByCC).map((c) => (
                              <div  key={c}className="col-md-6 col-xl-3 mb-4">
                                  <div className="card shadow border-start-primary py-2">
                                      <div className="card-body">
                                          <div className="row align-items-center no-gutters">
                                              <div className="col me-2">
                                                  <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                                      {
                                                          c === "true" ?
                                                              <span> client interne</span>
                                                              :
                                                              <span> client externe </span>
                                                      }

                                                  </div>
                                                  <div className="text-dark fw-bold h5 mb-0">
                                                      <span>{countByCC[c]}</span>
                                                  </div>
                                              </div>
                                              <div className="col-auto">
                                                  <i className="fas fa-user fa-2x text-gray-300" />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>




                          ))}




                      </div>
                      <div id="dataTable" className="table-responsive table mt-2" role="grid"
                           aria-describedby="dataTable_info" style={{height:"800px"}}>
                          <DataTable value={clients}  sortMode="multiple"  columnResizeMode="expand" resizableColumns paginator rows={20} rowsPerPageOptions={[20, 40, 60, 80,100]} tableStyle={{ minWidth: '50rem' }} >
                              <Column field="code_client" header="Code" sortable ></Column>
                              <Column field="type_client" header="Type" sortable ></Column>
                              <Column field="libelle_client" header="Libelle"  ></Column>
                              <Column field="nif" header="nif"  ></Column>
                              <Column field="raison_social" header="Raison social" sortable ></Column>
                              <Column field="num_registre_commerce" header="Registre commerce" sortable ></Column>
                              <Column field="est_client_cosider" header="Cosider Client" sortable dataType="boolean" bodyClassName="text-center" style={{ minWidth: '100px' }} body={cosiderClientBodyTemplate}  />
                          </DataTable>
                      </div>

                  </div>
              </div>
          </div>

      </>



  );
};

export default ClientList;
