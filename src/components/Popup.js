import Popup from 'reactjs-popup';
import '../styles/Popup.css'
import List from './List';


const MyPopup = ({ open, data, title, closeModal, loading }) => {


  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={() => closeModal()}>
        {close => (
          <div className="modal">
            <button className="close" onClick={close} >
              &times;
            </button>
            <div className="header"> {title} </div>
            <div className="content">
              {
                !loading ? (Array.isArray(data) ? <List data={data} /> : <div>{data}</div>) : <div className='loading'></div>
              }
            </div>
            <div className="actions">
              {!Array.isArray(data) &&
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    close();
                  }}
                >
                  OK
                </button>
              }

            </div>
          </div>
        )}
      </Popup>
    </div>

  )
};

export default MyPopup;
