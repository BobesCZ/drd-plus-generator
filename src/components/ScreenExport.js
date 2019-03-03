import React from "react";
import { connect } from "react-redux";
import translations from "../translations";
import characterSheetPrintPageCount  from '../helpers/characterSheetPrintPageCount';
import Alert  from 'react-bootstrap/lib/Alert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const mapDispatchToProps = dispatch => {
  return {
    // setBackground: item => dispatch(setBackground(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    info: state.getIn(['character', 'info']),
  };
};

class ConnectedScreenExport extends React.Component {
  constructor(props) {
    super();
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const target = event.target;

    let userFormat = target.getAttribute('data-format');
    let characterSheetEl = document.querySelector(".character-sheet")

    // Add class for printing styles (e.g. hide debug-boxes)
    characterSheetEl.classList.add("character-sheet--printing")

    // Render HTML to canvas and return a promise
    html2canvas(characterSheetEl).then(canvas => {

      // Create new PDF object
      var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: userFormat,
      })

      // Add image to PDF object
      doc.addImage(canvas, 'PNG', 5, 5);

      // Save file (file will be downloaded automatically)
      let charName = this.props.info.get("name");
      doc.save(`${charName}.pdf`)

      // Remove printing class
      characterSheetEl.classList.remove("character-sheet--printing")

    });

  }

  render(props) {
    let pageCount = characterSheetPrintPageCount()
    let showPageCountAlert = pageCount > 1 ? true : false

    return (
      <form>

        <Alert dismissible variant="success">
          <Alert.Heading>
            <i className="far fa-grin-beam"></i>
            {translations.exportAlertTitle}
          </Alert.Heading>
          <p>
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
              &nbsp; {translations.downloadFileA4}
            </button>

          </div>
        </div>

      </form>
    )

  }
}

const ScreenExport = connect(mapStateToProps, mapDispatchToProps)(ConnectedScreenExport);

export default ScreenExport;
