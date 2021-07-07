import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle){
      const id = new Date().getTime();
      const task = {
        id,
        title: newTaskTitle,
        done: false,
      };

      setTasks([...tasks, task]);
    }
  }

  function handleMarkTaskAsDone(id: number) {
    const newTasksState = tasks.map( (task: Task) => {
      return task.id !== id ? task : {...task, done: true};
    });

    setTasks(newTasksState);
  }

  function handleRemoveTask(id: number) {
    const newTasksState = tasks.filter( (task: Task) => task.id !== id);
    
    setTasks(newTasksState);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}