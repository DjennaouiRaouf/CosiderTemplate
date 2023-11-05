import * as React from "react";
import  usr from "./user.png"
import {useRef, useState} from "react";
import axios  from "axios";
import Cookies from "js-cookie";
import {InputText} from "primereact/inputtext";
import { Dropdown as PRDropdown } from 'primereact/dropdown';
import { Button as PRButton } from 'primereact/button';
import {Toast as PRToast} from "primereact/toast";
import {InputNumber} from "primereact/inputnumber";

interface FormState {
  Code_Client  : string,
  Libelle_Client: string,
  NIF:string,
  Raison_Social:string,
  Numero_Registre_Commerce:string,
  Type_Client:number,
  Cosider_Client:boolean,
}
interface Opt {
  value:boolean;
  label:string;
}
const AddClientForm: React.FC<any> = () => {

  const toast = useRef<PRToast>(null);
  const [formData, setFormData] = useState<FormState>({
    Code_Client  : '',
    Libelle_Client: '',
    NIF:'',
    Raison_Social:'',
    Numero_Registre_Commerce:'',
    Type_Client:0,
    Cosider_Client:false,
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

    fd.append("code_client",formData.Code_Client );
    fd.append("type_client",formData.Type_Client.toString() );
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
            Code_Client  : '',
            Libelle_Client: '',
            NIF:'',
            Raison_Social:'',
            Numero_Registre_Commerce:'',
            Type_Client:0,
            Cosider_Client:false,

          })
          toast.current?.show({ severity: 'success', summary: 'Client', detail: String(response.data.message), life: 3000 });


        })
        .catch((error:any) => {

        });

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
                    src={usr}
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
                        <h1 className="text-center">Ajouter un Client</h1>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 text-start">
                    <div className="mb-3">
                             <InputText className="w-100" placeholder="Code" name="Code_Client"  value={formData.Code_Client}
                                        onChange={handleInputChange} />

                    </div>
                  </div>

                </div>
              </div>
              <div className="col-md-6 text-start">
                <div className="mb-3">
                             <InputText  className="w-100" placeholder="Libelle" name="Libelle_Client"
                                         value={formData.Libelle_Client}
                                         onChange={handleInputChange} />

                </div>
              </div>
              <div className="col-md-6 text-start">
                <div className="mb-3">

                             <InputText  className="w-100" placeholder="NIF" name="NIF"
                                         value={formData.NIF}
                                         onChange={handleInputChange} />


                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <PRDropdown
                      className="w-100"
                      id="dropdown"
                      name="Cosider_Client"
                      value={formData.Cosider_Client}
                      options={opt}
                      onChange={handleDropdownChange}
                      placeholder="Select an option"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">

                             <InputNumber className="w-100" placeholder="Type"  name="Type_Client"
                                         value={formData.Type_Client}
                                         onChange={handleInputChange} />


                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                           <InputText className="w-100" placeholder="Raison Social"  name="Raison_Social"
                                          value={formData.Raison_Social}
                                          onChange={handleInputChange} />

                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                             <InputText className="w-100" placeholder="Numero Registre Commerce"   name="Numero_Registre_Commerce"
                                          value={formData.Numero_Registre_Commerce}
                                          onChange={handleInputChange} />

                </div>
              </div>

              <div
                  className="col-md-12"
                  style={{ textAlign: "right", marginTop: 5 }}
              >
                <PRButton  type="submit" style={{ borderWidth: 0, background: "#d7142a" }} label="Ajouter" rounded
                           icon={
                             <i className="fas fa-user-plus" style={{marginRight:"10px"}}></i>}/>

              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>



);
};

export default AddClientForm;
