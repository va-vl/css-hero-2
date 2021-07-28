import 'normalize.css';
//
import './style.scss';
import { App } from './App';
import { store } from './store';

App.init(document.getElementById('root'), store);
