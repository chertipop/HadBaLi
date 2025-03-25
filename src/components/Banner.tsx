'use client'
import styles from './banner.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {

    const router = useRouter();
    const [index,setState] = useState(0);
    const bannerList = ["/img/1.png",'/img/2.png','/img/3.png']

    const {data:session} = useSession()
    console.log(session?.user.token)

    return (
        <div className={styles.banner} onClick={()=>{setState(index+1)}}>
            <Image src = {bannerList[index%3]} 
            alt = 'cover'
            fill = {true}
            priority
            objectFit='cover'
            />
            <button className="absolute bottom-5 right-5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-lg shadow-md transition z-50" onClick={(e)=>{e.stopPropagation(),router.push('/car')}}>Select Car</button>
        </div>
    )
} 