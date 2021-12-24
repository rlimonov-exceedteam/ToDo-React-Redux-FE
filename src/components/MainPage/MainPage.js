import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import MainPageColumn from '../MainPageColumn/MainPageColumn';
import AddTaskModal from '../../Modals/AddTaskModal/AddTaskModal';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import axios from 'axios';
import './MainPage.scss';

const MainPage = ({ setIsAuth }) => {
    const [isAddModalOpened, setIsAddModalOpened] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const [alert, setAlert] = useState({ isOpen: false, text: '' });
    const { isOpen, text } = alert;

    useEffect(() => {
        const getTasks = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllTasks`, 
                {
                    withCredentials: true, 
                    credentials: 'include'
                })
                .then(result => {
                    setAllTasks(result.data);
                })
            } catch(e) {
                setAlert({
                    isOpen: true,
                    text: e.message,
                });
                setIsAuth(false);
                localStorage.clear();
            };
        }

        getTasks();
    }, []);

    const logout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/logout`, 
            {
                withCredentials: true, 
                credentials: 'include'
            })
            .then(() => {
                setIsAuth(false);
                localStorage.clear();
            })
        } catch(e) {
            setAlert({
                isOpen: true,
                text: e.message,
            });
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
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    tasks={allTasks.filter(elem => elem.stage === 1)}
                />
                <MainPageColumn 
                    name={'In progress'}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    tasks={allTasks.filter(elem => elem.stage === 2)}
                />
                <MainPageColumn 
                    name={'QA'}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    tasks={allTasks.filter(elem => elem.stage === 3)}
                />
                <MainPageColumn 
                    noRightArrow={true}
                    name={'Finished'}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    tasks={allTasks.filter(elem => elem.stage === 4)}
                />
            </div>
            {isAddModalOpened && <AddTaskModal 
                isAddModalOpened={isAddModalOpened}
                setIsAddModalOpened={setIsAddModalOpened}
                setAllTasks={setAllTasks}
                allTasks={allTasks}
            />
            }
            <ErrorAlert 
                text={text}
                isOpen={isOpen}
                setAlert={setAlert}
            />
        </div>
    )
}

export default MainPage;