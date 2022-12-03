const users = [];

let sueldos = {
  jefe: 5000,
  analista: 4000,
  programador: 3000,
  soporte: 2000,
  asistente: 1500,
};

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

class Empleado {
  constructor(nombre, apellido, correo, cargo) {
    this.codigo = this.generarCodigoAleatorio();
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.cargo = cargo;
    this.sueldo_bruto = this.sueldoBruto();
    this.sueldo_neto = this.sueldoNeto();
    this.created_at = new Date().toISOString();
    this.updated_at = "";
  }

  generarCodigoAleatorio() {
    return Math.random().toString(36).substr(2, 5);
  }

  sueldoBruto() {
    return sueldos[this.cargo];
  }

  sueldoNeto() {
    return this.sueldoBruto() * 0.8;
  }
}

// Retorna "true" si no existe otro
// usuario con el mismo correo.
function verificarCorreo(correo) {
  const userIndex = users.findIndex((user) => {
    return user.correo === correo;
  });

  if (userIndex === -1) {
    return true;
  }
}

// Crear
function create(nombre, apellido, correo, cargo) {
  if (!verificarCorreo(correo)) {
    alert("Ya existe un usuario con este correo: " + correo);
    return;
  }

  const empleado = new Empleado(nombre, apellido, correo, cargo);
  users.push(empleado);
}

// Actualizar
function update(codigo, nombre, apellido, correo, cargo) {
  if (codigo === "") {
    return;
  }

  if (!verificarCorreo(correo)) {
    alert("Ya existe un usuario con este correo: " + correo);
    return;
  }

  const empleadoIndex = users.findIndex((empleado) => {
    return empleado.codigo === codigo;
  });
  if (empleadoIndex === -1) {
    alert(`El empleado con el id: ${codigo} no existe!`);
    return;
  }

  users[empleadoIndex].nombre = nombre;
  users[empleadoIndex].apellido = apellido;
  users[empleadoIndex].correo = correo;
  users[empleadoIndex].cargo = cargo;
  users[empleadoIndex].updated_at = new Date().toISOString();
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
function setFiltroYear(year) {
  registroFiltro.year = year;
  renderizar();
}

// Setear el obj registroFiltro
function setFiltroMonth(month) {
  registroFiltro.month = month;
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

const $perfilCodigo = $("#perfil-codigo");
const $perfilNombre = $("#perfil-nombre");
const $perfilApellido = $("#perfil-apellido");
const $perfilCorreo = $("#perfil-correo");
const $perfilCargo = $("#perfil-cargo");
const $perfilEditar = $("#perfil-editar");
const $perfilGuardar = $("#perfil-guardar");

function perfilLlenarDatos(empleado) {
  $perfilCodigo.val(empleado.codigo);
  $perfilNombre.val(empleado.nombre);
  $perfilApellido.val(empleado.apellido);
  $perfilCorreo.val(empleado.correo);
  $perfilCargo.val(empleado.cargo);
  perfilDeshabilitar();
}
function perfilHabilitar() {
  $("#usuario input, #usuario select").removeAttr("disabled");
}
function perfilDeshabilitar() {
  $("#usuario input, #usuario select").attr("disabled", "disabled");
}
perfilDeshabilitar();

$perfilEditar.on("click", () => {
  perfilHabilitar();
});

$perfilGuardar.on("click", () => {
  update(
    $perfilCodigo.val(),
    $perfilNombre.val(),
    $perfilApellido.val(),
    $perfilCorreo.val(),
    $perfilCargo.val()
  );
  perfilDeshabilitar();
  renderizar();
});

// Esta función es quien va a ordenar y dibujar la tabla
function renderizar() {
  // Lo que me retorne la función filtrarUsuarios() le asigno a data
  let data = filtrarUsuarios(registroFiltro.year, registroFiltro.month);

  if (!data.length) {
    return;
  }

  // Ordenamos
  data.sort((a, b) => {
    if (registroOrden.column === "") {
      // No hará nada
      return 0;
    }
    if (registroOrden.column === "edad") {
      return registroOrden.asc ? a.edad - b.edad : b.edad - a.edad;
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
    th.textContent = property.toUpperCase().replace("_", " ");

    th.addEventListener("click", () => {
      // Llamamos a setRegistroOrden(...) y le pasamos como parámetro la cabecera que se
      // dió click
      setRegistroOrden(property);
    });

    headTr.appendChild(th);
  }

  // Cabecera de la columna "Data Empleado"
  const thEditar = document.createElement("th");
  thEditar.textContent = "Data Empleado".toUpperCase();
  headTr.appendChild(thEditar);

  thead.appendChild(headTr);
  table.appendChild(thead);

  // Cuerpo de la tabla
  const tbody = document.createElement("tbody");

  // Recorremos todos los empleados para
  // crearles su respectiva fila.
  for (let i = 0; i < data.length; i++) {
    const empleado = data[i];
    const tr = document.createElement("tr");

    for (const property in empleado) {
      const td = document.createElement("td");
      td.textContent = empleado[property];
      tr.appendChild(td);
    }

    // Agregamos el link "Perfil"
    const tdLinkEditar = document.createElement("td");
    const linkEditar = document.createElement("a");
    linkEditar.textContent = "Perfil";
    linkEditar.href = "#usuario";
    linkEditar.addEventListener("click", () => {
      perfilLlenarDatos(empleado);
    });
    tdLinkEditar.appendChild(linkEditar);
    tr.appendChild(tdLinkEditar);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
}

// Crear elementos que se van a mostrar en la interfaz
const createBtn = document.createElement("button");
const updateBtn = document.createElement("button");
const deleteBtn = document.createElement("button");
const table = document.createElement("table");
table.textContent = "Aún no existen registros de empleados";

// year select
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
const root = document.getElementById("tabla-root");

// Mostrar en pantalla
// // Filtros
// root.appendChild(selectYear);
// root.appendChild(selectMonth);
// // Botones
// root.appendChild(createBtn);
// root.appendChild(updateBtn);
// root.appendChild(deleteBtn);
// // Tabla
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

renderizar();
