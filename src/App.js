import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import CSVReader from 'react-csv-reader';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialData: {},
      filterOneDisplayed: 'none',
      filterOneContent: [],
      filterTwoDisplayed: 'none',
      filterTwoContent: [],
      answerDisplayed: 'none',
      answerContent: []
    };
  }

  initiateData = data => {
    this.setState({ initialData: Array.from(data).slice(0, -1) });
    this.handleFilterOne();
  };

  handleFilterOne = () => {
    let data = this.state.initialData;
    this.setState({
      filterOneContent: data[0].slice(1),
      filterOneDisplayed: 'inline'
    });
  };

  handleFilterOneClick = fieldName => {
    let data = this.state.initialData;
    let selectedData = [];
    let i = data[0].indexOf(fieldName);

    data = data.slice(1);

    data.forEach(element => {
      selectedData.push(element[i]);
    });

    this.setState({
      filterTwoContent: Array.from(new Set(selectedData)),
      filterTwoDisplayed: 'inline',
      selectedFieldIndex: i
    });
  };

  handleFilterTwoClick = valueName => {
    let answers = [];
    let data = this.state.initialData.slice(1);
    let i = this.state.selectedFieldIndex;

    data.forEach(element => {
      if (element[i] === valueName) {
        answers.push(element[0]);
      }
    });

    let randomItem = answers[Math.floor(Math.random() * answers.length)];
    this.setState({
      answerContent: randomItem,
      answerDisplayed: 'inline'
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div
            style={{
              width: '70%',
              height: '100%',
              margin: '0 auto',
              border: '0.5px solid black',
              borderRadius: '10px',
              borderColor: '#d6d3c9',
              padding: '10px'
            }}
          >
            <div className='d-flex flex-column h-100 '>
              <div className='flex-fill box'>
                <CSVReader onFileLoaded={data => this.initiateData(data)} />
              </div>
              <div
                className='flex-fill box'
                style={{ display: this.state.filterOneDisplayed }}
              >
                <h5>What field do you want to filter by?</h5>
                {this.state.filterOneContent.map((current, index) => {
                  return (
                    <Button
                      variant='primary'
                      key={index}
                      style={{ margin: '10px' }}
                      onClick={() => this.handleFilterOneClick(current)}
                    >
                      {current}
                    </Button>
                  );
                })}
              </div>
              <div
                className='flex-fill box'
                style={{ display: this.state.filterTwoDisplayed }}
              >
                <h5>Select What value you want to filter on?</h5>
                {this.state.filterTwoContent.map((current, index) => {
                  return (
                    <Button
                      variant='primary'
                      key={index}
                      style={{ margin: '10px' }}
                      onClick={() => this.handleFilterTwoClick(current)}
                    >
                      {current}
                    </Button>
                  );
                })}
              </div>
              <div
                className='flex-fill box'
                style={{ display: this.state.answerDisplayed }}
              >
                <Button variant='success' style={{ margin: '10px' }}>
                  {this.state.answerContent}
                </Button>

                <p>Refresh to select again!</p>
                <Button
                  variant='danger'
                  style={{ margin: '20px' }}
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
