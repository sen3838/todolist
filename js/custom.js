let user = document.querySelector("#user");
let add = document.querySelector("#add");
let taskBoard = document.querySelector("#taskBoard");
let tabs = document.querySelectorAll(".tabs li");

let mode = "all";
let filterList = []; // 전역 변수로 선언

let taskList = []; // 입력한 내용을 담을 수 있는 배열

add.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomId(),
    taskContent: user.value,
    isComplete: false,
  };

  taskList.push(task);
  user.value = "";
  render();
}

// 화면에 보여줌
function render() {
  let result = "";

  let list = [];
  if (mode == "all") {
    list = taskList; // 전체 목록
  } else {
    list = filterList; // 필터링된 목록
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      result += `
        <div class="task">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
            <button onclick="complete(${list[i].id})">check</button>
            <button onclick="deleteTask(${list[i].id})">delete</button>
          </div>
        </div>`;
    } else {
      result += `
        <div class="task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="complete(${list[i].id})">check</button>
            <button onclick="deleteTask(${list[i].id})">delete</button>
          </div>
        </div>`;
    }
  }
  taskBoard.innerHTML = result;
}

function complete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
    }
  }
  filter(); // 필터 다시 실행
}

// 체크버튼을 클릭하면 모두 true로 변경됨. 날짜를 이용해서 index번호를 만들려고함
randomId();
function randomId() {
  console.log(Date.now());
  return Date.now();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter(); // 필터 다시 실행
}

// tabs 클릭 시 mode 변경
tabs.forEach((tab, index) => {
  tab.addEventListener("click", (event) => {
    tabs.forEach((tab) => {
      tab.classList.remove("on");
    });

    tabs[index].classList.add("on");
    filter(event); // 필터 함수 호출
  });
});

function filter(event) {
  if (event) {
    mode = event.target.id;
  }

  // filterList를 새로 정의하여 필터링 작업
  filterList = [];

  if (mode == "all") {
    render(); // 'all' 모드일 때 모든 taskList를 렌더링
  } else if (mode == "going") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render(); // 진행 중인 task만 렌더링
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render(); // 완료된 task만 렌더링
  }
}

// ------------------
// let user = document.querySelector("#user");
// let add = document.querySelector("#add");
// let taskBoard = document.querySelector("#taskBoard");

// let taskList = []; //입력한 내용 담을 변수

// add.addEventListener("click", addTask);

// function addTask() {
//   //   let taskContent = user.value;
//   //   //   console.log(taskContent);
//   //   taskList.push(taskContent);
//   //   console.log(taskList);

//   let task = {
//     id: randomId(), // 고유번호
//     taskContent: user.value,
//     isComplete: false,
//   };

//   taskList.push(task);
//   console.log(taskList);

//   user.value = "";
//   render();
// }

// // 화면에 보여줌
// function render() {
//   //   console.log("render");
//   let result = "";

//   for (let i = 0; i < taskList.length; i++) {
//     // result += `
//     //     <div class="task">
//     //         <div>${taskList[i].taskContent}</div>
//     //         <div>
//     //             <button onclick="complete()">check</button>
//     //             <button>delete</button>
//     //         </div>
//     //     </div>`; // taskList 변수안에 있는 내용 보여주기, 내용을 계속 추가해야하므로 += 으로 작성

//     if (taskList[i].isComplete == true) {
//       result += `
//         <div class="task">
//             <div class="task-done">${taskList[i].taskContent}</div>
//             <div>
//                 <button onclick="complete(${taskList[i].id})">check</button>
//                 <button>delete</button>
//             </div>
//         </div>`;
//     } else {
//       result += `
//         <div class="task">
//             <div>${taskList[i].taskContent}</div>
//             <div>
//                 <button onclick="complete(${taskList[i].id})">check</button>
//                 <button>delete</button>
//             </div>
//         </div>`;
//     }
//   }

//   taskBoard.innerHTML = result;
// }

// function complete(id) {
//   console.log("체크");
//   for (let i = 0; i < taskList.length; i++) {
//     if (taskList[i].id == id) {
//       //   taskList[i].isComplete = true;

//       taskList[i].isComplete = !taskList[i].isComplete;
//     }
//   }
//   render();
// }

// // 하나씩만 밑줄 그어지게 고유번호를 만듦

// randomId();

// function randomId() {
//   console.log(Date.now());
//   return Date.now();
// }
