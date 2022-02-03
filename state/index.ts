import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from "reduxjs-toolkit-persist";
import storage from "./storage-persist";
import storageReducer from "./slices/storageSlice";

const persistConfig = {
	key: process.env.NEXT_PUBLIC_REDUX_PERSIST_STORAGE,
	storage: storage
};

const reducers = combineReducers({
	storage: storageReducer
});

const _persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: _persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				/* ignore persistance actions */
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}),
	devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production"
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
