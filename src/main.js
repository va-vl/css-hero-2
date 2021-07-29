import 'normalize.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'highlight.js/scss/androidstudio.scss';

//
import './style.scss';
import { App } from './App';
import { Model } from './model';
import { store } from './store';

App.init(document.getElementById('root'), new Model(store));
