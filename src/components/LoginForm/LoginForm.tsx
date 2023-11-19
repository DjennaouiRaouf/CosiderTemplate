import * as React from "react";
import login from "./login.png"
import {Carousel} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button as PRButton } from 'primereact/button';
import {Toast as PRToast} from "primereact/toast";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";









const LoginForm: React.FC<any> = () => {
  const [pics,setPics]=useState<any[]>([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });




  const toast = useRef<PRToast>(null);
  const { authenticated,setAuthenticated } = useContext(AuthContext);
  const navigate=useNavigate();
  const getImages = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/sm/ic_images/`,{
      headers:{
        "Content-Type":"application/json",
      }
    })
        .then((response) => {
          setPics(response.data);

        })
        .catch((error) => {
          console.error('Error:', error);
        });

  }



  const authentification = async(e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('username', formData.username);
    fd.append('password', formData.password);
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sm/login/`,fd,{
      withCredentials:true,
    })
        .then((response:any) => {
          setAuthenticated(Cookies.get("token"))
          navigate('/home');
        })
        .catch((error:any) => {
          toast.current?.show({ severity: 'error', summary: 'Connexion', detail: String(error.response.data.message), life: 3000 });

        });

  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getImages();


  },[]);

  return (

      <>
        <PRToast ref={toast} position="top-right" />

        <div className="col-xl-10 col-xxl-8 container px-4 py-5" style={{borderRadius:"8px",
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          msTransform: "translateY(-50%)",
          WebkitTransform: "translateY(-50%)",
          OTransform: "translateY(-50%)"

        }}>
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start" >
              <Carousel className="w-100 d-block" controls={false} interval={2000} fade={true} indicators={true} style={{borderWidth: "1px",borderRadius: "8px"}}>
                {pics.map((item,index) => (
                    <Carousel.Item key={index}  style={{borderWidth: "1px",borderRadius: "8px"}}>
                      <img
                          src={item.src}
                          alt={""}
                          height={500}
                          className="d-block w-100"
                          style={{borderWidth: "1px",borderRadius: "8px"}}
                      />

                    </Carousel.Item>
                ))}
              </Carousel>

            </div>
            <div className="col-md-10 col-lg-5 mx-auto">
              <form className="bg-body-tertiary p-4 p-md-5 border rounded-3" onSubmit={authentification}>
                <div className="form-floating mb-3">
                  <InputText className="w-100"  id="username"
                             name="username" placeholder="Nom d'utilisateur" value={formData.username}
                             onChange={handleInputChange} />

                </div>
                <div className="form-floating mb-3">
                  <InputText className="w-100"  id="password"
                             onChange={handleInputChange}
                             name="password" placeholder="Mot de passe"  value={formData.password} type="password" />

                </div>

                <PRButton type="submit" className="w-100" style={{ background: "#df162c", borderWidth: 0 }} label="Connexion" size="small"  />
                <hr className="my-4" />

              </form>
            </div>
          </div>
        </div>
      </>


  );
};

export default LoginForm;