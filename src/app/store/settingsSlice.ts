import { createSlice } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';
export type Locale = 'en' | 'ru';

export interface SettingsState {
  theme: Theme;
  locale: Locale;
  productsPageSize: number;
}

const initialState: SettingsState = {
  theme: 'light',
  locale: 'en',
  productsPageSize: 10,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: { payload: Theme }) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: { payload: Locale }) => {
      state.locale = action.payload;
    },
    setProductsPageSize: (state, action: { payload: number }) => {
      state.productsPageSize = action.payload;
    },
  },
});

export const { setTheme, setLocale, setProductsPageSize } = settingsSlice.actions;
export default settingsSlice.reducer;
