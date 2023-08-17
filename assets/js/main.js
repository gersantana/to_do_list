let nombre = prompt(`Hola cual es tu nombre`)
const imprimirNombre = document.getElementById("tu_nombre")

if(nombre){
  imprimirNombre.innerHTML = (` ${nombre}.`).toUpperCase()
}else{
  imprimirNombre.innerHTML = " Usuario."
}

// const tareaInput = document.getElementById("input_list")
// const btnAgregarTarea = document.getElementById("btn_agregar")

// const tareasTotales = document.getElementById("total_tareas")
// const tareasFinalizadas = document.getElementById("total_finalizadas")

// const listaDeTareas = document.getElementById("tareas_agregadas")
// const iterarTareas = () => {
//     let html = ""
//     for(let tarea of tareas ) {
//         html += `<tr >
//                     <td><p id="identificador">00</p></td>
//                     <td><p id="tarea"> ${tarea} </p></td>
//                     <td><input class="check" type="checkbox" name="" id="" /></td>
//                     <td><button class="btn_eliminar" id="eliminar" type="submit">Eliminar</button></td>
//                 </tr>`
//                 listaDeTareas.innerHTML = html;
//     }
// }

// const tareas = []
// btnAgregarTarea.addEventListener("click", ()=> {
//     if (tareaInput.value === ""){
//         alert(`Debes llenar el campo correspondiente`)
//     }else {
//         const nuevaTarea = tareaInput.value
//         tareas.push(nuevaTarea)
//         tareaInput.value = ""
    
//         iterarTareas()
       
//         tareasTotales.innerHTML = tareas.length
//     }

// })


const tareaInput = document.getElementById("input_list");
const btnAgregarTarea = document.getElementById("btn_agregar");

const tareasTotales = document.getElementById("total_tareas");
const tareasFinalizadas = document.getElementById("total_finalizadas");

const listaDeTareas = document.getElementById("tareas_agregadas");

const tareas = [];

const iterarTareas = () => {
    let html = "";
    for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        const tareaId = `tarea_${i}`;
        html += `<tr>
                    <td><p class="identificador">${i + 1}</p></td>
                    <td><p class="tarea">${tarea.nombre}</p></td>
                    <td><input class="check" type="checkbox" name="${tareaId}" id="${tareaId}" ${tarea.finalizada ? 'checked' : ''} /></td>
                    <td><button class="btn_eliminar" type="button" data-id="${i}">Eliminar</button></td>
                </tr>`;
    }
    listaDeTareas.innerHTML = html;

    const checkboxes = document.querySelectorAll(".check");
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            tareas[index].finalizada = checkbox.checked;
            actualizarContador();
        });
    });

    actualizarContador();
};

const actualizarContador = () => {
    const tareasFinalizadasCount = tareas.filter((tarea) => tarea.finalizada).length;
    tareasFinalizadas.textContent = tareasFinalizadasCount;
};

btnAgregarTarea.addEventListener("click", () => {
    if (tareaInput.value === "") {
        alert(`Debes llenar el campo correspondiente`);
    } else {
        const nuevaTarea = {
            nombre: tareaInput.value,
            finalizada: false
        };
        tareas.push(nuevaTarea);
        tareaInput.value = "";

        iterarTareas();

        tareasTotales.textContent = tareas.length;
    }
});

listaDeTareas.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn_eliminar")) {
        const index = event.target.getAttribute("data-id");
        tareas.splice(index, 1);
        iterarTareas();
        tareasTotales.textContent = tareas.length;
    }
});

// Inicializar la lista de tareas
iterarTareas();
tareasTotales.textContent = tareas.length;