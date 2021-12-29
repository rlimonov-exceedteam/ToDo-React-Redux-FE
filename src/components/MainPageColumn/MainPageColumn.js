import { useState } from 'react';
import { Button } from 'reactstrap';
import Task from '../Task/Task';
import './MainPageColumn.scss';

const MainPageColumn = ({ 
    noRightArrow,
    noLeftArrow,
    tasks, 
    name 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        return setIsExpanded(!isExpanded);
    }
    return (
        <div className="mainpage-column">
            <div className="column-head">
                <h3>
                    {name}
                </h3>
                <Button 
                    bssize="sm"
                    color="primary"
                    onClick={toggleExpanded}
                >
                    {
                        isExpanded
                        ? 'unexpand'
                        : 'expand'
                    }
                </Button>
            </div>
            <div className={`${isExpanded && 'expanded'} tasks`}>
                {
                    tasks && tasks.map((task, i) => 
                    <Task 
                        noRightArrow={noRightArrow}
                        noLeftArrow={noLeftArrow}
                        taskStage={task.stage}
                        key={task._id}
                        task={task}
                    />
                )}
            </div>
        </div>
    )
}

export default MainPageColumn;