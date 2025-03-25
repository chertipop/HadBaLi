import { StringExpression } from "mongoose"

export interface ReservationItem {
  carId: string
  carModel: string;
  pickupdate: string;
  returndate: string;
}

// must edit

export interface CarItem {
  _id: string,
  brand: string,
  seat: string,
  gearType: string,
  price: string,
  pickupaddress: string,
  picture: string,
  __v: number,
  id: string
}

export interface CarsJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CarItem[]
}

export  interface BookingItem {
  nameLastname: string;
  tel: string;
  car: string;
  pickupdate: string;
  returndate: string;
}