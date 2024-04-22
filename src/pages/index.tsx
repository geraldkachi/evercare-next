import React, { useState } from 'react';
import { useRouter } from "next/router";

type DashboardProps = {}

const Home: React.FC<DashboardProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  return (
    <>
      {loading ? <div className="h-screen flex flex-col items-center justify-center mx-auto text-center">Loading ...</div> : (

        <div className="h-screen flex flex-col items-center justify-center mx-auto">
          <img src="logo.svg" alt="logo" className="w-56 h-28" />

          <div className="max-w-[622px] bg-white mx-auto p-3 sm:p-12 flex flex-col items-center justify-center">
            <img src="Sun and cloud.svg" alt="sun" />
            <div className="text-[#001D4E] text-2xl font-bold text-center">
              Welcome to Evercare selfcare
            </div>

            <div className="text-center text-base md:text-lg font-normal leading-6 my-4">
              A modern approach to priotitizing your self care and wellness. <br />
              We have designed a wellness-based form that is a proactive step towards helping you understand your health needs. 
              <br />
              <br className="mt-2" />
              Thank you for choosing Evercare Hospital Lekki.
            </div>
            <button onClick={() => {
              setLoading(true);
              router.push('/getting-started')
            }} className="rounded-lg bg-[#002355] text-white py-2 px-4 md:px-14 text-center text-base font-normal leading-6 my-5" type="button">Let&apos;s get started</button>
          </div>
        </div>
      )}
    </>
  )
};

export default Home;
