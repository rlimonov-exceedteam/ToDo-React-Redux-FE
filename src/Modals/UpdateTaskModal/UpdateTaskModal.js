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
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import axios from 'axios';

const UpdateTaskModal = ({
    setIsUpdateModalOpened,
    isUpdateModalOpened,
    setTaskText,
    setAllTasks,
    allTasks,
    task
}) => {
    const { taskText, _id } = task;

    const [modalTaskText, setModalTaskText] = useState(taskText);
    const [alert, setAlert] = useState({ isOpen: false, text: '' });
    const { isOpen, text } = alert;

    const updateTaskText = async () => {
        const token = localStorage.getItem('token');

        await axios.patch(`http://localhost:8000/updateTask`, {
            taskText: modalTaskText,
            _id
        }, {
            headers: { 
                token 
            }
        })
        .then(() => {
            allTasks.map(elem => {
                if(elem._id === _id) {
                    elem.taskText = modalTaskText;
                }
            });

            setAllTasks([...allTasks]);
            setIsUpdateModalOpened(false);
        })
        .catch(e => {
            setAlert({
                text: e.message,
                opened: true
            });
        });
    }

    return (
        <div>
            <Modal
                isOpen={isUpdateModalOpened}
                centered
                fullscreen="lg"
                size=""
                toggle={() => setIsUpdateModalOpened(false)}
            >
                <ModalHeader toggle={() => setIsUpdateModalOpened(false)}>
                    Update a task
                </ModalHeader>
                <ModalBody>
                    <Label for="exampleText">
                        Edit the description
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        value={modalTaskText}
                        onChange={(e) => setModalTaskText(e.currentTarget.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => updateTaskText()}
                    >
                        Submit
                    </Button>
                    {' '}
                    <Button onClick={() => setIsUpdateModalOpened(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <ErrorAlert
                text={text}
                isOpen={isOpen}
                setAlert={setAlert}
            />
        </div>
    )
}

export default UpdateTaskModal;