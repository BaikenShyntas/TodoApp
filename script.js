const h1 = document.querySelector("#h1");
const h2 = document.querySelector("#h2");
const inp = document.querySelector("#inp");
const btn= document.querySelector("#btn");
const ul = document.querySelector("#ul");
const deleteAllLi = document.querySelector("#deleteAllLi")

function addElement() {
  const inputValue = inp.value.trim();
  if (inputValue !== "") {
    createTaskElement(inputValue);
    saveTaskToLocalStorage(inputValue);
    clearValueInp();
    hideH2IfTasksExist();
  }
}
function hideH2IfTasksExist() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if(savedTasks.length > 0) {
    h2.style.display = "none"
  } else {
    h2.style.display = "block"
  }
}

function createTaskElement(task) {
      const li = document.createElement("li");
      const p = document.createElement("p");

      const deleteBtn = document.createElement("button");
      const deleteimg = document.createElement("img");

      const completeBtn = document.createElement("button");
      const completeimg = document.createElement("img");

      const redBtn = document.createElement("button");
      const blueBtn = document.createElement("button");
      const yellowBtn = document.createElement("button");
      const greyBtn = document.createElement("button");

      redBtn.classList.add("redBtn");
      blueBtn.classList.add("blueBtn");
      yellowBtn.classList.add("yellowBtn");
      greyBtn.classList.add("greyBtn")
      deleteBtn.classList.add("ul__li__deleteBtn");
      completeBtn.classList.add("ul__li__completeBtn");
      deleteimg.classList.add("ul__li__deleteBtn__img");
      completeimg.classList.add("ul__li__completeBtn__img");
      li.classList.add("ul__li");
      p.classList.add("ul__li__p");

      p.textContent = task;

      deleteimg.src = "./img/Red_X.svg.png";
      completeimg.src = "./img/zelenaja-galochka.png";
      function deleteli() {
        li.remove();
        removeFromLocalStorage(task);
    
        const taskCount = document.querySelector("#n5");
        const currentCount = parseInt(taskCount.textContent);
        taskCount.textContent = currentCount - 1;
    
        hideH2IfTasksExist();
      }
      deleteBtn.addEventListener("click", deleteli);
      function confirmTask() {
        p.style.textDecoration = "line-through";
        p.style.color = "grey";
      }
      completeBtn.addEventListener("click", confirmTask);
    
      function backgroundChangerToRed() {
        li.style.backgroundColor = "#f54242";
        p.style.color = "white";
      }
    
      function backgroundChangerTobBlue() {
        li.style.backgroundColor = "#4287f5";
        p.style.color = "white";
      }
    
      function backgroundChangerToYellow() {
        li.style.backgroundColor = "#fcba03";
        p.style.color = "white";
      }
    
      function backgroundChangerToGrey() {
        li.style.backgroundColor = "#F2F2F2";
        p.style.color = "#000000";
      }
        
      redBtn.addEventListener("click", backgroundChangerToRed);
      blueBtn.addEventListener("click", backgroundChangerTobBlue);
      yellowBtn.addEventListener("click", backgroundChangerToYellow);
      greyBtn.addEventListener("click", backgroundChangerToGrey);

      ul.appendChild(li);
      li.appendChild(p);
    
      li.appendChild(redBtn);
      li.appendChild(blueBtn);
      li.appendChild(yellowBtn);
      li.appendChild(greyBtn);
    
      li.appendChild(completeBtn);
      completeBtn.appendChild(completeimg);
    
      li.appendChild(deleteBtn);
      deleteBtn.appendChild(deleteimg);

      const taskCount = document.querySelector("#n5");
      const currentCount = parseInt(taskCount.textContent);
      taskCount.textContent = currentCount + 1;
};


function saveTaskToLocalStorage(task) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function removeFromLocalStorage(task) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = savedTasks.filter((savedTask) => savedTask !== task);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function deleteAllTasks() {
  ul.innerHTML = "";
  localStorage.removeItem("tasks");
  const taskCount = document.querySelector("#n5");
  taskCount.textContent = "0";
  h2.style.display = "block";
}

deleteAllLi.addEventListener("click", deleteAllTasks);
function clear() {
    inp.value = "";
    h2.remove();
}

btn.addEventListener("click", function() {
    addElement();
});

inp.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        addElement();
        inp.value = "";
    }
})

window.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (task) {
    createTaskElement(task);
  });
  hideH2IfTasksExist();
});

function clearValueInp() {
  inp.value = ""
}
