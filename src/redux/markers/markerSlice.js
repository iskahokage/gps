import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, getData } from '../../helpers/api';

// Создаем асинхронный thunk для загрузки списка пользователей
export const fetchMarkers = createAsyncThunk('users/fetchMarkers', async () => {
  const data = await getData('/backoffice/gis/');
  return data;
});
export const fetchMarkerById = createAsyncThunk('markers/fetchMarkerById', async (markerId) => {
  const data = await getData(`/backoffice/gis/${markerId}`);
  return data;
});
// Создаем slice для хранения состояния пользователей
const markerSlice = createSlice({
  name: 'markers',
  initialState: {
    markers: [],
    selectedMarker: null, 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarkers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.markers = action.payload;
      })
      .addCase(fetchMarkers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMarkerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarkerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMarker = action.payload;
      })
      .addCase(fetchMarkerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default markerSlice.reducer;