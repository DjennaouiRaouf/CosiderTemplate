import * as React from "react";
import  usr from "./user.png"
import TextField from "@mui/material/TextField";
import {Button as MUIButton, MenuItem} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MessageToast from "../../MessageToast/MessageToast";
import {openMessageToast} from "../../Redux-Toolkit/Slices/MessageToastSlice";
import {useDispatch} from "react-redux";



interface FormState {
  Code_Client  : string,
  Libelle_Client: string,
  NIF:string,
  Raison_Social:string,
  Numero_Registre_Commerce:string,
  Type_Client:string,
  Cosider_Client:string,
}

interface FormErrorState {
  Code_Client  : string,
  Libelle_Client: string,
  NIF:string,
  Raison_Social:string,
  Numero_Registre_Commerce:string,
  Type_Client:string,
}

const AddSiteForm: React.FC<any> = () => {
  const options:any[] = [
    {
      value: "0",
      label: 'Non',
    },
    {
      value: "1",
      label: 'Oui',
    },

  ];

  const dispatch=useDispatch();
  const [formData, setFormData] = useState<FormState>({
    Code_Client  : '',
    Libelle_Client: '',
    NIF:'',
    Raison_Social:'',
    Numero_Registre_Commerce:'',
    Type_Client:'',
    Cosider_Client:'0',

  });
  const [errors, setErrors] = useState<FormErrorState>({
    Code_Client  : '',
    Libelle_Client: '',
    NIF:'',
    Raison_Social:'',
    Numero_Registre_Commerce:'',
    Type_Client:'',

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = (data: any) => {
    // Add your validation rules here
    const newErrors = {
      Code_Client: data.Code_Client ? '' : 'Code Client est obligatoire',
      Libelle_Client: data.Libelle_Client ?'':'Libelle Client est obligatoire',
      NIF: data.NIF ?'':'NIF est obligatoire',
      Raison_Social: data.Raison_Social ?'':'Raison Social est obligatoire',
      Numero_Registre_Commerce: data.Numero_Registre_Commerce ?'':'Numero Registre Commerce est obligatoire',
      Type_Client: data.Type_Client ?'':'Type Client est obligatoire',
    };

    return newErrors;
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);



    if (Object.values(newErrors).every((error) => !error)) {
      const fd:FormData=new FormData();

      fd.append("code_client",formData.Code_Client );
      fd.append("type_client",formData.Type_Client );
      fd.append("est_client_cosider",formData.Cosider_Client);
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
              Type_Client:'',
              Cosider_Client:'0',

            })

            setErrors({
              Code_Client  : '',
              Libelle_Client: '',
              NIF:'',
              Raison_Social:'',
              Numero_Registre_Commerce:'',
              Type_Client:'',

            })
            dispatch(openMessageToast({ titre: "Ajout Client",color:"#44b78b","message":response.data.message,"icon":"far fa-check-circle" }))

          })
          .catch((error:any) => {

          });

    }
  };


  return (
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
                    <div className="col-md-12 text-start">
                      <div className="mb-3">
                        <TextField id="standard-basic" label="Code " variant="standard"
                                   name="Code_Client"
                                   value={formData.Code_Client}
                                   onChange={handleChange}
                                   error={!!errors.Code_Client}
                                   helperText={errors.Code_Client}
                                   fullWidth/>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="libelle " variant="standard"
                               name="Libelle_Client"
                               value={formData.Libelle_Client}
                               onChange={handleChange}
                               error={!!errors.Libelle_Client}
                               helperText={errors.Libelle_Client}
                               fullWidth/>
                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="NIF " variant="standard"
                               name="NIF"
                               value={formData.NIF}
                               onChange={handleChange}
                               error={!!errors.NIF}
                               helperText={errors.NIF}
                               fullWidth/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <TextField
                        id="standard-basic"
                        select
                        label="Cosider_Client"
                        name="Cosider_Client"
                        defaultValue={formData.Cosider_Client}
                        onChange={handleChange}
                        SelectProps={{
                          native: true,
                        }}
                        fullWidth

                        variant="standard"
                    >
                      {options.map((option,key) => (
                          <option key={key} value={option.value}>
                            {option.label}
                          </option>
                      ))}
                    </TextField>



                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="Type" variant="standard"
                               name="Type_Client"
                               value={formData.Type_Client}
                               onChange={handleChange}
                               error={!!errors.Type_Client}
                               helperText={errors.Type_Client}
                               fullWidth/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="Raison Social " variant="standard"
                               name="Raison_Social"
                               value={formData.Raison_Social}
                               onChange={handleChange}
                               error={!!errors.Raison_Social}
                               helperText={errors.Raison_Social}
                               fullWidth/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="Numero Registre Commerce"
                               name="Numero_Registre_Commerce"
                               variant="standard"
                               value={formData.Numero_Registre_Commerce}
                               onChange={handleChange}
                               error={!!errors.Numero_Registre_Commerce}
                               helperText={errors.Numero_Registre_Commerce}
                               fullWidth />

                  </div>
                </div>
                <div className="col">
                  <p
                      id="emailErrorMsg"
                      className="text-danger"
                      style={{ display: "none" }}
                  />
                  <p
                      id="passwordErrorMsg"
                      className="text-danger"
                      style={{ display: "none" }}
                  />
                </div>
                <div
                    className="col-md-12"
                    style={{ textAlign: "right", marginTop: 5 }}
                >
                  <MUIButton variant="contained" type="submit" style={{ borderWidth: 0, background: "#d7142a" }} endIcon={ <i className="fas fa-user-plus" />}>
                    &nbsp;Ajouter
                  </MUIButton>

                </div>
              </div>
            </form>
          </div>
        </div>
        <MessageToast/>
      </div>



  );
};

export default AddSiteForm;
