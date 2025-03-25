import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReservationItem } from '../../../interface';
import dayjs from 'dayjs';  // Import dayjs for date calculations

type CartState = {
  carItems: ReservationItem[];
};

const initialState: CartState = { carItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      if (state.carItems.length < 3) {
        state.carItems.push(action.payload);
      } else {
        alert("Hey! You can only add up to 3 cars to the cart.");
      }
    },

    removeReservation: (state, action: PayloadAction<ReservationItem>) => {
      const remainItems = state.carItems.filter(obj => {
        return (
          obj.carModel !== action.payload.carModel ||
          obj.pickupdate !== action.payload.pickupdate ||
          obj.returndate !== action.payload.returndate
        );
      });
      state.carItems = remainItems;
    },
    editReservation: (state, action: PayloadAction<{ oldItem: ReservationItem; newItem: Partial<ReservationItem> }>) => {
      const { oldItem, newItem } = action.payload;

      const existingItem = state.carItems.find(obj =>
        obj.carModel === oldItem.carModel &&
        obj.carId === oldItem.carId
      );

      if (existingItem) {
        // Update the item with the new data
        Object.assign(existingItem, newItem);

        // Recalculate the duration if either pickupDate or returnDate has changed
        if (newItem.pickupdate || newItem.returndate) {
          const newPickupDate = newItem.pickupdate ? dayjs(newItem.pickupdate) : dayjs(existingItem.pickupdate);
          const newReturnDate = newItem.returndate ? dayjs(newItem.returndate) : dayjs(existingItem.returndate);

          // Recalculate duration
        }
        
      } else {
        console.warn("editReservation: Reservation not found!", oldItem);
      }
    }
  }
});

export const { addReservation, removeReservation, editReservation } = cartSlice.actions;
export default cartSlice.reducer;
