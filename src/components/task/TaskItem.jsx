import React from 'react'
import { useState } from 'react';
import classes from './TaskItem.module.scss';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import moment from 'moment';
const TaskItem = ({task, deleteTask}) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckBoxClick = async () => {
    try {
        await axios.put(`/api/task/${task._id}`, {
            completed: !isCompleted,
        });
        setIsCompleted(!isCompleted);
        toast.success('Task Updated Successfully');
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <tr className={classes.task_item}>
        <td className={classes.task_name}>
            <div className={classes.checkbox} onChange={handleCheckBoxClick} role='checkbox' aria-checked>
                <input type="checkbox" checked={isCompleted} tabIndex={-1} readOnly/>
            </div>
            <p>{task.title}</p>
        </td>
        <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
        <td>{moment(task.createdAt).format('MMM Do yy')}</td>
        <td>
            <button className={classes.deleteBtn} type="button" onClick={() => deleteTask(task._id)}>Delete</button>
        </td>
    </tr>
  )
}

export default TaskItem