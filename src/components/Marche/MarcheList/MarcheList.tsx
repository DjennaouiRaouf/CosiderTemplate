import * as React from "react";
import {Toast as PRToast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {classNames} from "primereact/utils";

type MarcheListProps = {
  //
};


const MarcheList: React.FC<any> = () => {
    const toast = useRef<PRToast>(null);
    const[marches,setMarches]=useState([]);
    const getMarche = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getmarche/`,{
            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
            }
        })
            .then((response) => {
                setMarches(response.data);
            })
            .catch((error) => {

            });
      
    }
    useEffect(() => {
    getMarche();
    },[]);

    const cosiderClientBodyTemplate= (rowData: any) => {
        console.log(rowData)
        return <i className={classNames('pi', { 'pi-check-circle text-success': rowData.nt.code_client.est_client_cosider, 'pi-times-circle text-danger': !rowData.nt.code_client.est_client_cosider })}></i>;
    };
    const cosiderRevisableBodyTemplate= (rowData: any) => {
        return <i className={classNames('pi', { 'pi-check-circle text-success': rowData.revisable, 'pi-times-circle text-danger': !rowData.revisable })}></i>;
    };

  return (
      <>
          <>
              <PRToast ref={toast} position="top-right" />
              <div className="container-fluid" style={{marginTop:"20px", width:"100%"}}>

                  <div className="card shadow mb-3" style={{ background: "#f8f9fa",height:"800px" }}>
                      <div className="card-body">
                          <DataTable value={marches} sortMode="multiple"  columnResizeMode="expand" resizableColumns  paginator rows={20} rowsPerPageOptions={[20, 40, 60, 80,100]} tableStyle={{ minWidth: '50rem' }} >
                              <Column field="nt.code_site.code_site" header="Code Site" ></Column>
                              <Column field="revisable" header="Revisable" bodyClassName="text-center" style={{ minWidth: '100px' }} body={cosiderRevisableBodyTemplate}  ></Column>
                          </DataTable>
                      </div>
                  </div>
              </div>
          </>
      </>
  );
};

export default MarcheList;
