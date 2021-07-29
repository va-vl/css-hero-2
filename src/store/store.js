import { MyRedux, MyThunk } from '@lib';
import { levelReducer } from './levels/levels.reducer';
import { getPersistentState, setPersistentState } from './store.service';

const store = MyRedux.createStore({
  reducer: levelReducer,
  middleware: MyRedux.applyMiddleware(MyThunk),
  preloader: getPersistentState,
});

store.subscribe(() => {
  setPersistentState(store.getState());
});

export { store };
