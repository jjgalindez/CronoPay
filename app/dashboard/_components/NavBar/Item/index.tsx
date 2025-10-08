"use client";

import Link from "next/link";
import { MenuNavBarItem } from "../../../../_interfaces";

type Props = {
  item: MenuNavBarItem;
  onRouteChange: () => void;
};

export default function NavBarItem({ item, onRouteChange }: Props) {
  return (
    <Link
      href={item.href || "#"}
      target={item.target}
      onClick={onRouteChange}
      className="px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2"
    >
      {item.icon && <span>{/* Aquí podrías poner un Icon nuevo si quieres */}</span>}
      <span>{item.label}</span>
    </Link>
  );
}