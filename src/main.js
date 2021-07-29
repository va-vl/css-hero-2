import 'normalize.css';
//
import './style.scss';
import { App } from './App';
import { Model } from './model';
import { store } from './store';

App.init(document.getElementById('root'), new Model(store));
