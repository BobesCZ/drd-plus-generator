import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import characterSheetPrintPageCount from '../helpers/characterSheetPrintPageCount';
import store from '../store/index';
import translations from '../translations';

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
  };
};

class ConnectedScreenExport extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    const target = event.target;
    const userFormat = target.getAttribute('data-format');
    const characterSheetEl = document.querySelector('.character-sheet');

    // Add class for printing styles (e.g. hide debug-boxes)
    characterSheetEl.classList.add('character-sheet--printing');

    // Render HTML to canvas and return a promise
    html2canvas(characterSheetEl).then(canvas => {
      // Create new PDF object
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: userFormat,
      });

      // Add image to PDF object
      doc.addImage(canvas, 'PNG', 5, 5);

      // Save file (file will be downloaded automatically)
      const charName = this.props.info.get('name');
      doc.save(`${charName}.pdf`);

      // Remove printing class
      characterSheetEl.classList.remove('character-sheet--printing');
    });
  }

  handleClickSave (event) {
    event.preventDefault();
    let target = event.target;

    // Target can be span with icon inside button
    if (target.nodeName !== 'BUTTON') {
      target = target.closest('button');
    }

    const userAction = target.value;

    if (userAction === 'SAVE' && window.localStorage) {
      let state = store.getState();

      // Set useSavedState - this will show saveModal component after reloading page
      state = state.setIn(['saveOptions', 'useSavedState'], true);
      state = state.setIn(['saveOptions', 'saveTimestamp'], Date.now());

      // Set the whole state to browser's localStorage
      localStorage.setItem('drdgenState', JSON.stringify(state));
    }
    else if (userAction === 'CLEAR') {
      localStorage.removeItem('drdgenState');
    }
    // Re-render this screen, because showClearButton in render method not depends on state
    this.forceUpdate();
  }

  render () {
    const pageCount = characterSheetPrintPageCount();
    const showPageCountAlert = pageCount > 1;
    const showClearButton = !!(window.localStorage && localStorage.getItem('drdgenState') && localStorage.getItem('drdgenState').length);

    return (
      <form>

        <Alert dismissible variant="success">
          <Alert.Heading>
            <i className="far fa-grin-beam"></i>
            {translations.exportAlertTitle}
          </Alert.Heading>
          <p className="mb-0">
            {translations.exportAlert}
          </p>
        </Alert>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.exportPanelHeader}
          </div>
          <div className="card-body">
            <p>
              {translations.exportPanelBody}
            </p>

            {showPageCountAlert &&
              <Alert dismissible variant="warning">
                <Alert.Heading>
                  <i className="fas fa-exclamation-triangle"></i>
                  {translations.pageCountAlertTitle}
                </Alert.Heading>
                <p>
                  {translations.pageCountAlert}
                </p>
              </Alert>
            }

            <button
              type="button"
              className="btn btn-success"
              data-format="a4"
              onClick={this.handleClick}
            >
              <i className="fas fa-download"></i>
              {translations.downloadFileA4}
            </button>

          </div>
        </div>

        <div className="card bg-light mb-4">
          <div className="card-header">
            {translations.savePanelHeader}
          </div>
          <div className="card-body">
            <p>
              {translations.savePanelBody}
            </p>

            <button
              type="button"
              className="btn btn-info mr-3"
              value="SAVE"
              onClick={this.handleClickSave}
            >
              <i className="fas fa-save"></i>
              {translations.saveCharacter}
            </button>

            {showClearButton &&
              <button
                type="button"
                className="btn btn-danger"
                value="CLEAR"
                onClick={this.handleClickSave}
              >
                <i className="fas fa-times"></i>
                {translations.clearCharacter}
              </button>
            }

          </div>
        </div>

      </form>
    );
  }
}

const ScreenExport = connect(mapStateToProps)(ConnectedScreenExport);

export default ScreenExport;
