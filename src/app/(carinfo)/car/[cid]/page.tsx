import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function CarDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const carDetail = await getCar(params.cid);
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token)
  console.log(profile)
  return (
    <main className="h-screen bg-[#596176] flex justify-center items-center">
      {/* White background with 90% height, no scrolling */}
      <div className="bg-white rounded-lg w-full h-[85%] mx-6 my-6 shadow-lg overflow-hidden grid grid-cols-3">
        {/* Left side 30% with bg color F9FAFB */}
        <div className="bg-[#F4F4F4] col-span-1 relative flex justify-center items-center">
          <Image
            src={carDetail.data.picture}
            alt="Car Image"
            width={400} // Adjust the width of the image
            height={200} // Adjust the height of the image
            className="rounded-tl-lg object-contain"
          />
        </div>

        {/* Right side 70% for car details */}
        <div className="col-span-2 p-5 flex relative">
          {/* Vertical line on the right 20% */}
          <div className="absolute right-0 top-0 h-full w-[23%] border-l-[1px] border-[#CCCCCC]"></div>

          {/* Horizontal line a little lower than the middle and a bit to the right */}
          <div className="absolute top-[57%] right-[26.5%] w-[70%] border-t-[1px] border-[#CCCCCC]"></div>

          <div className="grid grid-cols-1 gap-x-4 text-left mx-5">
            <h1 className="text-lg font-medium mb-4">{carDetail.data.model}</h1>

            {/* Doors */}
            <div className="font-medium absolute top-[6%] left-[3%] text-4xl">
              {carDetail.data.brand}
            </div>

            {/* Seats */}
            <div className="font-medium absolute top-[32%] left-[9%] text-2xl">
              {carDetail.data.seat}
            </div>

            {/* Large Bags */}
            <div className="font-medium absolute top-[32%] left-[20%] text-2xl">
              2
            </div>

            {/* Daily Rate */}
            <div className="font-medium absolute top-[32%] left-[31%] text-2xl">
              4
            </div>

            {/* Daily Rate */}
            <div className="font-medium absolute top-[32%] left-[42%] text-2xl">
              {carDetail.data.gearType}
            </div>

            {/* Daily Rate */}
            <div className="font-medium absolute top-[32%] left-[61%] text-2xl">
              AC
            </div>

            {/* Small Bags */}
            <div className="font-medium absolute top-[71%] left-[79%] text-4xl">
              ฿{carDetail.data.price}
            </div>

            <div className="font-medium absolute top-[65%] left-[79%] text-xl">
              Haad Bali
            </div>

            <div className="font-medium absolute top-[79%] left-[79%] text-xl">
              1-Day
            </div>

            <div className="font-medium absolute top-[15%] left-[4%] text-2xl">
            Book now to receive the data
            </div>

            <div className="font-medium absolute top-[21%] left-[4%] text-2xl">
            about car size
            </div>

            <div className="font-medium absolute top-[42%] left-[9%] text-2xl">
            Your pick-up spot!
            </div>

            <div className="font-medium absolute top-[47%] left-[9%] text-2xl text-gray-500">
            {carDetail.data.pickupaddress}
            </div>

            {/* Rounded Rectangle (Adjustable Size and Position) */}
            <div
              className="absolute top-[10%] left-[63%] w-[170px] h-[40px] bg-[#CEE0DF] rounded-lg flex justify-center items-center text-center text-[#729394] text-2xl"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              Best Offer!
            </div>

            {/* Displaying images (user.png, shopping-bag.png, door-open.png, bolt-auto.png, snowflake.png) */}
            <div className="absolute top-[32%] left-[4%] flex gap-20">
              <Image
                src="/img/user.png"
                alt="User Icon"
                width={30}
                height={30}
                className="object-contain"
              />
              <Image
                src="/img/shopping-bag.png"
                alt="Shopping Bag Icon"
                width={30}
                height={30}
                className="object-contain"
              />
              <Image
                src="/img/door-open.png"
                alt="Door Open Icon"
                width={30}
                height={30}
                className="object-contain"
              />
              <Image
                src="/img/bolt-auto.png"
                alt="Bolt Auto Icon"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            <div className="absolute top-[32%] left-[57%]">
            <Image
                src="/img/snowflake.png"
                alt="Snowflake Icon"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            {/* Displaying images (user.png, shopping-bag.png, door-open.png, bolt-auto.png, snowflake.png) */}
            <div className="absolute top-[61%] left-[5%] flex gap-2">
              <Image
                src="/img/star.png"
                alt="Star"
                width={30}
                height={30}
                className="object-contain"
              />
              <Image
                src="/img/star.png"
                alt="Star"
                width={30}
                height={30}
                className="object-contain"
              />
              <Image
                src="/img/star.png"
                alt="Star"
                width={30}
                height={30}
                className="object-contain"
              />
              <Image
                src="/img/star.png"
                alt="Star"
                width={30}
                height={30}
                className="object-contain"
              />
              <Image
                src="/img/star.png"
                alt="Star"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            <div className="absolute top-[43%] left-[4%]">
            <Image
                src="/img/sigma.png"
                alt="Snowflake Icon"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>

            <div className="absolute top-[71%] left-[6%]">
            <Image
                src="/img/check.png"
                alt="Snowflake Icon"
                width={15}
                height={15}
                className="object-contain"
              />
            </div>
            <div className="font-medium absolute top-[70%] left-[9%] text-xl">
            Free Cancellation
            </div>

            <div className="absolute top-[78%] left-[6%]">
            <Image
                src="/img/check.png"
                alt="Snowflake Icon"
                width={15}
                height={15}
                className="object-contain"
              />
            </div>
            <div className="font-medium absolute top-[77%] left-[9%] text-xl">
            Same fuel policy
            </div>

            <div className="absolute top-[85%] left-[6%]">
            <Image
                src="/img/check.png"
                alt="Snowflake Icon"
                width={15}
                height={15}
                className="object-contain"
              />
            </div>
            <div className="font-medium absolute top-[84%] left-[9%] text-xl">
            Third-party liability coverage
            </div>

            <div className="absolute top-[71%] left-[43%]">
            <Image
                src="/img/check.png"
                alt="Snowflake Icon"
                width={15}
                height={15}
                className="object-contain"
              />
            </div>
            <div className="font-medium absolute top-[70%] left-[46%] text-xl">
            Unlimited mileage
            </div>

            <div className="absolute top-[78%] left-[43%]">
            <Image
                src="/img/check.png"
                alt="Snowflake Icon"
                width={15}
                height={15}
                className="object-contain"
              />
            </div>
            <div className="font-medium absolute top-[77%] left-[46%] text-xl">
            Basic insurance (CDW)
            </div>

            <div className="absolute top-[85%] left-[43%]">
            <Image
                src="/img/check.png"
                alt="Snowflake Icon"
                width={15}
                height={15}
                className="object-contain"
              />
            </div>
            <div className="font-medium absolute top-[84%] left-[46%] text-xl">
            Theft protection
            </div>

            {/* Make Booking button positioned at the bottom-right corner */}
            <Link href={`/booking?id=${params.cid}&brand=${carDetail.data.brand}&user=${profile.data._id}`} >
              <button
                className="absolute bottom-8 right-4 rounded-md bg-[#81313D] hover:bg-indigo-600 px-4 py-2 text-white text-2xl shadow-sm"
                name="Book Car"
              >
                Make Booking
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
