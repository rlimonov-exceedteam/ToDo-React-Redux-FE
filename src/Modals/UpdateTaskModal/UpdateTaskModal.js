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

        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/updateTask`, {
            taskText: modalTaskText,
            _id
        }, {
            headers: { 
                token 
            }
        })
        .then(() => {
            const index = allTasks.findIndex(elem => elem._id === _id);
            allTasks[index].taskText = modalTaskText;

            setAllTasks([...allTasks]);
            setIsUpdateModalOpened(false);
        })
        .catch(e => {
            setAlert({
                text: e.message,
                isOpen: true
            });
        });
    }

    return (
        <div>
            <Modal
                isOpen={isUpdateModalOpened}
                centered
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
                        onClick={updateTaskText}
                    >
                        Submit
                    </Button>
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