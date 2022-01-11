import {
    ModalFooter,
    ModalHeader,
    Button,
    Modal
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { deleteTaskMiddleware } from '../../redux/slices/taskSlice';

const DeleteTaskModal = ({ setIsDeleteModalOpened, isDeleteModalOpened, _id }) => {
    const dispatch = useDispatch();

    const deleteTask = async () => {
        dispatch(deleteTaskMiddleware(_id))
        .then(() => {
            setIsDeleteModalOpened(false);
        })
        .catch(e => {
            dispatch(setAlert(e.message));
        });
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