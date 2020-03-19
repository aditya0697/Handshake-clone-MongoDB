import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage: storage,
    // blacklist: ['auth']
  };

 
const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer,compose(
  applyMiddleware(...middleware)
  // , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
const persistor = persistStore(store);
// export default store;
// export default persistor;
export default  {store, persistor};