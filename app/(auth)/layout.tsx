import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-[#9a6efe] p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[1000px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 text-6xl font-bold text-white">
              Droply
            </div>
          </div>

          <div className="space-y-5 text-[#E6D9FF] mt-6">
            <h3 className="h3">Take Control of Your Files</h3>
            <p className="body-1">
              Droply is your all-in-one hub to store, manage, and access every
              document — effortlessly and securely.
            </p>
          </div>

          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 text-6xl font-bold text-[#9a6efe]">
              Droply
            </div>
            <Image
              src="/assets/images/files.png"
              alt="Files"
              width={150}
              height={150}
              className="rounded-full border-2 border-[#9a6efe] p-2"
            />
          </div>
        </div>

        {children}
      </section>
    </div>
  );
};

export default Layout;
