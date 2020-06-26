import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { connect } from 'react-redux';
import translations from '../translations';

const mapStateToProps = (state) => {
  return {
    debugBoxes: state.get('debugBoxes'),
  };
};

class ConnectedDebugBox extends React.Component {
  render () {
    const id = this.props.id;
    const debugBoxes = this.props.debugBoxes;
    const debugBoxObject = debugBoxes.get(id);

    // If debugBox doesn't exist in store, exit from component without returning any HTML
    if (typeof (debugBoxObject) === 'undefined') {
      return (false);
    }

    let title = id;
    if (id.indexOf('_') > 0) {
      // Id contains words separated by underscore - use only last word as title
      title = id.split('_').pop();
    }

    return (
      <OverlayTrigger
        placement="left"
        overlay={
          <Popover id={id}>
            <Popover.Title>
              {translations[title] + ' - ' + translations.debugBoxTitle}
            </Popover.Title>
            <Popover.Content>
              <table className="table debug-box-table mb-0">
                <thead>
                  {debugBoxObject.keySeq().map(key => (
                    <tr key={key} className={key === 'total' ? 'debug-box-table__total' : ''}>
                      <td>{translations[key]}</td>
                      <td>{debugBoxObject.get(key)}</td>
                    </tr>
                  ))}
                </thead>
              </table>
            </Popover.Content>
          </Popover>
        }
      >
        <div className="debug-box-overlay"></div>
      </OverlayTrigger>
    );
  }
}

const DebugBox = connect(mapStateToProps)(ConnectedDebugBox);

export default DebugBox;
