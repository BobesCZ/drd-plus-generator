import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import setSaveOption from '../actions/setSaveOption';
import translations from '../translations';

const mapDispatchToProps = dispatch => {
  return {
    setSaveOption: item => dispatch(setSaveOption(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
    saveOptions: state.get('saveOptions'),
  };
};

class ConnectedSaveModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose (event) {
    this.props.setSaveOption({ key: 'useSavedState', value: false });
  }

  handleClear (event) {
    localStorage.removeItem('drdgenState');
    location.reload();
  }

  render (props) {
    const showModal = this.props.saveOptions.get('useSavedState');
    const saveTimestamp = this.props.saveOptions.get('saveTimestamp');
    let saveDatetime = new Date(saveTimestamp);
    saveDatetime = saveTimestamp === 0 ? '' : saveDatetime.toLocaleString();
    const charName = this.props.info.get('name');

    return (
      <Modal show={showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {translations.saveModalTitle}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            {translations.saveModalText1}
            <strong> {charName} </strong>
            {translations.saveModalText2}
            <strong> {saveDatetime} </strong>
          </p>
          <p className="mb-0">
            {translations.saveModalText3} {translations.screenExport}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClear}>
            <i className="fas fa-times"></i>
            {translations.saveModalButtonClear}
          </Button>

          <Button variant="success" onClick={this.handleClose}>
            {translations.saveModalButtonOk}
          </Button>
        </Modal.Footer>
      </Modal>

    );
  }
}

const SaveModal = connect(mapStateToProps, mapDispatchToProps)(ConnectedSaveModal);

export default SaveModal;
