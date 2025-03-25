"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem } from "@mui/material"
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"

export default function DateReserve({onPickupDateChange, onReturnDateChange}:
        {onPickupDateChange:Function,onReturnDateChange:Function}
){
        const [pickupDate,setPickupDate] = useState<Dayjs|null>(null)
        const [returnDate,setReturnDate] = useState<Dayjs|null>(null)
        const [car,setCar] = useState('Toyota Yaris')

        return (
                <div className="bg-slate-100 rounded-lg space-x-5
                space-y-2 w-fit p-10 flex flex-col justify-center">

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker className="bg-white"
                        value={pickupDate}
                        onChange={(value)=>{onPickupDateChange(value)}}
                        />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker className="bg-white"
                        value={returnDate}
                        onChange={(value)=>{onReturnDateChange(value)}}
                        />
                        </LocalizationProvider>

                </div>
        );
}