import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Layout from './Containers/Layout/Layout';
import Survey from './Containers/Survey/Survey';
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>

            <Survey>
              
            </Survey>

          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
