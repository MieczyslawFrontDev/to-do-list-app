{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = taskIndex => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const addNewTask = newTaskContent => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ]
        render();
    };

    const toggleTaskDone = taskIndex => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
                <li class="tasksList__item${task.done && hideDoneTasks ? " js-tasksList__item--hidden" : ""}">
                <button class="tasksList__button tasksList__button--toggleDone js-toggleDone">
                ${task.done ? "✓" : ""}
                </button>
                <span class="${task.done ? "js-item--done" : ""}">
                ${task.content}</span>
                <button class="tasksList__button tasksList__button--remove js-remove">🗑</button>
                </li>
                `
        };

        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const renderButtons = () => {

        const buttonsContainer = document.querySelector(".js-buttons")

        if (!tasks.length) {

            buttonsContainer.innerHTML = "";
            return;
        }

        buttonsContainer.innerHTML = `
            
            <button class="buttons__button js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="buttons__button js-allDoneTasks"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
        `;
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
            });
        });
    };

    const bindButtonsEvents = () => {

        const hideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");
        const allDoneTasksButton = document.querySelector(".js-allDoneTasks")

        if (hideDoneTasksButton && allDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks)
            allDoneTasksButton.addEventListener("click", markAllTaskDone)
        };
    };

    const render = () => {

        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const clearNewTaskContent = (taskInput) => {

        taskInput.value = "";
        taskInput.focus();
    };

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

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}