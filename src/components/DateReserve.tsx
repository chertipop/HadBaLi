"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem } from "@mui/material"
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"

export default function DateReserve({onPickupDateChange, onReturnDateChange, onLocationChange}:
        {onPickupDateChange:Function,onReturnDateChange:Function,onLocationChange:Function}
){
        const [pickupDate,setPickupDate] = useState<Dayjs|null>(null)
        const [returnDate,setReturnDate] = useState<Dayjs|null>(null)
        const [car,setCar] = useState('Toyota Yaris')

        return (
                <div className="bg-slate-100 rounded-lg space-x-5
                space-y-2 w-fit p-10 flex flex-col justify-center">

                <TextField id="Name-Lastname" label="Name-Lastname" variant="standard" name=" Name-Lastname"
                InputProps={{classes: { input: "MuiInput-input" },}}/>

                <TextField id="Contact-Number" label="Contact-Number" variant="standard" name="Contact-Number"
                InputProps={{classes: { input: "MuiInput-input" },}}/>

                        <Select variant="standard" name="car" id="car"
                        value={car}
                        onChange={(e,value)=>{onLocationChange(e.target.value);setCar(e.target.value)}}
                        className="h-[2em] w-[200px]">
                                <MenuItem value="Toyota Yaris">Toyota Yaris</MenuItem>
                                <MenuItem value="Nissan Navara King Cab">Nissan Navara King Cab</MenuItem>
                                <MenuItem value="Mitsubishi Outlander">Mitsubishi Outlander</MenuItem>
                                <MenuItem value="Honda Civic">Honda Civic</MenuItem>
                                <MenuItem value="Toyota Altis">Toyota Altis</MenuItem>
                                <MenuItem value="Toyota Fortuner">Toyota Fortuner</MenuItem>
                        </Select>

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