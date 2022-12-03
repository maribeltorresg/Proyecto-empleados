//LISTA DE EMPLEADOS:
// En la seccion de lista de empleados se debe crear una tabla con todos los empleados existentes:

// columnas: codigo, nombre, apellido, correo, sueldobruto, sueldoneto, dataempleado(link).

// Las columnas deben contener el feature de ordenarse de menor a mayor
//  o de mayor a menor haciendo click en los encabezados.

// OJO: si se ha hecho click en un encabezado debe aparecer un icono de
// una flecha apuntando hacia arriba o hacia abajo segun como se haya organizado la columna.
//  (si es de mas alto a mas bajo, la flecha debe apuntar hacia abajo)

/*let users = [
  {
    codigo: 001,
    nombre: " Juan",
    apellido: "Perez",
    correo: "juanperez@gmail.com",
    sueldoneto: 1000,
    dataempleado: "link",
  },
  {
    codigo: 002,
    nombre: " Mario",
    apellido: "Garcia",
    correo: "mariogarcia@gmail.com",
    sueldoneto: 1000,
    dataempleado: "link",
  },
  {
    codigo: 003,
    nombre: " Pablo",
    apellido: "Lopez",
    correo: "pablolopez@gmail.com",
    sueldoneto: 1000,
    dataempleado: "link",
  },
  {
    codigo: 004,
    nombre: " Carlos",
    apellido: "Rodrigues",
    correo: "carlosrodrigues@gmail.com",
    sueldoneto: 1000,
    dataempleado: "link",
  },
  {
    codigo: 005,
    nombre: " Maria",
    apellido: "Gonzales",
    correo: "mariagonzales@gmail.com",
    sueldoneto: 1000,
    dataempleado: "link",
  },
];

users.sort(function (a, b) {
  return a - b;
});

console.log(empleados);*/

const users = [];

// Creamos un objeto donde guardaré el estado que más adelante
// iré actualizando
const registroFiltro = {
  year: 0,
  month: 0,
};

const registroOrden = {
  column: "",
  asc: true,
};

// Crear
function create() {
  let info = prompt(
    "Ingrese la informacion del usuario (codigo, nombre, apellido, correo, sueldoneto, dataempleado)",
    "001,Andres, Perez, Andres@..., 1000 "
  );

  let array = info.replace(/ /g, "").split(",");
  users.push({
    id: Math.random().toString(36).substr(2, 5),
    codigo: array[0],
    nombre: array[1],
    apellido: array[2],
    correo: array[3],
    sueldoneto: array[4],
    dataempleado: array[5],
    created_at: new Date().toISOString(),
  });
}

// Actualizar
function update() {
  const idAModificar = prompt("Ingrese el ID del registro a modificar");
  if (idAModificar === "") {
    return;
  }

  const index = users.findIndex((element) => {
    return element.id === idAModificar;
  });
  if (index === -1) {
    alert("No existe");
    return;
  }

  const info = prompt(
    "Ingrese la informacion del usuario (codigo, nombre, apellido, correo, sueldoneto, dataempleado)",
    "001,Mario, Perez, Mario@..., 1000 "
  );

  let arrayInfo = info.replace(/ /g, "").split(",");

  users[index].codigo = arrayInfo[0];
  users[index].nombre = arrayInfo[1];
  users[index].apellido = arrayInfo[2];
  users[index].correo = arrayInfo[3];
  users[index].sueldoneto = arrayInfo[4];
  users[index].dataempleado = arrayInfo[5];
  users[index].updated_date = new Date().toISOString();
}

// Eliminar
function remove() {
  const idABorrar = prompt("Ingrese el ID del registro a borrar");
  // Validar que no este en blanco
  if (idABorrar === "") {
    return;
  }

  // Nota: findIndex retorna -1 si no encuentra
  const index = users.findIndex((element) => {
    return element.id === idABorrar;
  });
  if (index === -1) {
    alert("No existe");
    return;
  }

  const respuesta = prompt("Esta usted seguro? (Si/No)", "Si");
  if (respuesta !== "Si") {
    return;
  }
  // Le aplicamos el método splice a users
  users.splice(index, 1);
}

// Setear el obj registroFiltro
function setFiltroCodigo(codigo) {
  registroFiltro.codigo = codigo;
  renderizar();
}

// Configurar el registro
// Setear la propiedad column
function setRegistroOrden(column) {
  if (registroOrden.column === column) {
    // Invertimos el valor a false y se lo asignamos
    registroOrden.asc = !registroOrden.asc;
  } else {
    // Si el valor de column es distinta al argumento
    // Le asignamos a la propiedad column lo que recibimos por el parámetro
    // column
    registroOrden.column = column;
    registroOrden.asc = true;
  }
  renderizar();
}

