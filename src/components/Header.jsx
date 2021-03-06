import {React, useEffect} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import HeaderCliente from "./HeaderCliente";
import HeaderAdmin from "./HeaderAdmin";
import HeaderEmpleado from "./HeaderEmpleado";
library.add(faCoffee, faSignOutAlt);
export default function Header() {
    const history = useHistory();
    useEffect(() => {
        const userCookie = localStorage.getItem('userName');
        if(!userCookie){
            Axios.get("https://energymproject.herokuapp.com/user", {withCredentials: true})
        .then(async (res) => {
            if (res.data === "") {
                localStorage.clear();
                history.push("/Login");
            }else{
                console.log("this is the header data "+ res)
                localStorage.setItem("userName", res.data.fName + " " + res.data.lName);
                localStorage.setItem("correo", res.data.email);
                localStorage.setItem("userId", res.data._id);
            }
        });
        }
        
    }, []);
    const logOut = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "https://energymproject.herokuapp.com/logout",
        }).then((res) => {
            if (res.data) {
                localStorage.clear();
                history.push("/Login");
            }
        })
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top d-none d-sm-none d-md-block d-lg-block d-xl-block"
            id="mainNav">
            <div className="container">
                {localStorage.getItem('tipoCuenta') === 'Cliente' ? <HeaderCliente /> : ''}
                {localStorage.getItem('tipoCuenta') === 'Administrador' ? <HeaderAdmin /> : ''}
                {localStorage.getItem('tipoCuenta') === 'Empleado' ? <HeaderEmpleado /> : ''}
                <div className=" navbar-collapse mt-1">
                    <ul className="navbar-nav ml-auto">
                        <ul className="navbar-nav ml-auto">
                            <p style={{ color: "white", marginTop: "10px", fontSize: "18px", marginRight: "15px" }}>{localStorage.getItem('userName') ? "??Hola " + localStorage.getItem('userName') + "!" : "Sin sesi??n activa..."}</p>
                        </ul>
                        <li>
                            <Button type="button" style={{ backgroundColor: "transparent", borderColor: "transparent", fontSize: "17px" }} onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt} /> SALIR</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

