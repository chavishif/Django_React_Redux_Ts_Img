import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';
import { IImage } from '../../models/gallery';
import { getimages, addimages, delimages, updimages } from './galleryAPI';



export interface GalleryState {
  images: IImage[];
  refreshflag : boolean
 
}

const initialState: GalleryState = {
  images: [],
  refreshflag: true

};

export const getimagesAsync = createAsyncThunk(
  'gallery/getimages',
 
  async () => {
   
    const response = await getimages();
    return response.data;
  }
);
export const addimagesAsync = createAsyncThunk(
  'gallery/addimages',
  async (newimage:any) => {
    const response = await addimages(newimage);

    return response.data;
  }
);

export const delimagesAsync = createAsyncThunk(
  'gallery/delimages',
  async (id: any) => {
    const response = await delimages(id);
    return response.data;
  }
);

export const updimagesAsync = createAsyncThunk(
  'gallery/updimages',
  async (updimage: any) => {
    const response = await updimages(updimage);
    // console.log(response)
    return response.data;
  }
);
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getimagesAsync.fulfilled, (state, action) => {
       
        state.images = action.payload
        console.log(state.images )
      })
      .addCase(addimagesAsync.fulfilled, (state, action) => {
       
        state.images.push( action.payload)
        // console.log(action.payload )
        state.refreshflag = ! state.refreshflag
   
      })
      .addCase(delimagesAsync.fulfilled, (state, action) => {
        state.images.filter(img=> action.payload !== img.id)
        console.log(state.images)
        state.refreshflag = ! state.refreshflag

      })
      .addCase(updimagesAsync.fulfilled, (state, action) => {
        state.refreshflag = ! state.refreshflag
     

      });
      
  },
});

export const {  } = gallerySlice.actions;
export const selectImages = (state: RootState) => state.gallery.images;
export const selectRefresh = (state: RootState) => state.gallery.refreshflag;
export default gallerySlice.reducer;
