import { createSlice } from "@reduxjs/toolkit";

const initialState: TStorage[] | null = null;

const storageSlice = createSlice({
	name: "storage",
	initialState: initialState,
	reducers: {
		updateStorage(state, action) {
			const data = action.payload;

			return data;
		}
	}
});

export const { updateStorage } = storageSlice.actions;
export default storageSlice.reducer;
