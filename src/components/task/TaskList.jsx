import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import classes from './TaskList.module.scss';
import axios from 'axios';
import TaskItem from './TaskItem';
import { toast } from 'react-hot-toast';

const TaskList = () => {
   const [taskList, setTaskList] = useState([]);
   const [isAddingNew, setIsAddingNew] = useState(false);
   const [newTask, setNewTask] = useState('');

   const addNewTask = async(e) => {
        e.preventDefault();
        if(newTask.length <= 0) {
            toast.error('Task is empty');
            return;
        }

        try {
            const {data} = await axios.post('/api/task', {title: newTask});
            setTaskList([{...data},...taskList]);
            setNewTask('');
            setIsAddingNew(false);
        } catch (error) {
            console.log(error);
        }
   }

   const getTasks = async () => {
    try {
        const {data} = await axios.get('/api/task/my-tasks');
        setTaskList( data.tasks.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
        console.log(error)
    }
   }

   const addNewButtonClick = (e) => {
    setIsAddingNew((oldValue) => !oldValue)
   }

   useEffect(() => {
    getTasks();
   }, []);


   const deleteTask = async (id) => {
    try {
        await axios.delete(`/api/task/${id}`);
        toast.success('Task Deleted.');
        const updatedTaskList = taskList.filter(task => task._id !== id);
        setTaskList(updatedTaskList);
    } catch (error) {
        console.log(error);
    }
   }
  return (
    <div>
        <div className={classes.topBar}>
            <button type='button' className={classes.addNew} onClick={addNewButtonClick} >Add new</button>
        </div>
        {isAddingNew && (
            <form className={classes.addNewForm} onSubmit={addNewTask}>
                <input type="text" value={newTask} placeholder='Task title' onChange={(e) => setNewTask(e.target.value)}/>
                <button type='submit'>Add</button>
            </form>
        )}
        {taskList.length > 0 ? (
            <table className={classes.taskList_table}>
                <tbody>
                    {taskList.map(task => (
                        <TaskItem key={task._id} deleteTask={deleteTask} task={task}/>
                    ))}
                </tbody>
            </table>
        ) : <h2>No tasks yet.</h2>}
    </div>
  )
}

export default TaskList