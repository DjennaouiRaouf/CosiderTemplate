import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import Cookies from "js-cookie";

interface Site{
  code_site:string,
  code_filiale :string ,
  code_region :string ,
  libelle_site :string ,
  code_agence :string ,
  type_site :number ,
  code_division :string,
  code_commune_site :string ,
  jour_cloture_mouv_rh_paie :string ,
  date_ouverture_site : any ,
  date_cloture_site: any ,
}

const SiteList: React.FC<any> = () => {
  const [sites, setSites] = useState<Site[]>([]);

  const getSites = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/getsites/`,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
      }
    })
        .then((response) => {
          setSites(response.data);


        })
        .catch((error) => {
          console.error('Error:', error);
        });


  }
  useEffect(() => {
    getSites()
  },[sites]);


  // press  win  and click on header to multiple sorting
  return (
      <div className="container-fluid" style={{marginTop:"20px", width:"100%"}}>

        <div className="card shadow mb-3" style={{ background: "#f8f9fa",height:"800px" }}>
          <div className="card-body">
            <DataTable value={sites} sortMode="multiple"  columnResizeMode="expand" resizableColumns  paginator rows={20} rowsPerPageOptions={[20, 40, 60, 80,100]} tableStyle={{ minWidth: '50rem' }} >
              <Column field="code_site" header="code_site" sortable ></Column>
              <Column field="code_filiale" header="code_filiale" sortable ></Column>
              <Column field="code_region" header="code_region"  ></Column>
              <Column field="libelle_site" header="libelle_site" sortable ></Column>
              <Column field="code_agence" header="code_agence"  ></Column>

              <Column field="type_site" header="type_site" sortable ></Column>
              <Column field="code_division" header="code_division" sortable ></Column>
              <Column field="code_commune_site" header="code_commune_site" sortable ></Column>
              <Column field="jour_cloture_mouv_rh_paie" header="jour_cloture_mouv_rh_paie" sortable ></Column>
              <Column field="date_ouverture_site" header="date_ouverture_site" sortable ></Column>
              <Column field="date_cloture_site" header="date_cloture_site" sortable ></Column>



            </DataTable>
          </div>
        </div>
      </div>



  );
};

export default SiteList;
