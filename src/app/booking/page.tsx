"use client"

import DateReserve from "@/components/DateReserve";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interface";
import dayjs, { Dayjs } from "dayjs";
import { addReservation } from "@/redux/features/cartSlice";
import { useSearchParams } from "next/navigation";
import CarCatalog from "@/components/CarCatalog";
import Car from "../(carinfo)/car/page";
import Card from "@/components/Card";
import { userAgent } from "next/server";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Select, MenuItem } from "@mui/material";
import ProviderReserve from "@/components/ProviderReserve";

export default function Booking() {


    const urlParams = useSearchParams()
    const cid =urlParams.get('id')
    const brand = urlParams.get('brand')
    const user = urlParams.get('user')
    const dispatch = useDispatch<AppDispatch>()

    const [pickupDate, setPickupDate] = useState<Dayjs|null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>("Bangkok")
    const [returnDate, setReturnDate] = useState<Dayjs|null>(null)
    const [returnLocation, setReturnLocation] = useState<string>("Bangkok")
    const [pickupProvider,setProvider] = useState<string>("Tahto Naju")
    const [car, setCar] = useState<string>("Toyota Yaris");
    

    const makeReservation=()=>{
        if(cid && brand && pickupDate && returnDate){
            const item:ReservationItem={
                carId:cid,
                carModel:brand,
                pickupdate: dayjs(pickupDate).format("YYYY/MM/DD"),
                returndate: dayjs(returnDate).format("YYYY/MM/DD"),
            }
            dispatch(addReservation(item));
        } else {
            alert("Please fill in all required fields.");
        }
    }
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 bg-[#F9F3EF] min-h-screen">
            <div className="text-xl font-medium">Car Booking</div>
            {brand ? <div className="text-xl font-medium">Car {brand}</div> : null}
    
            <DateReserve
                onPickupDateChange={(value: Dayjs) => setPickupDate(value)}
                onReturnDateChange={(value: Dayjs) => setReturnDate(value)}
                onLocationChange={(value: string) => setCar(value)}
            />
    
            <button
                name="Book Car"
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={makeReservation}
            >
                Book Car
            </button>
        </main>
    );    

}