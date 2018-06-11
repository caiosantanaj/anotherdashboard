import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/now-ui-dashboard.css';
import './assets/css/demo.css';

import Dashboard from './layouts/Dashboard/Dashboard.jsx';

const hist = createBrowserHistory();

ReactDOM.render(
    <Dashboard/>
, document.getElementById('root'));
