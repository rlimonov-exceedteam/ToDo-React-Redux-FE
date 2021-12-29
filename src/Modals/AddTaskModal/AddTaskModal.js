import { useState } from 'react';
import {
    ModalFooter,
    ModalHeader,
    ModalBody,
    Button,
    Input,
    Modal,
    Label
} from 'reactstrap';
import axios from 'axios';

const AddTaskModal = ({
    setIsAddModalOpened,
    isAddModalOpened,
    setAllTasks,
    allTasks
}) => {
    const [taskText, setTaskText] = useState('');

    const addTask = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/createNewTask`, {
            taskText,
            stage: 1,
        }, {
            withCredentials: true, 
            credentials: 'include'
        }).then(result => {
            setAllTasks([...allTasks, result.data])
            setTaskText('');
            setIsAddModalOpened(false);
        })
    }

    return (
        <div>
            <Modal
                isOpen={isAddModalOpened}
                centered
                size=""
                toggle={() => setIsAddModalOpened(false)}
            >
                <ModalHeader toggle={() => setIsAddModalOpened(false)}>
                    Add new task
                </ModalHeader>
                <ModalBody>
                    <Label for="exampleText">
                        Print a description
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        value={taskText}
                        onChange={(e) => setTaskText(e.currentTarget.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={addTask}
                    >
                        Submit
                    </Button>
                    <Button onClick={() => setIsAddModalOpened(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddTaskModal;