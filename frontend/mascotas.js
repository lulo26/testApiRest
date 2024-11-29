let contenido = document.querySelector("#contenido");
let nombre = document.querySelector("#nombre");
let genero = document.querySelector("#genero");
let fecha = document.querySelector("#fecha");
let color = document.querySelector("#color");
let nombre_dueno = document.querySelector("#nombre_dueno");
let esterilizado = document.querySelector("#esterilizado");

let api = "http://localhost:4100/api/mascotas/";

let accion = "";

const frmCrearMascota = new bootstrap.Modal(
  document.getElementById("frmCrearMascota")
);
let btnNuevo = document.querySelector("#btnNuevo");

// mostrar
function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      res.mascotas.forEach((mascota) => {
        let fila = `<tr>
        <td>${mascota.id}</td>
          <td>${mascota.nombre}</td>
          <td>${mascota.genero}</td>
          <td>${mascota.fecha.slice(0, 10)}</td>
          <td>${mascota.color}</td>
          <td>${mascota.nombre_dueno}</td>
          <td>${mascota.esterilizado}</td>
          <td><button data-id="${
            mascota.id
          }" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
          <td><button data-id="${
            mascota.id
          }" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
          </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
}

// insertar
frmAprendiz.addEventListener("submit", (e) => {
  e.preventDefault();

  //nuevo
  if (accion === "crear") {
    fetch(api + "crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        genero: genero.value,
        fecha: fecha.value,
        color: color.value,
        nombre_dueno: nombre_dueno.value,
        esterilizado: esterilizado.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        frmCrearMascota.hide();
        location.reload();
      });
  }

  //editar
  if (accion === "editar") {
    fetch(api + "editar/" + idform, {
      method: "PUT",
      // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
      headers: {
        "Content-Type": "application/json",
      },
      //carga o payload del request o peticion, serializar un objeto JS  a JSON
      body: JSON.stringify({
        nombre: nombre.value,
        genero: genero.value,
        fecha: fecha.value,
        color: color.value,
        nombre_dueno: nombre_dueno.value,
        esterilizado: esterilizado.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        alert("exito");
        frmCrearMascota.hide();
        location.reload();
      });
  }

  frmCrearMascota.hide();
});

btnNuevo.addEventListener("click", () => {
  frmCrearMascota.show();
  accion = "crear";
  nombre.value = "";
  genero.value = "";
  fecha.value = "";
  color.value = "";
  nombre_dueno.value = "";
  esterilizado.value = "";
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

let idform = "";

//editar
on(document, "click", ".btnEditar", (e) => {
  let id = e.target.closest("button").getAttribute("data-id");
  idform = id;
  console.log(idform);

  /* placa.value = fila.children[1].innerText;
  marca.value = fila.children[2].innerText;
  modelo.value = fila.children[3].innerText;
  cantpas.value = fila.children[4].innerText;
  cantejes.value = fila.children[5].innerText;
  cilindraje.value = fila.children[6].innerText;
  fecha.value = fila.children[7].innerText; */
  accion = "editar";
  frmCrearMascota.show();
});

//borrar
on(document, "click", ".btnBorrar", (e) => {
  console.log("click en mi!");
  let fila = e.target.parentNode.parentNode.parentNode;
  let idform = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `seguro que desea eliminar el registro con id: ${idform}`
  );
  console.log(idform);

  if (respuesta) {
    fetch(api + "borrar/" + idform, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        location.reload();
      });
  }
});

let btnPagina1 = document.querySelector("#btnPagina1");
let btnPagina2 = document.querySelector("#btnPagina2");
let btnPagina3 = document.querySelector("#btnPagina3");
let li1 = document.querySelector("#li1");
let li2 = document.querySelector("#li2");
let li3 = document.querySelector("#li3");
let btnAnterior = document.querySelector("#btnAnterior");
let btnSiguiente = document.querySelector("#btnSiguiente");
let limite = 2;
let pagina = 1;
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  contenido.innerHTML = "";
  listartodos();
});
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  contenido.innerHTML = "";
  listartodos();
});
btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  contenido.innerHTML = "";
  listartodos();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  contenido.innerHTML = "";
  listartodos();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  contenido.innerHTML = "";
  listartodos();
});
function listartodos() {
  fetch(api + "listartodos" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
      res.mascotas.forEach((mascota) => {
        let fila = `<tr>
        <td>${mascota.id}</td>
          <td>${mascota.nombre}</td>
          <td>${mascota.genero}</td>
          <td>${mascota.fecha.slice(0, 10)}</td>
          <td>${mascota.color}</td>
          <td>${mascota.nombre_dueno}</td>
          <td>${mascota.esterilizado}</td>
          <td><button data-id="${
            mascota.id
          }" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
          <td><button data-id="${
            mascota.id
          }" class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
          </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
  if (pagina == 1) {
    btnPagina1.innerText = 1;
    btnPagina2.innerText = 2;
    btnPagina3.innerText = 3;
  } else if (pagina == 67) {
    btnPagina1.innerText = 65;
    btnPagina2.innerText = 66;
    btnPagina3.innerText = 67;
  } else {
    btnPagina1.innerText = pagina - 1;
    btnPagina2.innerText = pagina;
    btnPagina3.innerText = pagina + 1;
  }
  li1.setAttribute("class", "page-item");
  li2.setAttribute("class", "page-item");
  li3.setAttribute("class", "page-item");
  if (btnPagina1.innerText == pagina) {
    li1.setAttribute("class", "page-item active");
  } else if (btnPagina2.innerText == pagina) {
    li2.setAttribute("class", "page-item active");
  } else if (btnPagina3.innerText == pagina) {
    li3.setAttribute("class", "page-item active");
  }
}
listartodos();
