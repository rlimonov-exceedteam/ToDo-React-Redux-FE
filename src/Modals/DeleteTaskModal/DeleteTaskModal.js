import { useState } from 'react';
import {
    ModalFooter,
    ModalHeader,
    Button,
    Modal
} from 'reactstrap';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import axios from 'axios';

const DeleteTaskModal = ({
    setIsDeleteModalOpened,
    isDeleteModalOpened,
    setAllTasks,
    allTasks,
    _id
}) => {
    const [alert, setAlert] = useState({ isOpen: false, text: '' });
    const { isOpen, text } = alert;

    const deleteTask = async () => {
        const token = localStorage.getItem('token');

        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteTask?_id=${_id}`, {
            headers: {
                token
            }
        })
        .then(() => {
            const newArray = allTasks.filter(elem => elem._id !== _id);
            setAllTasks([...newArray]);
            setIsDeleteModalOpened(false);
        })
        .catch(e => {
            setAlert({
                text: e.message,
                isOpen: true
              });
        })
    }

    return (
        <div>
            <Modal
                isOpen={isDeleteModalOpened}
                centered
                size=""
                toggle={() => setIsDeleteModalOpened(false)}
            >
                <ModalHeader>
                    Do you really want to delete this task?
                </ModalHeader>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={deleteTask}
                    >
                        Delete
                    </Button>
                    {' '}
                    <Button onClick={() => setIsDeleteModalOpened(false)}>
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

export default DeleteTaskModal;