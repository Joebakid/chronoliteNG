import React from "react";

function Header({ Btn }) {
  return (
    <div className="  bg-slate-400    text-white font-bold flex items-center justify-center flex-col  h-screen">
      <div className="text-center ">
        <div className="container-custom  bg-black  flex flex-col gap-10 p-10 rounded-lg ">
          <h1 className="text-red-50 mb-4 uppercase underline">DarkMode</h1>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            tempora, placeat corrupti quia, delectus ipsum illum voluptate
            libero nulla quis beatae pariatur cum minus porro nobis quae
            aspernatur? Fuga, dignissimos.
          </p>
          <Btn
            text="Sign up"
            href="https://cloud.google.com/"
            btnClassName="btn"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
