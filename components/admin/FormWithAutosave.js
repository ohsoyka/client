import React from 'react';

class FormWithAutosave extends React.Component {
  componentDidMount() {
    this.loadAutosavedData();
  }

  loadAutosavedData() {
    if (this.state.autosavedDataLoaded) {
      return;
    }

    const autosavedData = global.localStorage.getItem(this.state.autosaveId);

    if (autosavedData) {
      this.setState({ ...JSON.parse(autosavedData), autosavedDataLoaded: true });
    }
  }

  clearAutosavedData() {
    global.localStorage.removeItem(this.state.autosaveId);
  }

  updateFormData(props) {
    this.setState(props, () => {
      global.localStorage.setItem(this.state.autosaveId, JSON.stringify(this.state));
    });
  }
}

export default FormWithAutosave;
