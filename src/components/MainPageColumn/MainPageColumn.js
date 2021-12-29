import Task from '../Task/Task';
import './MainPageColumn.scss';

const MainPageColumn = ({ 
    noRightArrow,
    noLeftArrow,
    setAllTasks,
    allTasks,
    tasks, 
    name 
}) => {
    return (
        <div className="mainpage-column">
            <h3>{name}</h3>
            {
                tasks && tasks.map((task, i) => 
                <Task 
                    noRightArrow={noRightArrow}
                    noLeftArrow={noLeftArrow}
                    setAllTasks={setAllTasks}
                    taskStage={task.stage}
                    allTasks={allTasks}
                    task={task}
                    key={i}
                />
            )}
        </div>
    )
}

export default MainPageColumn;