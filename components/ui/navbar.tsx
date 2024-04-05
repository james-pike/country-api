import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


export default function NavbarHeader() {
  return (
    <Navbar isBordered className="bg-white py-2">
      <NavbarBrand>
        <p className="font-bold text-inherit ml-10 sm:ml-44">Country Population Density API</p>
      </NavbarBrand>
    </Navbar>
  );
}
