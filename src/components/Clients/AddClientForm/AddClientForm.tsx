import * as React from "react";
import  usr from "./user.png"
import TextField from "@mui/material/TextField";
import {Button as MUIButton}  from "@mui/material";
import {useState} from "react";
type AddClientFormProps = {
  //
};

const AddClientForm: React.FC<any> = () => {

  const[codeClient,setCodeClient]=useState <string>("");
  const [errorCC, setErrorCC] = useState('');
  const handleChangeCC = (e:any) => {
    const value = e.target.value;
    setCodeClient(value);
    if (!value.trim()) {
      setErrorCC('Ce champ est obligatoire.');
    } else {
      setErrorCC('');
    }
  };

  const[nomClient,setNomClient]=useState <string>("");
  const [errorNC, setErrorNC] = useState('');
  const handleChangeNC = (e:any) => {
    const value = e.target.value;
    setNomClient(value);
    if (!value.trim()) {
      setErrorNC('Ce champ est obligatoire.');
    } else {
      setErrorNC('');
    }
  };


  const[libelleClient,setLibelleClient]=useState <string>("");
  const [errorLC, setErrorLC] = useState('');
  const handleChangeLC = (e:any) => {
    const value = e.target.value;
    setLibelleClient(value);
    if (!value.trim()) {
      setErrorLC('Ce champ est obligatoire.');
    } else {
      setErrorLC('');
    }
  };

  const[NIFC,setNIFC]=useState <string>("");
  const [errorNIFC, setErrorNIFC] = useState('');
  const handleChangeNIFC = (e:any) => {
    const value = e.target.value;
    setNIFC(value);
    if (!value.trim()) {
      setErrorNIFC('Ce champ est obligatoire.');
    } else {
      setErrorNIFC('');
    }
  };


  const[RS,setRS]=useState <string>("");
  const [errorRS, setErrorRS] = useState('');
  const handleChangeRS = (e:any) => {
    const value = e.target.value;
    setRS(value);
    if (!value.trim()) {
      setErrorRS('Ce champ est obligatoire.');
    } else {
      setErrorRS('');
    }
  };


  const[NRC,setNRC]=useState <string>("");
  const [errorNRC, setErrorNRC] = useState('');
  const handleChangeNRC = (e:any) => {
    const value = e.target.value;
    setNRC(value);
    if (!value.trim()) {
      setErrorNRC('Ce champ est obligatoire.');
    } else {
      setErrorNRC('');
    }
  };


  const ajouterClient = () => {

    if (!libelleClient.trim()) {
      setErrorLC('Ce champ est obligatoire.');
    }
    if (!NIFC.trim()) {
      setErrorNIFC('Ce champ est obligatoire.');
    }
    if (!RS.trim()) {
      setErrorRS('Ce champ est obligatoire.');
    }
    if (!NRC.trim()) {
      setErrorNRC('Ce champ est obligatoire.');
    }

  }



  return (
      <div className="container-fluid" style={{marginTop:"20px"}}>
        <div className="card shadow mb-3" style={{ background: "#f8f9fa" }}>
          <div className="card-body">
            <form>
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
                                   value={codeClient}
                                   onChange={handleChangeCC}
                                   error={Boolean(errorCC)}
                                   helperText={errorCC}
                                   fullWidth/>
                      </div>
                    </div>
                    <div className="col-md-12 text-start">
                      <div className="mb-3">
                        <TextField id="standard-basic" label="Nom " variant="standard"
                                   value={nomClient}
                                   onChange={handleChangeNC}
                                   error={Boolean(errorNC)}
                                   helperText={errorNC}
                                   fullWidth/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="libelle " variant="standard"
                               value={libelleClient}
                               onChange={handleChangeLC}
                               error={Boolean(errorLC)}
                               helperText={errorLC}
                               fullWidth/>
                  </div>
                </div>
                <div className="col-md-6 text-start">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="NIF " variant="standard"
                               value={NIFC}
                               onChange={handleChangeNIFC}
                               error={Boolean(errorNIFC)}
                               helperText={errorNIFC}
                               fullWidth/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="Raison Social " variant="standard"
                               value={RS}
                               onChange={handleChangeRS}
                               error={Boolean(errorRS)}
                               helperText={errorRS}
                               fullWidth/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <TextField id="standard-basic" label="Numero Registre Commerce"
                               variant="standard"
                               value={NRC}
                               onChange={handleChangeNRC}
                               error={Boolean(errorNRC)}
                               helperText={errorNRC}
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
                  <MUIButton variant="contained" onClick={ajouterClient} style={{ borderWidth: 0, background: "#d7142a" }} endIcon={ <i className="fas fa-user-plus" />}>
                    &nbsp;Ajouter
                  </MUIButton>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>



  );
};

export default AddClientForm;
