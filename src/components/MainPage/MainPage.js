import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { fetchInitialTasks, updateStageMiddleware } from '../../redux/slices/taskSlice';
import { denyAccess } from '../../redux/slices/isAuthSlice';
import { DragDropContext } from 'react-beautiful-dnd';
import MainPageColumn from '../MainPageColumn/MainPageColumn';
import AddTaskModal from '../../Modals/AddTaskModal/AddTaskModal';
import axios from 'axios';
import './MainPage.scss';

const MainPage = () => {
    const [isAddModalOpened, setIsAddModalOpened] = useState(false);
    const allTasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    const updateColumns = () => [
        {
            columnId: '0',
            name: 'Tasks',
            tasks: allTasks.filter(elem => elem.stage === 1),
        },
        {
            columnId: '1',
            name: 'In progress',
            tasks: allTasks.filter(elem => elem.stage === 2),
        },
        {
            columnId: '2',
            name: 'QA',
            tasks: allTasks.filter(elem => elem.stage === 3),
        },
        {
            columnId: '3',
            name: 'Finished',
            tasks: allTasks.filter(elem => elem.stage === 4),
        },
    ];

    const [columns, setColumns] = useState(updateColumns());

    useEffect(() => {
        const getAllTasks = async () => {
            try {
                dispatch(fetchInitialTasks());
            } catch (e) {
                dispatch(setAlert(e.message));
                dispatch(denyAccess());
                localStorage.clear();
            };
        }

        getAllTasks();
        setColumns(updateColumns());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setColumns(updateColumns())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTasks]);

    const logout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout`,
                {
                    withCredentials: true,
                    credentials: 'include'
                })
                .then(() => {
                    dispatch(denyAccess());
                    localStorage.clear();
                })
        } catch (e) {
            dispatch(setAlert(e.message));
        };
    }

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const items = Array.from(columns);
            const [reorderedItem] = items[source.droppableId].tasks.splice(source.index, 1);
            items[source.droppableId].tasks.splice(destination.index, 0, reorderedItem);
            setColumns(items);

        } else {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.tasks];
            const destItems = [...destColumn.tasks];
            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);
            const newArr = [...columns];
            newArr[destination.droppableId] = { ...destColumn, tasks: destItems };
            newArr[source.droppableId] = { ...sourceColumn, tasks: sourceItems };

            setColumns([
                ...newArr
            ]);

            dispatch(updateStageMiddleware({ stage: Number(destination.droppableId) + 1, _id: draggableId }))
        }
    }

    return (
        <div className="mainpage-wrapper">
            <div className="header-wrapper">
                <h1>
                    To-Do list
                </h1>
                <Button
                    color="secondary"
                    bssize="lg"
                    onClick={logout}
                >
                    Log out
                </Button>
            </div>
            <Button
                color="primary"
                bssize="lg"
                onClick={() => setIsAddModalOpened(true)}
            >
                Add new task
            </Button>
            <div className="mainpage-columns-wrapper">
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {columns.map(({ noLeftArrow, columnId, noRightArrow, name, tasks }, i) => {
                        return (

                            <div className="mainpage-column">
                                <MainPageColumn
                                    columnId={columnId}
                                    name={name}
                                    i={i}
                                    tasks={tasks}
                                    key={columnId}
                                />
                            </div>
                        )
                    })}
                </DragDropContext>

            </div>
            {
                isAddModalOpened &&
                <AddTaskModal
                    isAddModalOpened={isAddModalOpened}
                    setIsAddModalOpened={setIsAddModalOpened}
                />
            }
        </div>
    )
}

export default MainPage;