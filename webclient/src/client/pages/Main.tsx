import React from "react";
import { Footer } from "../components/Footer";
import { useAppContext } from "../Context";
import { config } from "../constants";
import dayjs from "dayjs";

const Main = () => {
  const { name, setName } = useAppContext();
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <div className="flex items-center flex-col pt-10">
        <h1 className="font-bold text-gray-900 text-5xl lg:text-7xl text-center ">
          {config.CTF_TITLE ? `${config.CTF_TITLE}` : "Example CTF"}
        </h1>
        <h2 className={"pt-5 items-center flex align-middle text-center min-w-[320px]"}>
          {config.CTF_DESCRIPTION ? `${config.CTF_DESCRIPTION}` : "Example description"}
        </h2>
        <h2 className={"pt-5 items-center flex align-middle text-center min-w-[320px]"}>
          {config.CTF_RULE ? `${config.CTF_RULE}` : "Example rule"}
        </h2>
        <h2 className={"pt-5 items-center flex align-middle text-center min-w-[320px]"}>
          {config.CTF_START_TIME && config.CTF_END_TIME ? `${dayjs(config.CTF_START_TIME).format('YYYY/MM/DD HH:mm')} - ${dayjs(config.CTF_END_TIME).format('YYYY/MM/DD HH:mm')} (JST)` : "Example date"}
        </h2>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
