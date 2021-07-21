import 'normalize.css';
//
import './style.scss';
import { App } from './App';
import { View } from './components';
import { Model } from './model';
import { getLevelsData } from './levels';

App.init(document.getElementById('root'), new Model(getLevelsData()), View);
