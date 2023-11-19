import * as React from "react";
import {Toast as PRToast} from "primereact/toast";
import contrat from "../../AddMarcheForm/contract.png";
import {InputText} from "primereact/inputtext";
import {Dropdown as PRDropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {Button as PRButton} from "primereact/button";
import {useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface FormState{
  site:string,
  nt:string,
  avenant:number,
  designation : string,
  unite: string,
  prix_u:number,
  quantite:number,
}

const AddDQEForm: React.FC<any> = () => {
  const toast = useRef<PRToast>(null);
  const [formData, setFormData] = useState<FormState>({
    site:"",
    nt:"",
    avenant:0,
    designation : "",
    unite: "",
    prix_u:0,
    quantite:0,
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = async(e:any) => {
    e.preventDefault();
    const fd:FormData=new FormData();
    fd.append("site",formData.site);
    fd.append("nt",formData.nt);
    fd.append("avenant",formData.avenant.toString());
    fd.append("designation" , formData.designation);
    fd.append("unite", formData.unite);
    fd.append("prix_u",formData.prix_u.toString());
    fd.append("quantite",formData.quantite.toString());
    console.log(formData)
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/adddqe/`,fd,{
      headers: {
        Authorization: `Token ${Cookies.get("token")}`,
        'Content-Type': 'application/json',

      },

    })
        .then((response:any) => {

          setFormData({
            site:"",
            nt:"",
            avenant:0,
            designation : "",
            unite: "",
            prix_u:0,
            quantite:0,
          })

          toast.current?.show({ severity: 'success', summary: 'DQE', detail: String(response.data.message), life: 3000 });


        })
        .catch((error:any) => {

          toast.current?.show({ severity: 'error', summary: 'DQE', detail: String(error.response.data.detail), life: 3000 });

        });


  }



  return (
      <>
        <PRToast ref={toast} position="top-right" />
        <div className="container-fluid">
          <div className="card shadow mb-3" style={{border:"none",background:"transparent"}}>
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="row" style={{ marginBottom: 25, textAlign: "left" }}>
                  <div
                      className="col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
                      style={{ display: "inline", textAlign: "center", marginBottom: 25 }}
                  >
                    <div
                        style={{
                          height: "100%",
                          background: `url(${contrat}) center / auto no-repeat`,

                        }}
                    />

                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                    <div className="row">
                      <div className="col-md-12 text-start">
                        <div className="mb-3">
                          <div className="row">
                            <div className="row">
                              <div className="col-md-12 text-start">
                                <div className="mb-5">
                                  <h1 className="text-center">Ajouter un DQE</h1>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" >
                                  <strong>
                                    Code du Site{" "}
                                    <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                  </strong>
                                </label>
                                <InputText className="w-100"  name="site"  value={formData.site}
                                           onChange={handleInputChange} />
                              </div>
                              <div className="mb-3">
                                <label className="form-label" >
                                  <strong>N° du NT</strong>
                                </label>
                                <InputText className="w-100"  name="nt"  value={formData.nt}
                                           onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label" >
                                  <strong>
                                    Numero d'avenant&nbsp;
                                    <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                  </strong>

                                </label>
                                <InputNumber className="w-100"  name="avenant"  value={formData.avenant}
                                           onChange={handleInputChange} />
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">
                      <label className="form-label" >
                        <strong>
                          Désignation&nbsp;
                          <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                        </strong>
                      </label>
                      <InputText className="w-100"  name="designation"  value={formData.designation}
                                 onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">
                      <label className="form-label" >
                        <strong>
                          Unité&nbsp;
                          <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                        </strong>
                      </label>
                      <InputText  className="w-100"  name="unite"  value={formData.unite}
                                  onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="mb-3">
                      <label className="form-label" >
                        <strong>
                          Quantité&nbsp;<span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                        </strong>
                      </label>
                      <InputNumber className="w-100"  name="quantite"  value={formData.quantite}
                                   min={0} onValueChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" >
                        <strong>
                          Prix Unitaire&nbsp;<span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                        </strong>
                      </label>
                      <div className="p-inputgroup flex-1">
                                        <span className="p-inputgroup-addon">
                                            DZD
                                        </span>
                        <InputNumber className="w-100"  name="prix_u"  value={formData.prix_u}

                                     min={0} max={100}
                                     onValueChange={handleInputChange} />
                      </div>

                    </div>
                  </div>


                  <div
                      className="col-md-12"
                      style={{ textAlign: "right", marginTop: 5 }}
                  >
                    <PRButton  type="submit" style={{ borderWidth: 0, background: "#d7142a" }} label="Ajouter" size="small"
                               icon={
                                 <i className="fas fa-plus" style={{marginRight:"10px"}}></i>}/>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </>
  );
};

export default AddDQEForm;
