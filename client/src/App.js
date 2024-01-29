
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'

const apiBaseUrl = process.env.REACT_APP_API_URL;


function App() {

const [Nombre,setNombre]= useState("");
const [Edad,setEdad]= useState();
const [Pais,setPais]= useState("");
const [cargo,setCargo]= useState("");
const [anios,setAnioss]= useState();
const [id,setid]= useState();


const [editar,setEditar]= useState(false);


const [empleadoslist,setEmpleados]=useState([]);

const add = ()=>{
  Axios.post(`${apiBaseUrl}/create`,{
    Nombre:Nombre,
    Edad:Edad,
    Pais:Pais,
    cargo:cargo,
    anios:anios
  }).then(()=>{
    getEmpleados();
    limpiarCampos();
    
    
    Swal.fire({
      title: "Registro exitoso",
      text: "el empleado "+Nombre+" fue exitoso",

      icon: "success",
      timer: 3000

    });




  });
}

const getEmpleados = ()=>{
  Axios.get(`${apiBaseUrl}/empleados`).then((response)=>{
  setEmpleados(response.data);
  });
}


const editarempleado = (val)=>{
  setEditar(true);

  setNombre(val.nombre);
  setEdad(val.edad);
  setCargo(val.cargo);
  setPais(val.pais);
  setAnioss(val.anios);
  setid(val.id);
}

const update = ()=>{
  Axios.put(`${apiBaseUrl}/update`,{
    id:id,
    Nombre:Nombre,
    Edad:Edad,
    Pais:Pais,
    cargo:cargo,
    anios:anios
  }).then(()=>{
    getEmpleados();
    limpiarCampos();

    Swal.fire({
      title: "actualizacion exitosa",
      text: "el empleado "+Nombre+" fue actualizado",
      icon: "success",
      timer: 2000

    });
   
  });
}

const deleteEmp = (val)=>{

  Swal.fire({
    title: "confirmar eliminacion",
    html: "realmente desea "+val.Nombre+" eliminar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SI, eliminarlo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`${apiBaseUrl}/delete/${val.id}`).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "Eliminado!",
        html: val.nombre+" fue eliminado",
        icon: "success",
        timer: 3000
      });

      }).catch(function(error){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logro eliminar empleado",
          footer: error
        });
      });

      
    }
  });

  
}


const limpiarCampos = ()=>{
  setNombre("");
  setEdad("");
  setCargo("");
  setPais("");
  setAnioss("");
  setid("");
  setEditar(false);

}

getEmpleados();
  return (

    <div className='container'>

        <div className="card text-center">
          
        <div className="card-header">
          GESTION DE EMPEADOS
        </div>

        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={Nombre}
            onChange={(event)=>{
              setNombre(event.target.value);
            }}

            className="form-control"  placeholder="ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number"  value={Edad}
            onChange={(event)=>{
              setEdad(event.target.value);
            }}
            
            className="form-control"  placeholder="ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text" value={Pais}
            onChange={(event)=>{
              setPais(event.target.value);
            }}
            
            className="form-control"  placeholder="ingrese su pais" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">cargo:</span>
            <input type="text" value={cargo}
            onChange={(event)=>{
              setCargo(event.target.value);
            }}
            
            className="form-control"  placeholder="ingrese cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>


          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">años:</span>
            <input type="number" value={anios}
            onChange={(event)=>{
              setAnioss(event.target.value);
            }}
            
            className="form-control"  placeholder="ingrese años experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

        </div>


        <div className="card-footer text-body-secondary">

            {
              editar?
              <div> 


              <button className='btn btn-warning m-2' onClick={update}>Actualizar </button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar </button>
              
              </div> 

              :<button className='btn btn-success' onClick={add}>Registrar </button>
            }


          
        </div>




      </div>




    


      <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">nombre</th>
            <th scope="col">edad</th>
            <th scope="col">pais</th>
            <th scope="col">cargo</th>
            <th scope="col">experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
          </thead>



        
          <tbody>
            {
              empleadoslist.map((val,key)=>{
                return <tr key={val.id}>
                        <th>{val.id}</th>
                        <td>{val.nombre}</td>
                        <td>{val.edad}</td>
                        <td>{val.pais}</td>
                        <td>{val.cargo}</td>
                        <td>{val.anios}</td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" 
                            onClick={()=>{
                              editarempleado(val);
                            }}
                            
                            className="btn btn-info">editar</button>
                            <button type="button" onClick={()=>{
                              deleteEmp(val);
                            }} className="btn btn-danger">eliminar</button>
                            
                          </div>
                        </td>
                      
                      </tr>

              })
            }

            

            
          
        </tbody>
      </table>






    </div>
  );
}

export default App;
