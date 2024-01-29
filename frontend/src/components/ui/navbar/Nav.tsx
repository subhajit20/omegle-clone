"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import SunIcon from "@/icons/SunIcon";
import MoonIcon from "@/icons/MoonIcon";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { selectTheme } from "@/features/theme/themeSlice";
import { setDark, setLigth } from "@/features/theme/themeSlice";

function Nav() {
  const { dark, light } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const changeThemeDark = () => {
    dispatch(setDark());
  };

  const changeThemeLight = () => {
    dispatch(setLigth());
  };

  return (
    <div className="navbar">
      <div className="navbar-start">
        <Link className="navbar-item" href={"/"}>
          Omegle Clone
        </Link>
      </div>
      <div className="navbar-end text-white">
        <Link className="navbar-item" href={"/"}>
          {dark && <SunIcon click={changeThemeLight} />}
          {light && <MoonIcon click={changeThemeDark} />}
        </Link>
        <Link className="navbar-item" href={"/"}>
          Home
        </Link>
      </div>
    </div>
  );
}

export default Nav;
