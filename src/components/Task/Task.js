import { useState } from 'react';
import {
    BsArrowRight,
    BsArrowLeft,
    BsFillPencilFill,
    BsTrashFill
} from "react-icons/bs";
import { updateStageInStore } from '../../redux/slices/taskSlice';
import TaskInfoModal from '../../Modals/TaskInfoModal/TaskInfoModal';
import DeleteTaskModal from '../../Modals/DeleteTaskModal/DeleteTaskModal';
import UpdateTaskModal from '../../Modals/UpdateTaskModal/UpdateTaskModal';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Task.scss';

const Task = ({
    noRightArrow,
    noLeftArrow,
    taskStage,
    task
}) => {
    const dispatch = useDispatch();

    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
    const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
    const [isTaskInfoModalOpened, setIsTaskInfoModalOpened] = useState(false);
    const { taskName, _id } = task;

    const changeTaskStage = async (direction) => {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/changeTaskStage`, {
            stage: direction === 'left' ? --taskStage : ++taskStage,
            _id
        })
        .then(() => {
            dispatch(updateStageInStore({ stage: taskStage, _id }));
        });
    }

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