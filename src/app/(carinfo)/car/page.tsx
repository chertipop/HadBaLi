import getCars from "@/libs/getCars";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CarCatalog from "@/components/CarCatalog";
// import CardPanel from "@/components/CardPanel";

export default async function Car() {
  const carsPromise = await getCars();
  return (
    <main className="text-center p-10 bg-[#F9F3EF]">
      <h1 className="text-4xl font-medium">Select your car</h1>
      <Suspense fallback={ <p> Loading...  <LinearProgress /> </p> } >
        <CarCatalog carsJson={carsPromise} />
      </Suspense>
      {/* <hr className="my-10" />
      <h1 className="text-xl font-medium">TRY Client-dise Car Panel</h1>
      <CardPanel /> */}
    </main>
  );
}