// Filtramos por anio y mes
function filtrarUsuarios(anioAfiltrar, mesAFiltrar) {
  // Nota: filter espera que la arrow function retorne true o false
  const usuariosFiltrados = users.filter((element) => {
    // Convertimos el valor de created_at a un obj Date
    let fechaDeCreacion = new Date(element.created_at);
    let mesDeCreacion = fechaDeCreacion.getMonth() + 1;
    let anioDeCreacion = fechaDeCreacion.getFullYear();

    // No filtrar
    if (anioAfiltrar === 0 && mesAFiltrar === 0) {
      return true;
    }

    // Solo year
    if (anioAfiltrar > 0 && mesAFiltrar === 0) {
      if (anioDeCreacion === anioAfiltrar) {
        return true;
      }
    }

    // Solo month
    if (anioAfiltrar === 0 && mesAFiltrar > 0) {
      if (mesDeCreacion === mesAFiltrar) {
        return true;
      }
    }

    // year and month
    if (anioDeCreacion === anioAfiltrar && mesDeCreacion === mesAFiltrar) {
      return true;
    }
  });

  // console.log(usuariosFiltrados);
  return usuariosFiltrados;
}

// Esta función es quien va a ordenar y dibujar la tabla
function renderizar() {
  // Lo que me retorne la función filtrarUsuarios() le asigno a data
  let data = filtrarUsuarios(registroFiltro.year, registroFiltro.month);

  // Ordenamos
  data.sort((a, b) => {
    if (registroOrden.column === "") {
      // No hará nada
      return 0;
    }
    if (registroOrden.column === "codigo") {
      return registroOrden.asc ? a.codigo - b.codigo : b.codigo - a.codigo;
    }

    return registroOrden.asc
      ? a[registroOrden.column].localeCompare(b[registroOrden.column])
      : b[registroOrden.column].localeCompare(a[registroOrden.column]);
  });

  table.innerHTML = "";

  // Armar las cabeceras
  const thead = document.createElement("thead");
  const headTr = document.createElement("tr");

  for (const property in data[0]) {
    const th = document.createElement("th");
    th.textContent = property.toUpperCase();
    th.style.textAlign = "center";
    th.style.color = "#61B1D5";

    th.addEventListener("click", () => {
      console.log(property);

      // Llamamos a setRegistroOrden(...) y le pasamos como parámetro la cabecera que se
      // dió click
      setRegistroOrden(property);
    });

    headTr.appendChild(th);
  }

  thead.appendChild(headTr);
  table.appendChild(thead);

  // Cuerpo de la tabla
  const tbody = document.createElement("tbody");

  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");

    for (const property in data[i]) {
      const td = document.createElement("td");
      td.textContent = data[i][property];
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
}

// Crear elementos que se van a mostrar en la interfaz
const createBtn = document.createElement("button");
const updateBtn = document.createElement("button");
const deleteBtn = document.createElement("button");
const table = document.createElement("table");

/*// year select
const selectYear = document.createElement("select");

const yearOptAll = document.createElement("option");
yearOptAll.value = 0;
yearOptAll.textContent = "Todo";

const yearOpt1 = document.createElement("option");
yearOpt1.value = 2021;
yearOpt1.textContent = "2021";

const yearOpt2 = document.createElement("option");
yearOpt2.value = 2022;
yearOpt2.textContent = "2022";

selectYear.appendChild(yearOptAll);
selectYear.appendChild(yearOpt1);
selectYear.appendChild(yearOpt2);

// month select
const selectMonth = document.createElement("select");

const monthOptAll = document.createElement("option");
monthOptAll.value = 0;
monthOptAll.textContent = "Todo";

const monthOpt1 = document.createElement("option");
monthOpt1.value = 1;
monthOpt1.textContent = "Enero";

const monthOpt2 = document.createElement("option");
monthOpt2.value = 4;
monthOpt2.textContent = "Abril";

const monthOpt3 = document.createElement("option");
monthOpt3.value = 11;
monthOpt3.textContent = "Noviembre";

const monthOpt4 = document.createElement("option");
monthOpt4.value = 12;
monthOpt4.textContent = "Diciembre";

selectMonth.appendChild(monthOptAll);
selectMonth.appendChild(monthOpt1);
selectMonth.appendChild(monthOpt2);
selectMonth.appendChild(monthOpt3);
selectMonth.appendChild(monthOpt4);

createBtn.textContent = "Crear";
createBtn.style.backgroundColor = "#3CBDB2";
updateBtn.textContent = "Modificar registro";
updateBtn.style.backgroundColor = "#EED739";
updateBtn.style.color = "black";
deleteBtn.textContent = "Borrar registro";
deleteBtn.style.backgroundColor = "#E93C46";

// Seleccionamos root
const root = document.getElementById("root");

// Mostrar en pantalla
root.appendChild(selectYear);
root.appendChild(selectMonth);
root.appendChild(createBtn);
root.appendChild(updateBtn);
root.appendChild(deleteBtn);
root.appendChild(table);

selectYear.addEventListener("change", (e) => {
  // console.log("on change month: " + e.target.value);

  // Convertimos el parámetro a número
  setFiltroYear(+e.target.value);
});

selectMonth.addEventListener("change", (e) => {
  // console.log("on change month: " + e.target.value);
  setFiltroMonth(+e.target.value);
});

createBtn.addEventListener("click", () => {
  create();
  renderizar();
});
updateBtn.addEventListener("click", () => {
  update();
  renderizar();
});
deleteBtn.addEventListener("click", () => {
  remove();
  renderizar();
});

renderizar();*/
