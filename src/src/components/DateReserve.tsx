import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

export default function DateReserve({ onPickupDateChange, onReturnDateChange }: 
    { onPickupDateChange: Function, onReturnDateChange: Function}) {

    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

    // Ensure parent component receives the updated values
    useEffect(() => {
        onPickupDateChange(pickupDate);
        onReturnDateChange(returnDate);
    }, [pickupDate, returnDate]); // Run whenever date values change

    return (
        <div className="bg-slate-100 rounded-lg space-y-4 w-fit p-5 flex flex-col justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Pickup Date"
                    value={pickupDate}
                    onChange={(value) => setPickupDate(value)}
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Return Date"
                    value={returnDate}
                    onChange={(value) => setReturnDate(value)}
                />
            </LocalizationProvider>
        </div>
    );
}
