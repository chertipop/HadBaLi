"use client";

import DateReserve from "@/components/DateReserve";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interface";
import dayjs, { Dayjs } from "dayjs";
import { addReservation } from "@/redux/features/cartSlice";
import { useSearchParams } from "next/navigation";

export default function Booking() {
    const urlParams = useSearchParams();
    const cid = urlParams.get("id");
    const brand = urlParams.get("brand");
    const userId = urlParams.get("user");
    const dispatch = useDispatch<AppDispatch>();

    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

    // Log changes to pickupDate and returnDate
    useEffect(() => {
        console.log("pickupDate changed: ", pickupDate);
        console.log("returnDate changed: ", returnDate);
    }, [pickupDate, returnDate]);

    // Create booking function that handles API call
    const createBooking = async () => {
        // Log values before validation
        // console.log("Creating booking...");
        // console.log("cid: ", cid);
        // console.log("user: ", userId);
        // console.log("pickupDate: ", pickupDate);
        // console.log("returnDate: ", returnDate);

        if (!cid || !userId || !pickupDate || !returnDate) {
            alert("Please fill in all required fields.");
            return;
        }

        const reservationItem: ReservationItem = {
            user: userId,
            car: cid,
            pickupdate: dayjs(pickupDate).format("YYYY/MM/DD"),
            returndate: dayjs(returnDate).format("YYYY/MM/DD"),
        };

       
        dispatch(addReservation(reservationItem));

        try {
            // Make API call to create the reservation
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/v1/cars/${cid}/reservations`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: userId,
                        pickupdate: reservationItem.pickupdate,
                        returndate: reservationItem.returndate,
                    }),
                }
            );

            console.log(response);


            if (!response.ok) {
                throw new Error("Failed to create reservation.");
            }

            // Handle successful booking
            const data = await response.json();
            alert("Your booking has been successfully created!");
            console.log(data); // Optionally log the response from the backend
        } catch (error) {
            alert(`Error`);
        }
    };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 bg-[#F9F3EF] min-h-screen">
            <div className="text-xl font-medium">Car Booking</div>
            {brand && <div className="text-xl font-medium">Car {brand}</div>}

            <DateReserve
                onPickupDateChange={(value: Dayjs) => setPickupDate(value)}
                onReturnDateChange={(value: Dayjs) => setReturnDate(value)}
            />

            <button
                name="Book Car"
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={createBooking}
            >
                Book Car
            </button>
        </main>
    );
}
