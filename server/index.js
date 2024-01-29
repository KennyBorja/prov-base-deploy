const express =require("express");
const app =  express();
const mysql = require("mysql");
const cors = require("cors");
const config = require("./config");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  });

app.post("/create",(req,res)=>{
    const Nombre= req.body.Nombre;
    const Edad= req.body.Edad;
    const Pais= req.body.Pais;
    const cargo= req.body.cargo;
    const anios= req.body.anios;

    db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES(?,?,?,?,?)',[Nombre,Edad,Pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);

        }
    }
    );

});

app.get("/empleados",(req,res)=>{
   
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );

});


app.put("/update",(req,res)=>{
    const id= req.body.id;
    const Nombre= req.body.Nombre;
    const Edad= req.body.Edad;
    const Pais= req.body.Pais;
    const cargo= req.body.cargo;
    const anios= req.body.anios;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?',[Nombre,Edad,Pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);

        }
    }
    );

});

app.delete("/delete/:id",(req,res)=>{
    const id= req.params.id;
    

    db.query('DELETE FROM empleados WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);

        }
    }
    );

});




app.listen(config.port, () => {
    console.log(`Corriendo en el puerto ${config.port}`);
  });