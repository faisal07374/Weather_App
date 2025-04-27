import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather } from './weatherAPI'; 



export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city, { rejectWithValue }) => {
    try {
      const data = await getWeather(city); 
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to fetch weather';
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
