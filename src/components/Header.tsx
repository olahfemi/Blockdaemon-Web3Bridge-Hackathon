import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ConnectionButton from "./ConnectionButton";

interface NavBartItemProps {
  title?: string;
  classprops?: string;
  src?: HTMLImageElement;
}

const MobileNavBarItem: React.FC<NavBartItemProps> = ({
  title,
  classprops,
}) => (
  <li
    className={`hover:bg-primary py-5 rounded-lg text-xl cursor-pointer ${classprops}`}
  >
    {title}
  </li>
);

const Header: React.FC<NavBartItemProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="static">
        <div className="w-full h-20 md:h-24 py-4 bg-darj text-white_variant flex justify-between items-center">
          <div className="lg:w-[55%] w-[50%]">
            <Link to={"/"}>
              <h1 className="text-white_variant text-2xl md:text-3xl leading-7 font-semibold">
                Synergy <br /> Portfolio Tracker
              </h1>
            </Link>
          </div>
          <div className="lg:w-[15%] w-[15%] hidden md:block text-xl font-medium">
            <Link to="/tracker">Tracker</Link>
          </div>
          <div className="lg:w-[15%] w-[15%] hidden md:block text-xl font-medium ml-4">
            <Link to="/explorer">Explorer</Link>
          </div>
          <div className="lg:w-[30%] w-[35%] md:flex justify-end hidden">
            <ConnectionButton />
            {/* <ActionButton title="Connect Wallet" setAction={handleConnnectWallet} /> */}
          </div>

          <div className="md:hidden">
            <AiOutlineMenu
              className="cursor-pointer"
              size={"24px"}
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        {isOpen && (
          <Fragment>
            <div className="z-50 p-4 bg-dark_variant text-white md:hidden absolute top-0 right-0 w-full sm:w-[70%] h-[100vh]">
              <AiOutlineClose
                size={"28px"}
                className="cursor-pointer absolute right-4"
                onClick={() => setIsOpen(false)}
              />
              <ul className="pt-14 text-center">
                <Link to={"/tracker"}>
                  <MobileNavBarItem title="Tracker" />
                </Link>

                <Link to={"/explorer"}>
                  <MobileNavBarItem title="Explorer" />
                </Link>

                <div className="flex justify-center items-center mt-4">
                <ConnectionButton />

                </div>
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Header;
