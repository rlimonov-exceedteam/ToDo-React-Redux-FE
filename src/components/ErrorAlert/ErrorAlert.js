import { Alert } from 'reactstrap';
import './ErrorAlert.scss';

const ErrorAlert = ({ isOpen, text, setAlert }) => {
    return (
        <div className="alert-wrapper">
            <Alert
                isOpen={isOpen}
                color="danger"
                toggle={() => setAlert({ isOpen: false, text })}
            >
                {text}
            </Alert>
        </div>
    )
}

export default ErrorAlert;