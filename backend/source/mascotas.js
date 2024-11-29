const express = require("express");
const bd = require("./bd.js");
const mascotas = express();
const bcrypt = require("bcryptjs");

// mostrar
mascotas.get("/api/mascotas/listartodos", (req, res) => {
  let limite = parseInt(req.query.limite);

  let pagina = parseInt(req.query.pagina);

  let offset = (pagina - 1) * limite;

  let query = "SELECT * FROM mascotas limit ? offset ?";
  let query_count = "SELECT COUNT(*) as total_mascota FROM info";
  bd.query(query_count, (error, total_mascota) => {
    bd.query(query, [limite, offset], (error, mascotas) => {
      if (error) {
        res.send({
          status: "error",
          mensaje: "ocurrió un error en la consulta!",
          error: error,
        });
      } else {
        res.send({
          status: "ok",
          mensaje: "consulta exitosa",
          mascotas: mascotas,
        });
      }
    });
  });
});
// crear

mascotas.post("/api/mascotas/crear", (req, res) => {
  let frmMascotasData = {
    nombre: req.body.nombre,
    genero: req.body.genero,
    fecha: req.body.fecha,
    color: req.body.color,
    nombre_dueno: req.body.nombre_dueno,
    esterilizado: req.body.esterilizado,
  };

  // hacemos la consulta

  let query = "INSERT INTO mascotas SET ?";

  bd.query(query, [frmMascotasData], (error, mascotas) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        mascotas: mascotas,
      });
    }
  });
});

// editar

mascotas.put("/api/mascotas/editar/:id", (req, res) => {
  let id = req.params.id;
  let frmDatos = {
    nombre: req.body.nombre,
    genero: req.body.genero,
    fecha: req.body.fecha,
    color: req.body.color,
    nombre_dueno: req.body.nombre_dueno,
    esterilizado: req.body.esterilizado,
  };

  let query = "UPDATE mascotas SET ? WHERE id = ?";

  bd.query(query, [frmDatos, id], (error, mascotas) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "actualización exitosa",
        mascotas: mascotas,
      });
    }
  });
});

mascotas.delete("/api/mascotas/borrar/:id", (req, res) => {
  let id = req.params.id;

  let consulta = "DELETE FROM mascotas WHERE id = ?";

  bd.query(consulta, [id], (error, mascotas) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        mascotas: mascotas,
      });
    }
  });
});

module.exports = mascotas;
