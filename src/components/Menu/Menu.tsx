import * as React from "react";
import {useEffect, useState} from "react";
import "./Menu.css";
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";


interface MenuItem {
  titre: string;
  description: string;
  image:string;
  url:string;
}

const Menu: React.FC<any> = () => {
  const[apps,setApps]=useState<MenuItem[]>([]);
  const history=useHistory();
  useEffect(() => {
   const items:MenuItem[]=[];
   items.push({titre:"Les Marchés",description:"-",image:"789",url:"/"})
    setApps(items);

  },[]);

  const startapp = (url:string) => {
    history.push(url);
  }
    return (
      <section style={{ background: "#f8f9fa" }}>
        <h1>...</h1>
        <div className="container">
          <div className="row">
            {apps.map((item,index) => (

                <div className="col-md-4" key={index}>
                <div className="blog-card blog-card-blog" style={{ height: "420.5px" }}>
                  <div className="blog-card-image">
                    <a href="#">
                      <img
                          className="img-fluid img"
                          src={item.image}
                          width={362}
                          height={254.75}
                      />
                    </a>
                    <div className="ripple-cont" />
                  </div>
                  <div className="blog-table" style={{ height: "160.8px" }}>
                    <h6 className="blog-category blog-text-success">
                      <i className="far fa-newspaper" />
                      &nbsp;{item.titre}
                    </h6>
                    <h6
                        className="blog-card-caption mt-4 mb-4"
                        style={{
                          margin: "-31px 0px 8px",

                        }}
                    >
                      <p >

                        {item.description}

                      </p>
                    </h6>
                    <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        style={{ marginRight: 0, background: "#dc162e", borderWidth: 0 }}
                        onClick={()=>startapp(item.url)}
                    >
                      <i className="fas fa-play" style={{ marginRight: 15 }} />
                      Ouvrir
                    </button>
                  </div>
                </div>
              </div>
            ))
            }

          </div>
        </div>
      </section>

  );
};

export default Menu;
