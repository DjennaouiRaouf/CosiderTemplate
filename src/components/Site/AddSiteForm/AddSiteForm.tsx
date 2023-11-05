import * as React from "react";
import  usr from "./user.png"
import {useRef, useState} from "react";
import axios  from "axios";
import Cookies from "js-cookie";
import {InputText} from "primereact/inputtext";
import { Dropdown as PRDropdown } from 'primereact/dropdown';
import { Button as PRButton } from 'primereact/button';
import {Toast as PRToast} from "primereact/toast";
import site from './location.png';

interface FormState {
  code_site:string,
  code_filiale :string ,
  code_region :string ,
  libelle_site :string ,
  code_agence :string ,
  type_site :number ,
  code_division :string,
  code_commune_site :string ,
  jour_cloture_mouv_rh_paie :string ,
  date_ouverture_site : string ,
  date_cloture_site: string ,
}
interface Opt {
  value:boolean;
  label:string;
}
const AddSiteForm: React.FC<any> = () => {

  const toast = useRef<PRToast>(null);
  const [formData, setFormData] = useState<FormState>({
    code_site:'',
    code_filiale :'' ,
    code_region :'' ,
    libelle_site :'' ,
    code_agence :'' ,
    type_site :0 ,
    code_division :'',
    code_commune_site :'' ,
    jour_cloture_mouv_rh_paie :'' ,
    date_ouverture_site : '' ,
    date_cloture_site: ''
  });

  const handleDropdownChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: e.value });
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const fd:FormData=new FormData();
    /*
    fd.append("code_client",formData.Code_Client );
    fd.append("type_client",formData.Type_Client );
    fd.append("est_client_cosider",formData.Cosider_Client.toString());
    fd.append("libelle_client",formData.Libelle_Client );
    fd.append("nif", formData.NIF);
    fd.append("raison_social",formData.Raison_Social);
    fd.append("num_registre_commerce",formData.Numero_Registre_Commerce );

    // Form is valid, submit the data or perform other actions
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/addclient/`,fd,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },

    })
        .then((response:any) => {

          setFormData({
            code_site:'',
            code_filiale :'' ,
            code_region :'' ,
            libelle_site :'' ,
            code_agence :'' ,
            type_site :0 ,
            code_division :'',
            code_commune_site :'' ,
            jour_cloture_mouv_rh_paie :'' ,
            date_ouverture_site : '' ,
            date_cloture_site: ''

          })
          toast.current?.show({ severity: 'success', summary: 'Site', detail: String(response.data.message), life: 3000 });


        })
        .catch((error:any) => {

        });
*/
  }


  const opt:Opt[] = [
    {
      value: false,
      label: 'Non',
    },
    {
      value: true,
      label: 'Oui',
    },

  ];
  return (
      <div>
        <PRToast ref={toast} position="top-right" />

        <div className="container-fluid" style={{marginTop:"20px"}}>

          <div className="card shadow mb-3" style={{ background: "#f8f9fa" }}>
            <div className="card-body">
              <form onSubmit={handleSubmit} >
                <div className="row" style={{ marginBottom: 25, textAlign: "left" }}>
                  <div
                      className="col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
                      style={{ display: "inline", textAlign: "center", marginBottom: 25 }}
                  >
                    <img
                        className="rounded-circle mb-3 mt-4 img-fluid"
                        src={site}
                        style={{ display: "inline", maxHeight: 110 }}
                        width={112}
                        height={110}
                    />
                    <br />
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                    <div className="row">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <div className="mb-3">
                            <h1 className="text-center">Ajouter un Site</h1>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 text-start">
                        <div className="mb-3">
                          <InputText className="w-100" placeholder="code site" name="code_site"  value={formData.code_site}
                                     onChange={handleInputChange} />

                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">
                      <InputText  className="w-100" placeholder="code filiale" name="code_filiale"
                                  value={formData.code_filiale}
                                  onChange={handleInputChange} />

                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">

                      <InputText  className="w-100" placeholder="code region" name="code_region"
                                  value={formData.code_region}
                                  onChange={handleInputChange} />


                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">

                      <InputText className="w-100" placeholder="libelle site"  name="libelle_site"
                                 value={formData.libelle_site}
                                 onChange={handleInputChange} />


                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <InputText className="w-100" placeholder="code agence"  name="code_agence"
                                 value={formData.code_agence}
                                 onChange={handleInputChange} />

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <InputText className="w-100" placeholder="code division"   name="code_division"
                                 value={formData.code_division}
                                 onChange={handleInputChange} />

                    </div>
                  </div>

                  <div
                      className="col-md-12"
                      style={{ textAlign: "right", marginTop: 5 }}
                  >
                    <PRButton  type="submit" style={{ borderWidth: 0, background: "#d7142a" }} label="Ajouter" rounded
                               icon={
                                 <i className="fas fa-plus" style={{marginRight:"10px"}}></i>} />

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



  );
};

export default AddSiteForm;
