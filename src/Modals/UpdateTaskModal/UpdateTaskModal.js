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
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { updateTaskTextInStore } from '../../redux/slices/taskSlice';
import axios from 'axios';

const UpdateTaskModal = ({
    setIsUpdateModalOpened,
    isUpdateModalOpened,
    task
}) => {
    const { taskText, _id } = task;
    const dispatch = useDispatch();

    const [modalTaskText, setModalTaskText] = useState(taskText);

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
            dispatch(updateTaskTextInStore({ taskText: modalTaskText, _id }));
            setIsUpdateModalOpened(false);
        })
        .catch(e => {
            dispatch(setAlert(e.message));
        });
    }

    return (
        <div>
            <Modal
                isOpen={isUpdateModalOpened}
                centered
                bssize=""
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
        </div>
    )
}

export default UpdateTaskModal;