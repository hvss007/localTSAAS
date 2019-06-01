import React, { Component } from 'react';
import './App.css';
import Layout from './Containers/Layout/Layout';
import Survey from './Containers/Survey/Survey';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Survey>
            
          </Survey>
        </Layout>

      </div>
    );
  }
}

export default App;
