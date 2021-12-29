import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import MainPageColumn from '../MainPageColumn/MainPageColumn';
import AddTaskModal from '../../Modals/AddTaskModal/AddTaskModal';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { addInitialTasks } from '../../redux/slices/taskSlice';
import { denyAccess } from '../../redux/slices/isAuthSlice';
import axios from 'axios';
import './MainPage.scss';

const MainPage = () => {
    const [isAddModalOpened, setIsAddModalOpened] = useState(false);
    const allTasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllTasks = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllTasks`, 
                {
                    withCredentials: true, 
                    credentials: 'include'
                })
                .then(result => {
                    dispatch(addInitialTasks(result.data));
                })
            } catch(e) {
                dispatch(setAlert(e.message));
                dispatch(denyAccess());
                localStorage.clear();
            };
        }

        getAllTasks();
    }, []);

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
        } catch(e) {
            dispatch(setAlert(e.message));
        };
    }
    
    return (
        <div className="mainpage-wrapper">
            <div className="header-wrapper">
                <h1>
                    To-Do list
                </h1>
                <Button
                    color="secondary"
                    size="lg"
                    onClick={logout}
                >
                    Log out
                </Button>
            </div>
            <Button
                color="primary"
                size="lg"
                onClick={() => setIsAddModalOpened(true)}
            >
                Add new task
            </Button>
            <div className="mainpage-columns-wrapper">
                <MainPageColumn 
                    noLeftArrow={true}
                    name={'Tasks'}
                    tasks={allTasks.filter(elem => elem.stage === 1)}
                />
                <MainPageColumn 
                    name={'In progress'}
                    tasks={allTasks.filter(elem => elem.stage === 2)}
                />
                <MainPageColumn 
                    name={'QA'}
                    tasks={allTasks.filter(elem => elem.stage === 3)}
                />
                <MainPageColumn 
                    noRightArrow={true}
                    name={'Finished'}
                    tasks={allTasks.filter(elem => elem.stage === 4)}
                />
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