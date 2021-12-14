{
    const tasks = [];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const removeAllTasks = () => {
        tasks.splice(0, tasks.length);
        render();
    }

    const addNewTask = (newTaskContent) => {

        tasks.push({
            content: newTaskContent,
        })
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    }

    const render = () => {

        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
                <li class="tasksList__item">
                <button class="tasksList__button tasksList__button--toggleDone js-toggleDone">${task.done ? "✓" : ""}</button>
                <span class="${task.done ? "js-item--done" : ""}">${task.content}</span>
                <button class="tasksList__button tasksList__button--remove js-remove">🗑</button>
                </li>
                `
        };

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        bindEvents();
    };

    const bindEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        });

        const removeAll = document.querySelector(".js-removeAll");

        removeAll.addEventListener("click", removeAllTasks);
    }

    const clearNewTaskContent = (taskInput) => {

        taskInput.value = "";
        taskInput.focus();

    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        const taskInput = document.querySelector(".js-newTask");
        const newTaskContent = taskInput.value.trim();

        if (newTaskContent === "") {
            taskInput.focus();

        } else {
            addNewTask(newTaskContent);
        }
        clearNewTaskContent(taskInput)

    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

};