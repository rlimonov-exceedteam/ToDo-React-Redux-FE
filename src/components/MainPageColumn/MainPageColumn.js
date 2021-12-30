import { useState } from 'react';
import { Button } from 'reactstrap';
import Task from '../Task/Task';
import { Draggable } from 'react-beautiful-dnd';
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
        <>
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
                {tasks && tasks.map((task, i) => {
                    return (
                        <Draggable key={task._id} draggableId={task._id} index={i}>
                            {(provided, snapshot) => {
                                return (
                                    <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        userSelect: "none",
                                        padding: 0.1,
                                        backgroundColor: snapshot.isDragging
                                          ? "lightgrey"
                                          : "white",
                                        color: "black",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                        <Task 
                                            noRightArrow={noRightArrow}
                                            noLeftArrow={noLeftArrow}
                                            taskStage={task.stage}
                                            key={task._id}
                                            task={task}
                                        />
                                    </div>
                                );
                            }}
                        </Draggable>
                    );
                })}
            </div>
        </>
    )
}

export default MainPageColumn;