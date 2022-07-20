import "./Modal.css";

const Modal = (props) => {
  if (props.show) {
    return (
      <div className="modal">
        <section className="modal-main">
          {props.children}
          <button type="button" onClick={props.onCloseModal}>
            Close
          </button>
        </section>
      </div>
    );
  }
};

export default Modal;
