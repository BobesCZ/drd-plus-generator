import React from 'react';
import CharacterSheet from './CharacterSheet';
import Navigation from './Navigation';
import SaveModal from './SaveModal';
import ScreenSection from './ScreenSection';
import StepNavigation from './StepNavigation';

class Layout extends React.Component {
  render () {
    return (
      <div className="container">

        <h1>DrDGen+</h1>

        <SaveModal />

        {/* Navigation part (forms etc) */}
        <Navigation />

        <div className="row mb-5">
          <div className="col-lg-6">
            {/* Interaction part (forms etc) */}
            <ScreenSection />
            <StepNavigation />
          </div>

          <div className="col-lg-6">
            {/* Printing part (character sheet) */}
            <CharacterSheet />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
