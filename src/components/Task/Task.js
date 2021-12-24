import { useState } from 'react';
import {
    BsArrowRight,
    BsArrowLeft,
    BsFillPencilFill,
    BsTrashFill
} from "react-icons/bs";
import axios from 'axios';
import DeleteTaskModal from '../../Modals/DeleteTaskModal/DeleteTaskModal';
import UpdateTaskModal from '../../Modals/UpdateTaskModal/UpdateTaskModal';
import './Task.scss';

const Task = ({
    noRightArrow,
    noLeftArrow,
    setAllTasks,
    setTaskText,
    taskStage,
    allTasks,
    task
}) => {
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
    const { taskText, _id } = task;

    const changeTaskStage = async (direction) => {
        const token = localStorage.getItem('token');

        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/changeTaskStage`, {
            stage: direction === 'left' ? --taskStage : ++taskStage,
            _id
        },
        {
            headers: {
                token
            }
        }).then(() => {
            allTasks.map(elem => {
                if (elem._id === _id) {
                    elem.stage = taskStage;
                }
            });

            setAllTasks([...allTasks]);
        })
        
    }

    return (
        <div className="task">
            <p>
                {taskText}
            </p>
            <div className="icons">
                { 
                    !noLeftArrow &&
                    <div 
                        className="icon"
                        onClick={() => changeTaskStage('left')}
                    >
                        <BsArrowLeft />
                    </div>
                }
                <div 
                    className="icon"
                    onClick={() => setIsUpdateModalOpened(true)}
                >
                    <BsFillPencilFill />
                </div>
                <div 
                    className="icon"
                    onClick={() => setIsDeleteModalOpened(true)}
                >
                    <BsTrashFill />
                </div>
                {
                    !noRightArrow &&
                    <div 
                        className="icon"
                        onClick={() => changeTaskStage('right')}
                    >
                        <BsArrowRight />
                    </div>
                }
            </div>
            {isDeleteModalOpened &&
                <DeleteTaskModal
                    setIsDeleteModalOpened={setIsDeleteModalOpened}
                    isDeleteModalOpened={isDeleteModalOpened}
                    setAllTasks={setAllTasks}
                    allTasks={allTasks}
                    _id={_id}
                />
            }
            {isUpdateModalOpened &&
                <UpdateTaskModal
                    setIsUpdateModalOpened={setIsUpdateModalOpened}
                    isUpdateModalOpened={isUpdateModalOpened}
                    setAllTasks={setAllTasks}
                    setTaskText={setTaskText}
                    allTasks={allTasks}
                    task={task}
                />
            }
        </div>
    )
}

export default Task;