const tarjeta = document.getElementById("tarjeta");
const girar = document.querySelector(".tarjeta");
const btnAbrirFormulario = document.getElementById("btnAbrirFormulario");
const formulario = document.getElementById("formulario");
const numTarjeta = document.querySelector("#tarjeta .numero");
const nombreTarjeta = document.querySelector("#tarjeta .nombre");
const logo = document.getElementById("logo");
const firma = document.querySelector("#tarjeta .firma p");
const vtoMes = document.querySelector("#tarjeta #vto .mes");
const vtoAño = document.querySelector("#tarjeta #vto .año");
const ccv = document.querySelector("#tarjeta .ccv");
/*-------------------EVENTOS-------------------*/
const mostrarFrente = () => {
  if (tarjeta.classList.contains("girar")) {
    tarjeta.classList.remove("girar");
  }
};

tarjeta.addEventListener("click", () => {
  tarjeta.classList.toggle("girar");
});

btnAbrirFormulario.addEventListener("click", () => {
  btnAbrirFormulario.classList.toggle("abrir");
  formulario.classList.toggle("desplazar");
});

// MESES
const meses = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];
for (let i = 0; i < meses.length; i++) {
  let opcion = document.createElement("option");
  opcion.value = meses[i];
  opcion.innerText = meses[i];
  formulario.selectMes.appendChild(opcion);
  console.log(meses[i]);
}

// AÑOS
const añoActual = new Date().getFullYear();
for (let i = añoActual; i <= añoActual + 8; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  formulario.selectAño.appendChild(opcion);
}

// INPUT NUMERO DE TARJETA
formulario.inputNumero.addEventListener("keyup", e => {
  let valueInput = e.target.value; //guardamos el valor del input
  formulario.inputNumero.value = valueInput
    //el metodo replace nos va a permitir pasarle una expresion regular
    ///\s/g eliminamos espacion en blanco
    .replace(/\s/g, "")
    //elimina las letras
    .replace(/\D/g, "")
    //agrega espacio cada 4 numeros
    //lo que hacemos es agrupar numeros del 0 al 9 pero cada 4 caracteres
    .replace(/([0-9]{4})/g, "$1 ")
    .trim(); //con trim sacamos el ultimo espaciado

  /*----reemplazo de los # por los numeros que se escriben en el formulario----*/

  if ((numTarjeta.textContent = valueInput)) {
    numTarjeta.textContent = valueInput;
  } else {
    //reseteo para que cuando se borre el formulario, vuelvan a aparecer los #
    numTarjeta.textContent = "#### #### #### ####";
    //reseteo para que cuando se borre el formulario, se elimine el logo
    logo.innerHTML = "";
  }
  if (valueInput[0] == 4) {
    logo.innerHTML = ""; //para ue no se agregue muchas veces la img
    const img = document.createElement("img");
    img.src = "img/logos/visa.png";
    logo.appendChild(img);
  } else if (valueInput[0] == 5) {
    logo.innerHTML = ""; //para ue no se agregue muchas veces la img
    const img = document.createElement("img");
    img.src = "img/logos/mastercard.png";
    logo.appendChild(img);
  }

  //muestra el frente si se estan ingresando datos de este lado
  mostrarFrente();
});

// input validacion del nombre
formulario.inputNombre.addEventListener("keyup", e => {
  let valueInput = e.target.value;

  //validacion para que en el nombre no se permitan numeros
  formulario.inputNombre.value = valueInput.replace(/[0-9]/g, "");

  nombreTarjeta.textContent = valueInput;
  firma.textContent = valueInput;

  if (valueInput === "") {
    nombreTarjeta.textContent = "C.ARIAS";
    firma.textContent = "";
  }
  mostrarFrente();
});

// selectboxes de expiracion y CCV

//select mes
formulario.selectMes.addEventListener("change", e => {
  vtoMes.textContent = e.target.value;
  mostrarFrente();
});

// select año
formulario.selectAño.addEventListener("change", e => {
  vtoAño.textContent = e.target.value.slice(2); //slice para que muestre los ultimos 2 digitos
  mostrarFrente();
});

// codigo del ccv
formulario.inputCCV.addEventListener("keyup", () => {
  if (!tarjeta.classList.contains("girar")) {
    tarjeta.classList.add("girar");
  }

  //validacion para que solo pueda poner numeros
  formulario.inputCCV.value = formulario.inputCCV.value
    .replace(/\s/g, "") //elimina espacios
    .replace(/\D/g, ""); //elimina letras
  // ccv.textContent = formulario.inputCCV.value;
  ccv.textContent = formulario.inputCCV.value;
});
