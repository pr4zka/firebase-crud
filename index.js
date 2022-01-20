//IMPORTAMOS LO NECESARIO
import {
  saveTask,
  getTask,
  onGetTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./firebase.js";
const taskForm = document.getElementById("task-form");
const taskConatainer = document.getElementById("task-container");

let editStatus = false;
let id = "";

//AGREGAMOS LAS TAREAS
window.addEventListener("DOMContentLoaded", async () => {
  onGetTask((querySnapshot) => {
    taskConatainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      taskConatainer.innerHTML += `

     <div class="card card-body mt-2 border-primary">
        <h3 class"h5">${task.title}</h3>
        <p>${task.description}<p>
        <div>
        <button class='btn btn-primary btn-delete' data-id="${doc.id}">Delete</button>
        <button class='btn btn-secondary btn-edit' data-id="${doc.id}">Edit</button>
        </div>
     </div>
   `;
    });

    //BORRAMOS LAS TAREAS
    const btnDelete = taskConatainer.querySelectorAll(".btn-delete");
    btnDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });

    //LLENAMOS LOS CAMPOS PARA EDITAR
    const btnEdit = taskConatainer.querySelectorAll(".btn-edit");
    btnEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await getTasks(e.target.dataset.id);
        const task = doc.data();
        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;

        editStatus = true;
        id = doc.id;
        taskForm["btn-task-save"].innerText = "Update";
      });
    });
  });
});

// EVENTO DEL BOTON ENVIAR
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  //ACTUALIZAMOS
  if (!editStatus) {
    saveTask(title.value, description.value);
  } else {
    updateTask(id, {
      title: title.value,
      description: description.value,
    });
    editStatus = false;
  }
  taskForm.reset();
});
