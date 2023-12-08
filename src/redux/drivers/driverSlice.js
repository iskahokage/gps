import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, getData } from '../../helpers/api';

// Создаем асинхронный thunk для загрузки списка пользователей
export const fetchDrivers = createAsyncThunk('users/fetchDrivers', async () => {
  const data = await getData('/main_app/driver/');
  return data;
});
// Создаем slice для хранения состояния пользователей
const driverSlice = createSlice({
  name: 'drivers',
  initialState: {
    drivers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default driverSlice.reducer;