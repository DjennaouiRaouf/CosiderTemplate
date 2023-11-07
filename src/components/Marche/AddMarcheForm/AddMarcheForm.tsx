import * as React from "react";
import {Button as PRButton} from "primereact/button";
import {Dropdown as PRDropdown} from "primereact/dropdown";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import contrat from './contract.png'

interface FormState {
    avenant:number,
    code_site:string,
    num_nt:string,
    libelle : string,
    ods_depart: string,
    delais:number,
    revisable:boolean,
    rabais:number,
    tva:number,
    num_contrat:string,
    date_signature:string

}
interface Opt {
    value:boolean;
    label:string;
}

const AddMarcheForm: React.FC<any> = () => {
    const [formData, setFormData] = useState<FormState>({
        avenant:0,
        code_site:"",
        num_nt:"",
        libelle : "",
        ods_depart: "",
        delais:0,
        revisable:true,
        rabais:0,
        tva:0,
        num_contrat:"",
        date_signature:""
    });
    const[est_avenant,setEst_Avenent]=useState(false)
    const opt:Opt[] = [
        {
            value: true,
            label: 'Oui',
        },
        {
            value: false,
            label: 'Non',
        },

    ];
    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: e.value });
    };
    const submit = (e:any) => {
        e.preventDefault();
        console.log(formData)
    }
    return (
      <>
          <div className="container-fluid">
              <div className="card shadow mb-3">
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
                                                  <div className="col">
                                                      <div className="mb-3">
                                                          <label className="form-label" >
                                                              <strong>
                                                                  Code du Site{" "}
                                                                  <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                                              </strong>
                                                          </label>
                                                          <InputText className="w-100"  name="code_site"  value={formData.code_site}
                                                                     onChange={handleInputChange} />
                                                      </div>
                                                      <div className="mb-3">
                                                          <label className="form-label" >
                                                              <strong>N° du NT</strong>
                                                          </label>
                                                          <InputText className="w-100"  name="num_nt"  value={formData.num_nt}
                                                                     onChange={handleInputChange} />
                                                      </div>
                                                  </div>
                                                  <div className="col">
                                                      <div className="mb-3">
                                                          <label className="form-label" >
                                                              <strong>
                                                                  Numéro d'avenant&nbsp;
                                                                  <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                                              </strong>
                                                              <br />
                                                              <br />
                                                          </label>
                                                          <InputNumber className="w-100"  name="avenant"  value={formData.avenant}
                                                                       min={0} onValueChange={handleInputChange} />
                                                      </div>
                                                      <div className="mb-3">
                                                          <label className="form-label" >
                                                              <strong>
                                                                  Avenant du Marché N°&nbsp;
                                                                  <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                                              </strong>
                                                              <br />
                                                              <br />
                                                          </label>

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
                                              Libellé&nbsp;
                                              <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>
                                      <InputText className="w-100"  name="libelle"  value={formData.libelle}
                                                 onChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="col-md-6 text-start">
                                  <div className="mb-3">
                                      <label className="form-label" >
                                          <strong>
                                              ODS de départ&nbsp;
                                              <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>
                                      <InputText  type="date" className="w-100"  name="ods_depart"  value={formData.ods_depart}
                                                 onChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="col-md-6 text-start">
                                  <div className="mb-3">
                                      <label className="form-label" >
                                          <strong>
                                              Délai&nbsp;<span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>
                                      <InputNumber className="w-100"  name="delais"  value={formData.delais}
                                                 min={0} onValueChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label" >
                                          <strong>
                                              Est-il révisable&nbsp;
                                              <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>

                                      <PRDropdown
                                          className="w-100"
                                          id="dropdown"
                                          name="revisable"
                                          value={formData.revisable}
                                          options={opt}
                                          onChange={handleDropdownChange}
                                      />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label" >
                                          <strong>
                                              Rabais&nbsp;<span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>
                                      <InputNumber className="w-100"  name="rabais"  value={formData.rabais}
                                                   onValueChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label">
                                          <strong>
                                              TVA&nbsp;<span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>
                                      <InputNumber className="w-100"  name="tva"  value={formData.tva}
                                                 onChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label" >
                                          <strong>
                                              N° du contrat&nbsp;
                                              <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>
                                      <InputText className="w-100"  name="num_contrat"  value={formData.num_contrat}
                                                 onChange={handleInputChange} />
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="mb-3">
                                      <label className="form-label" htmlFor="city">
                                          <strong>
                                              Date Signature&nbsp;
                                              <span style={{ color: "rgb(255, 0, 0)" }}>*</span>
                                          </strong>
                                      </label>
                                      <InputText className="w-100"  name="date_signature"  value={formData.date_signature}
                                                 type="date"
                                                 onChange={handleInputChange} />
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
                                  <PRButton  type="submit" style={{ borderWidth: 0, background: "#d7142a" }} label="Ajouter" rounded
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

export default AddMarcheForm;
