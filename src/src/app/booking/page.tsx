"use client";

import DateReserve from "@/components/DateReserve";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ReservationItem } from "../../../interface";
import { addReservation } from "@/redux/features/cartSlice";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";

export default function Booking() {
    const router = useRouter();
    const [form, setForm] = useState<{
        pickupDate: Dayjs | null;
        returnDate: Dayjs | null;
    }>({
        pickupDate: null,
        returnDate: null,
    });
    const [message, setMessage] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    const updateFormField = (field: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        console.log("pickupDate changed: ", form.pickupDate?.format("YYYY-MM-DD") ?? "NULL");
        console.log("returnDate changed: ", form.returnDate?.format("YYYY-MM-DD") ?? "NULL");
    }, [form]);

    const urlParams = useSearchParams();
    const cid = urlParams.get('id');
    const userId = urlParams.get('user');

    const createBooking = async () => {
        // Check if required fields are filled
        if (!form.pickupDate || !form.returnDate) {
            setMessage("Please fill in all required fields.");
            return;
        }

        if(!cid||!userId){
            alert("Please fill in all required fields.")
            return;
        }

        const reservationItem: ReservationItem = {
            user: userId, // Replace with actual userId
            car: cid, // Replace with actual carId
            pickupdate: form.pickupDate.format("YYYY/MM/DD"),
            returndate: form.returnDate.format("YYYY/MM/DD"),
        };

        dispatch(addReservation(reservationItem));

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/car_id/reservations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservationItem),
            });

            if (!response.ok) throw new Error("Failed to create reservation.");

            setMessage("Your booking has been successfully created!");
            setTimeout(() => router.push("/"), 500); // Redirect after successful booking
        } catch (error) {
            setMessage("Your booking has been successfully created!");
        }
    };

    return (
        <main className="w-full flex flex-col items-center space-y-4 bg-[#F9F3EF] min-h-screen">
            <div className="text-xl font-medium">Car Booking</div>

            <DateReserve 
                onPickupDateChange={(date : Dayjs) => updateFormField("pickupDate", date)} 
                onReturnDateChange={(date : Dayjs) => updateFormField("returnDate", date)} 
            />

            <button
                name="Book Car"
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={createBooking}
            >
                Book Car
            </button>

            {message && (
                <p className={`text-center mt-2 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </main>
    );
}
