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
import { useDispatch } from 'react-redux';
import { addTaskToStore } from '../../redux/slices/taskSlice';
import axios from 'axios';

const AddTaskModal = ({ setIsAddModalOpened, isAddModalOpened, }) => {
    const dispatch = useDispatch();
    const [taskText, setTaskText] = useState('');
    const [taskName, setTaskName] = useState('');

    const addTask = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/createNewTask`, {
            taskText,
            taskName,
            stage: 1,
        }, {
            withCredentials: true,
            credentials: 'include'
        }).then(result => {
            dispatch(addTaskToStore(result.data));
            setTaskText('');
            setIsAddModalOpened(false);
        })
    }

    return (
        <div>
            <Modal
                isOpen={isAddModalOpened}
                centered
                bssize=""
                toggle={() => setIsAddModalOpened(false)}
            >
                <ModalHeader toggle={() => setIsAddModalOpened(false)}>
                    Add new task
                </ModalHeader>
                <ModalBody>
                    <Label for="printName">
                        Name a task
                    </Label>
                    <Input
                        id="printName"
                        name="printName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.currentTarget.value)}
                    />
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