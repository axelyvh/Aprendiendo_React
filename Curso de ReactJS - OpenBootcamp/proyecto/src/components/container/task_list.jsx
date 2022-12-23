import React from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enums';
import TaskComponent from '../pure/task';


const TaskListComponent = () => {

    const defaultTask = new Task("demo", "descripcion demo", false, LEVELS.NORMAL);

    const changeState = (id) => {
        console.log("TODO: Cambiar estado de una tarea");
    }

    return (
        <div>
            <div><h1>Tus Tareas:</h1></div>
            {/* TODO: Aplicar un For/Map para renderizar una lista */}
            <TaskComponent task={defaultTask}></TaskComponent>
        </div>
    );
};


TaskListComponent.propTypes = {

};


export default TaskListComponent;
