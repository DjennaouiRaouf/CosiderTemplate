import * as React from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux-Toolkit/Store/Store";
import {closeMessageToast} from "../Redux-Toolkit/Slices/MessageToastSlice";

type MessageToastProps = {
  //
};

const MessageToast: React.FC<any> = () => {
    const dispatch = useDispatch();
    const {  show,titre,message, color ,icon} = useSelector((state: RootState) => state.messageToast);
    const handleCloseToast = () => {
      dispatch(closeMessageToast())
    }
  return (
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast onClose={handleCloseToast} show={show}  autohide={true} delay={3000}>
          <Toast.Header closeButton={false}>
            <strong className="me-auto" >{titre}</strong>
          </Toast.Header>
          <Toast.Body>
            <p className="text-start" style={{ color: color }}>
              <i
                  className={icon}
                  style={{ marginRight: 10 }}
              />
              {message}
            </p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
  );
};

export default MessageToast;
