import React from "react";
import { connect } from "react-redux";
import OverlayTrigger  from 'react-bootstrap/lib/OverlayTrigger';
import Popover  from 'react-bootstrap/lib/Popover';
import translations from "../translations";

const mapStateToProps = (state) => {
  return {
    debugBoxes: state.get('debugBoxes'),
  };
};

class ConnectedDebugBox extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render(props) {
    let id = this.props.id
    let debugBoxes = this.props.debugBoxes
    let debugBoxObject = debugBoxes.get(id)

    // If debugBox doesn't exist in store, exit from component without returning any HTML
    if (typeof(debugBoxObject) === "undefined") {
      return(false);
    }

    return (
      <OverlayTrigger
        trigger="hover"
        placement="left"
        overlay={
          <Popover id={id} title={translations[id] + " - " + translations.debugBoxTitle}>
            <table className="table debug-box-table">
              <thead>
                {debugBoxObject.keySeq().map(key => (
                  <tr key={key} className={key === "total" ? "debug-box-table__total": ""}>
                    <td>{translations[key]}</td>
                    <td>{debugBoxObject.get(key)}</td>
                  </tr>
                ))}
              </thead>
            </table>
          </Popover>
        }
      >
        <div className="debug-box-overlay"></div>
      </OverlayTrigger>
    )

  }
}

const DebugBox = connect(mapStateToProps)(ConnectedDebugBox);

export default DebugBox;
