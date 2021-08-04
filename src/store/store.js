import { MyRedux, MyThunk } from '@lib';
import { levelReducer } from './levels/reducer';
import { setPersistentState } from './store.service';

const store = MyRedux.createStore({
  reducer: levelReducer,
  middleware: MyRedux.applyMiddleware(MyThunk),
});

store.subscribe(() => {
  setPersistentState(store.getState());
});

export { store };
