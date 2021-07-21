import { App } from './App';
import { View } from './components';
import { Model } from './model';

App.init(document.getElementById('root'), new Model(), View);
