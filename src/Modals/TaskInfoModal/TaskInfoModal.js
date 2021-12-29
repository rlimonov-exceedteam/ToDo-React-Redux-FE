import { useState, useEffect } from 'react';
import {
    ModalFooter,
    ModalHeader,
    ModalBody,
    Button,
    Input,
    Modal,
    Label
} from 'reactstrap';
import Comment from '../../components/Comment/Comment';
import axios from 'axios';
import './TaskInfoModal.scss';

const TaskInfoModal = ({
    setIsTaskInfoModalOpened,
    isTaskInfoModalOpened,
    task
}) => {
    const [commentText, setCommentText] = useState('');
    const [commentOpened, setCommentOpened] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const { taskText, taskName, _id } = task;

    useEffect(() => {
        const getComments = async () => {
          await axios.get(`${process.env.REACT_APP_SERVER_URL}/getTaskComments?taskId=${_id}`)
          .then(result => {
            setAllComments(result.data);
          })
        }

        getComments();
    }, []);

    const handleComment = () => {
      const addComment = async () => {
        const currDate = new Date();

        const getDate = (date) => {
          return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }

        await axios
          .post(`${process.env.REACT_APP_SERVER_URL}/addComment`, {
            commentText,
            taskId: _id,
            date: getDate(currDate)
          })
          .then((result) => {
            setAllComments([...allComments, result.data]);
            setCommentText("");
            setCommentOpened(false);
          });
      };

      commentOpened ? addComment() : setCommentOpened(true);
    }

    const undoComment = () => {
      setCommentText('');
      setCommentOpened(false);
    }

    return (
      <div>
        <Modal
          isOpen={isTaskInfoModalOpened}
          fullscreen="md"
          size=""
          toggle={() => setIsTaskInfoModalOpened(false)}
        >
          <ModalHeader toggle={() => setIsTaskInfoModalOpened(false)}>
            {taskName}
          </ModalHeader>
          <ModalBody>
            <Label>
              Description:
            </Label>
            <p className="taskText">
                {taskText}
            </p>
            <div 
                className={
                    commentOpened 
                    ? 'commentOpened'
                    : 'commentClosed'
                }
            >
              <Input
                type="textarea"
                value={commentText}
                onChange={(e) => setCommentText(e.currentTarget.value)}
              />
            </div>
            <div className="buttons">
                <Button 
                  color="primary" 
                  size="sm" 
                  onClick={handleComment}
                >
                    {
                        commentOpened
                        ? 'Save'
                        : 'Add a comment'
                    }
                </Button>
                {
                  commentOpened && 
                  <Button 
                    color="secondary" 
                    size="sm" 
                    onClick={undoComment}
                  >
                      Undo
                  </Button>
                }
            </div>
            <div className="comments">
                {allComments && allComments.map(comment =>  
                    <Comment 
                        key={comment._id}
                        comment={comment}
                        allComments={allComments}
                        setAllComments={setAllComments}
                    />
                )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsTaskInfoModalOpened(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

export default TaskInfoModal;