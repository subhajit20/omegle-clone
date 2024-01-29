import React from "react";
import { BarIcon, SunIcon, MoonIcon } from "@/icons";

type Props = {};

const Drawer = (props: Props) => {
  return (
    <React.Fragment>
      <div className="block md:hidden">
        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
        <label htmlFor="drawer-left" className="btn">
          <BarIcon />
        </label>
        <div className="drawer">
          <div className="drawer-content pt-10 flex flex-col h-full">
            <label
              htmlFor="drawer-left"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </label>
            <div>
              <h2 className="text-xl font-medium text-white">Menu</h2>
              <div className="options grid grid-cols-1 gap-y-10 justify-start py-3">
                <p>
                  <MoonIcon />
                </p>
              </div>
            </div>
            <div className="h-full flex flex-row justify-end items-end gap-2"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Drawer;
