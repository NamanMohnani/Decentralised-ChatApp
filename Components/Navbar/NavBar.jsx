import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";

const NavBar = () => {
  const menu_items = [
    { menu: "All users", link: "alluser" },
    { menu: "CHAT", link: "/" },
    { menu: "CONTACT", link: "/" },
    { menu: "SETTING", link: "/" },
    { menu: "FAQS", link: "/" },
    { menu: "TERMS OF USE", link: "/" },
  ];

  // useState
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connect_wallet } = useContext(ChatAppContext);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <h1> logo </h1>
        </div>
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_menu}>
            {menu_items.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_button : ""
                }}`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  {" "}
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>

          {/* mobile */}
          {open && (
            <div className={Style.NavBar_box_right_menu}>
              {menu_items.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_button : ""
                  }}`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {" "}
                    {el.menu}
                  </Link>
                </div>
              ))}

              <p className={Style.mobile_menu_button}>
                <h1 onClick={() => setOpen(false)} />
              </p>
            </div>
          )}

          {/* connect wallet ! */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connect_wallet()}>
                connect to metamask
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <small>{userName || "create account"}</small>
              </button>
            )}
          </div>

          <div className={Style.NavBar_box_right_open}>
            <h1>open </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
