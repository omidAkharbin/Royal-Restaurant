import classes from "./Modal.module.css";
import {createPortal} from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeWindow} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// where to portal
const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop closeWindow={props.CloseModalWindow} />,
        portalElement
      )}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
