import { removeAlert } from '../../redux/slices/errorAlertSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'reactstrap';
import './ErrorAlert.scss';

const ErrorAlert = () => {
    const { isOpened, text } = useSelector(state => state.errorAlert.alertData);
    const dispatch = useDispatch();

    return (
        <div className="alert-wrapper">
            <Alert
                isOpen={isOpened}
                color="danger"
                toggle={() => dispatch(removeAlert())}
            >
                {text}
            </Alert>
        </div>
    )
}

export default ErrorAlert;