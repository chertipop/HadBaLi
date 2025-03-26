import { useEffect, useState } from "react";
import { removeReservation, editReservation } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

// Mock provider data (Replace with a real API if needed)
const providerInfo: Record<string, { address: string; tel: string }> = {
  "Tahto Naju": {
    address: "9/11 ถนนติดสาว ตำบลติดใจ อำเภอติดเธอ นครปฎม 73000",
    tel: "0866199541",
  },
  "WataruEndo": {
    address: "555/69 ถนนหงส์แดง ตำบลได้แชมป์ อำเภอเมือง ขอนแก่น 40000",
    tel: "0914194651",
  },
  "MaxSiraphop": {
    address: "333/20 ถนนยามาล ตำบลเรโพ อำเภออีโก้ สมุทรปราการ 10270",
    tel: "0777777777",
  },
};

// Server-side fetching session and user profile
export async function getServerSideProps(context: any) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) {
    return {
      notFound: true,
    };
  }

  const profile = await getUserProfile(session.user.token);

  return {
    props: {
      profile: profile.data,
    },
  };
}

export default function ReservationCart({ profile }: { profile: any }) {
  const router = useRouter();
  const carItems = useAppSelector((state) => state.cartSlice.carItems);
  const dispatch = useDispatch<AppDispatch>();

  const [isMounted, setIsMounted] = useState(false);

  // Track hydration status to prevent SSR mismatch
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <p>Loading...</p>;

  const cars = [
    { id: "67e17d4be504b1d67e36a083", model: "Toyota Yaris" },
    { id: "67e18705e504b1d67e36a0cb", model: "Toyota Fortuner" },
    { id: "67e187d4e504b1d67e36a0d8", model: "Toyota Altis" },
    { id: "67e188dce504b1d67e36a0e5", model: "Honda Civic" },
    { id: "67e18a2fe504b1d67e36a0fc", model: "Mitsubishi Outlander" },
    { id: "67e18b8fe504b1d67e36a102", model: "Nissan Navara King Cab" },
  ];

  // Find car model by ID
  const getCarModel = (carId: string) => {
    const car = cars.find((c) => c.id === carId);
    return car ? car.model : "Unknown Model"; // If not found, return "Unknown Model"
  };

  return (
    <>
      {carItems.map((reservationItem) => {
        return (
          <div
            className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
            key={reservationItem.car}
          >
            <div className="text-xl font-semibold">
              {getCarModel(reservationItem.car)}
            </div>
            <div className="text-sm">
              <span className="font-medium">Pick-up:</span> {reservationItem.pickupdate}
            </div>
            <div className="text-sm">
              <span className="font-medium">Return:</span> {reservationItem.returndate}
            </div>

            {/* Edit Button */}
            <button
              className="mt-2 block rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white shadow-sm"
              onClick={() => {
                dispatch(
                  editReservation({
                    oldItem: reservationItem,
                    newItem: { ...reservationItem },
                  })
                );
                const queryParams = new URLSearchParams({
                  cid: reservationItem.car,
                  brand: getCarModel(reservationItem.car),
                  user: profile?._id ?? "", // Ensure _id exists, or use a fallback value like an empty string
                }).toString();
                router.push(`/booking/edit?${queryParams}`);
              }}
            >
              Edit Reservation
            </button>

            {/* Remove Button */}
            <button
              className="mt-2 block rounded-md bg-red-600 hover:bg-red-700 px-3 py-1 text-white shadow-sm"
              onClick={() => dispatch(removeReservation(reservationItem))}
            >
              Remove from Cart
            </button>
          </div>
        );
      })}
    </>
  );
}
