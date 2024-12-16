import Modal from "./Modal";

export default function Warning({ handleModalClicks }) {
  return (
    <Modal>
      <p>Are you sure you want to rematch?</p>
      <ul>
        <li>
          <button name="yes" onClick={handleModalClicks}>
            Yes
          </button>
        </li>
        <li>
          <button name="no" onClick={handleModalClicks}>
            No
          </button>
        </li>
      </ul>
    </Modal>
  );
}
