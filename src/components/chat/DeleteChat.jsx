import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../FormContainer";
import { delete_Chat } from "../../actions/chatActions";
import { CHAT_LIST_RESET, CHAT_RESET } from "../../types/chatConstants";
import { MESSAGE_RESET } from "../../types/messageConstants";

const DeleteChat = ({ chatid, token }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(delete_Chat(chatid, token));
    handleClose();
    dispatch({ type: CHAT_RESET });
    dispatch({ type: MESSAGE_RESET });
    dispatch({ type: CHAT_LIST_RESET });
    navigate("/chatScreen");
  };

  return (
    <>
      <Button
        variant="light"
        className="text-danger"
        style={{ width: "100%", height: "auto", fontSize: "17px" }}
        onClick={handleShow}
      >
        Delete Chat
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title className="text-white">Delete Chat </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <Form className="mt-2 mb-2">
              <Form.Group controlId="name">
                <Form.Label>
                  Doing this will delete all messages with the seller...
                </Form.Label>
              </Form.Group>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitHandler} variant="primary" className="ms-2">
            Delete
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteChat;
