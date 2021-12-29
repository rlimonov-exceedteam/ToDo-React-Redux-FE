import { useState } from 'react';
import { Input, Button } from 'reactstrap';
import axios from 'axios';
import './Comment.scss';

const Comment = ({ comment, allComments, setAllComments }) => {
    const { author, date, commentText, _id } = comment;
    const [text, setText] = useState(commentText);
    const [isEditing, setIsEditing] = useState(false);

    const deleteComment = async () => {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteComment?_id=${_id}`)
        .then(() => {
            const newArray = allComments.filter(elem => elem._id !== _id);
            setAllComments([...newArray]);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const changeCommentText = async () => {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/changeCommentText`, {
            commentText: text,
            _id
        })
        .then(() => {
            const index = allComments.findIndex(elem => elem._id === _id);
            allComments[index].commentText = text;

            setAllComments([...allComments]);
            setIsEditing(false);
        })
    }

    const undo = () => {
        setText(commentText);
        setIsEditing(false);
    }

    return (
        <div className="comment-wrapper">
            <div className="avatar">
                <p>
                    {author[0].toUpperCase()}
                </p>
            </div>
            <div className="comment-info">
                <p className="comment-author">
                    {author}
                </p>
                {
                    isEditing
                    ? <div className="comment-input">
                        <Input 
                            value={text}
                            onChange={(e) => setText(e.currentTarget.value)}
                        />
                        <Button 
                            size="sm"
                            color="primary"
                            onClick={changeCommentText}
                        >
                            Save
                        </Button>
                        <Button 
                            size="sm" 
                            outline
                            onClick={undo}
                        >
                            Undo
                        </Button>
                      </div>
                    : <p className="comment-text">
                        {text}
                    </p>
                }
                <div className="comment-other">
                    <p className="comment-date">
                        Posted {date}
                    </p>
                    <p 
                        className="comment-action"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </p>
                    <p 
                        className="comment-action"
                        onClick={deleteComment}
                    >
                        Remove
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment;