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

        await axios.patch(`http://localhost:8000/changeTaskStage`, {
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
                    <div className="icon">
                        <BsArrowLeft
                            onClick={() => changeTaskStage('left')}
                        />
                    </div>
                }
                <div className="icon">
                    <BsFillPencilFill
                        onClick={() => setIsUpdateModalOpened(true)}
                    />
                </div>
                <div className="icon">
                    <BsTrashFill
                        onClick={() => setIsDeleteModalOpened(true)}
                    />
                </div>
                {
                    !noRightArrow &&
                    <div className="icon">
                        <BsArrowRight
                            onClick={() => changeTaskStage('right')}
                        />
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