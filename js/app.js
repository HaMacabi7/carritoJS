//Variables
const carrito = document.querySelector("#carrito"); //referencia al contenedor del carrito
const contenedorCarrito = document.querySelector("#lista-carrito tbody"); //tbody donde se muestran cursos agregados
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito"); //btn para vaciar carrito
const listaCursos = document.querySelector("#lista-cursos"); //lista de cursos

let articulosCarrito = []; //array que almacena cursos

cargarEventListeners(); //funcion para configurar escuchadores eventos

function cargarEventListeners() {
  //Agrega curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Muestra cursos del storage (convertido a array)
  document.addEventListener('DOMContentLoaded', ()=>{
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
  });


  //Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    //console.log('Vaciando carrito');
    articulosCarrito = []; //reseteamos carrito
    limpiarHTML(); //Eliminamos todo el HTML del carrito
  });
}

//Funciones
function agregarCurso(e) {
  //se dispara al hacer clic en el botón "Agregar al Carrito"
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    //si obj tiene la clase
    const cursoSeleccionado = e.target.parentElement.parentElement; //obtiene todo el curso (div)
    leerDatosCurso(cursoSeleccionado);
  }
}

//Se dispara al hacer clic en el enlace "X" de un curso en el carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id"); //obtiene ID de curso

    //Lo elimina del arreglo
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); //Actualiza carrito (sin elementos quitados)
  }
}

//Calcular total a pagar
function calcularTotal() {
  //Suma precio de los cursos en el carrito (precio * cantidad)
  return articulosCarrito.reduce(
    (total, curso) =>
      total + parseFloat(curso.precio.replace("$", "")) * curso.cantidad,
    0
  );
}

//extrae info del curso cuando usuario hace clic en "Agregar al Carrito"
function leerDatosCurso(curso) {
  //Crear objeto con el contenido del curso actual
  const infoCurso = {
    //Extrae propiedades del curso
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"), //captura id
    cantidad: 1,
  };

  //Compara curso actual (carrito) con el curso que intenta agregar (infoCurso)
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //TRUE (ya está en carrito)
    const cursos = articulosCarrito.map((curso) => {
      //Recorre cursos y devuelve un nuevo arreglo
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna curso actualizado (cantidad)
      } else {
        return curso; //retorna curso sin cambios
      }
    });
    //Crea nueva copia del carrito con los cambios
    articulosCarrito = [...cursos];
  } else {
    //Si curso no existe

    //Agrega curso al final del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //Actualiza el HTML del carrito
  carritoHTML();
}

//Genera el HTML del carrito, mostrando la lista de cursos
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre carrito y genera HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso; //Destructura curso
    //Por cada curso en contenedor crea una fila de tabla (<tr>)
    const row = document.createElement("tr");
    //Celdas para cada fila
    row.innerHTML = ` 
            <td>
                <img src="${imagen}" width="100"> 
            </td>
            <td>  ${titulo}  </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

    //Agrega FILA creada al contenedor
    contenedorCarrito.appendChild(row);
  });

  // Mostrar total a pagar
  const total = calcularTotal();
  const rowTotal = document.createElement("tr");
  rowTotal.innerHTML = `
          <td colspan="3"><strong>Total a Pagar</strong></td>
          <td colspan="2"><strong>$${total.toFixed(2)}</strong></td>
      `;
  // Agregar la fila del total al carrito antes de vaciar carrito
  contenedorCarrito.appendChild(rowTotal);

  //Sincronizar con storage
  sincronizarStorage();
}



//Elimina todo el contenido HTML actual del carrito (el tbody)
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    //hasta que haya un solo curso
    contenedorCarrito.removeChild(contenedorCarrito.firstChild); //elimina las filas
  }
}

//Para guardar carrito en storage
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
