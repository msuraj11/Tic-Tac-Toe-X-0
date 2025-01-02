import {isMobile} from '../helpers';
import Modal from './Modal';

export default function Warning({
  handleModalClicks,
  freshGame,
  handleGameBoardChoice
}) {
  let modalContent;
  if (freshGame) {
    modalContent = (
      <>
        <p>Please choose Game Board you wish to start a game:</p>
        <ul>
          <li>
            <button name="3" onClick={handleGameBoardChoice}>
              3 X 3
            </button>
          </li>
          <li>
            <button name="4" onClick={handleGameBoardChoice}>
              4 X 4
            </button>
          </li>
          {!isMobile() && (
            <li>
              <button name="5" onClick={handleGameBoardChoice}>
                5 X 5
              </button>
            </li>
          )}
        </ul>
        {isMobile() && (
          <small>
            Wanna have more fun playing this game with more bigger board? Try on
            bigger screens 😉
          </small>
        )}
      </>
    );
  } else {
    modalContent = (
      <>
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
      </>
    );
  }
  return <Modal>{modalContent}</Modal>;
}
