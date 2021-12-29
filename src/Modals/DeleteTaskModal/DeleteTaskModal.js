import {
    ModalFooter,
    ModalHeader,
    Button,
    Modal
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { deleteTaskFromStore } from '../../redux/slices/taskSlice';
import axios from 'axios';

const DeleteTaskModal = ({ setIsDeleteModalOpened, isDeleteModalOpened, _id }) => {
    const dispatch = useDispatch();

    const deleteTask = async () => {
        const token = localStorage.getItem('token');

        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteTask?_id=${_id}`, {
            headers: {
                token
            }
        })
            .then(() => {
                dispatch(deleteTaskFromStore(_id));
                setIsDeleteModalOpened(false);
            })
            .catch(e => {
                dispatch(setAlert(e.message));
            })
    }

    return (
        <div>
            <Modal
                isOpen={isDeleteModalOpened}
                centered
                bssize=""
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
                    <Button onClick={() => setIsDeleteModalOpened(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default DeleteTaskModal;