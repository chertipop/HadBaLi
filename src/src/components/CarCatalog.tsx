import Link from "next/link";
import Card from "./Card";
import { CarItem, CarsJson } from "../../interface";

export default async function CarCatalog({ carsJson }: { carsJson: CarsJson }) {
  const carsJsonReady = await carsJson;

  return (
    <>
      <h1 className="text-xl font-bold text-center my-4">
        Select Your Car In Our Catalog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {carsJsonReady.data.map((CarItem: CarItem) => (
          <Link
            key={CarItem.id}
            href={`/car/${CarItem.id}`}
            className="block"
          >
            <Card carName={CarItem.brand} imgSrc={CarItem.picture} />
          </Link>
        ))}
      </div>
    </>
  );
}
