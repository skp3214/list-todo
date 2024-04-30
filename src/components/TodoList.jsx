
import React, { useState, useEffect } from 'react';

const getInitialState = () => {
    if (typeof window !== "undefined") {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const storedCompTask = JSON.parse(localStorage.getItem('comp-task')) || [];
        return { mainTask: storedTasks, completed: storedCompTask };
    } else {
        return { mainTask: [], completed: [] };
    }
};

const TodoList = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [mainTask, setMainTask] = useState(getInitialState().mainTask);
    const [completed, setCompleted] = useState(getInitialState().completed);
    const [taskHead, settaskHead] = useState("No Availabe Task");
    const [comptaskHead, setcomptaskHead] = useState("No Completed Task")

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('tasks', JSON.stringify(mainTask));
            localStorage.setItem('comp-task', JSON.stringify(completed))
        }
        if (completed.length > 0) {
            setcomptaskHead("Completed Task");
        }
        if (mainTask.length > 0) {
            settaskHead("Available Task");
        }
    }, [mainTask, completed]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMainTask([...mainTask, { title, desc }]);
        setTitle('');
        setDesc('');
    };

    const deleteHandler = (i) => {
        let copyTask = [...mainTask];
        copyTask.splice(i, 1);
        setMainTask(copyTask);
    };

    const completeHandler = (i) => {
        let copy = [...mainTask];
        let newCopy = copy[i];
        setCompleted([...completed, { title: newCopy.title, desc: newCopy.desc }]);
        deleteHandler(i);
    };

    const deleteCompleteHandler = (index) => {
        let copyTask = [...completed];
        copyTask.splice(index, 1);
        setCompleted(copyTask);
    };




    let renderTask = '';
    let completedTask = '';

    if (mainTask.length > 0) {
        renderTask = mainTask.map((t, i) => {
            return (
                <li key={i} className="list-none">
                    <div className="bg-custom-color3 h-10 mt-1  text-3xl">
                        <h5 className="text-custom-color4 text-center font-bold">{t.title}</h5>
                    </div>
                    <div className="bg-custom-color3 h-8 mt-1">
                        <h5 className="text-custom-color4 text-center font-medium">{t.desc}</h5>
                    </div>
                    <div className="flex mt-1">
                        <button onClick={() => deleteHandler(i)} className="h-10 w-1/2 mx-2 rounded-full bg-custom-color2 text-custom-color3">
                            Delete
                        </button>
                        <button onClick={() => completeHandler(i)} className="h-10 w-1/2 mx-2 rounded-full  bg-custom-color2 text-custom-color3">
                            Complete
                        </button>
                    </div>
                </li>

            );
        });
    }
    if (completed.length > 0) {
        completedTask = completed.map((task, index) => {
            return (
                <li key={index} className="list-none">
                    <div className="bg-custom-color3 h-10 mt-1 text-3xl">
                        <h5 className="text-custom-color4 text-center font-medium">{task.title}</h5>
                    </div>
                    <div className="bg-custom-color3 h-8 mt-1 ">
                        <h5 className="text-custom-color4 text-center font-medium ">{task.desc}</h5>
                    </div>
                    <button onClick={() => deleteCompleteHandler(index)} className="h-10 w-full mt-1 rounded-full bg-custom-color2 text-custom-color3">
                        Delete
                    </button>
                </li>
            );
        });
    }
    return (
        <>
            <h1 className="bg-custom-color text-custom-color3 font-bold text-center p-5 text-5xl">Todo-list</h1>
            <form onSubmit={submitHandler} className="flex flex-col sm:flex-row">
                <input type="text" className="text-2xl border-zinc-800 border-2 m-3 px-4 py-2 basis-2/5" placeholder="Enter title Here" value={title} onChange={(e) => { setTitle(e.target.value); }} />
                <input type="text" className="text-2xl border-zinc-800 border-2 m-3 px-4 py-2 basis-2/5" placeholder="Enter Description Here" value={desc} onChange={(e) => { setDesc(e.target.value); }} />
                <button className="bg-custom-color text-custom-color3 px-4 py-3 m-3 text-2xl font-bold rounded basis-1/5">Add Task</button>
            </form>
            <div className="">
                <h2 className="bg-custom-color4 rounded-md h-12 w-full text-center font-bold text-2xl pt-2 text-custom-color3 ">
                    {taskHead}
                </h2>
                {renderTask}
                <h2 className="bg-custom-color4 h-12 w-full rounded-md text-center mt-1 font-bold text-2xl pt-2 text-custom-color3 ">
                    {comptaskHead}
                </h2>
                {completedTask}
            </div>
        </>
    );
};

export default TodoList;
