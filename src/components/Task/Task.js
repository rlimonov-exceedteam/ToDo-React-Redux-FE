import { useState } from 'react';
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import TaskInfoModal from '../../Modals/TaskInfoModal/TaskInfoModal';
import DeleteTaskModal from '../../Modals/DeleteTaskModal/DeleteTaskModal';
import UpdateTaskModal from '../../Modals/UpdateTaskModal/UpdateTaskModal';
import './Task.scss';

const Task = ({
    taskStage,
    task
}) => {
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
    const [isTaskInfoModalOpened, setIsTaskInfoModalOpened] = useState(false);
    const { taskName, _id } = task;

    return (
        <div className="task">
            <div 
                className="taskName" 
                onClick={() => setIsTaskInfoModalOpened(true)}
            >
                <h6>
                    {taskName}
                </h6>
            </div>
            <div className="icons">
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
            </div>
            {isDeleteModalOpened &&
                <DeleteTaskModal
                    setIsDeleteModalOpened={setIsDeleteModalOpened}
                    isDeleteModalOpened={isDeleteModalOpened}
                    _id={_id}
                />
            }
            {isUpdateModalOpened &&
                <UpdateTaskModal
                    setIsUpdateModalOpened={setIsUpdateModalOpened}
                    isUpdateModalOpened={isUpdateModalOpened}
                    task={task}
                />
            }
            {isTaskInfoModalOpened &&
                <TaskInfoModal 
                    setIsTaskInfoModalOpened={setIsTaskInfoModalOpened}
                    isTaskInfoModalOpened={isTaskInfoModalOpened}
                    task={task}
                />
            }
        </div>
    )
}

export default Task;