import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type ServiceProp = {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  desc?: string;
  slug: string;
  count?: string | number;
};

export default function ServiceCard({
  icon,
  image = "/images/lawyer.jpg",
  title,
  desc = "",
  slug,
  count,
}: ServiceProp) {
  return (
    <Link
      href={`/services/${slug}`}
      className="rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg transition duration-300 flex gap-3 p-3"
    >
      <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
        <Image
          src={image}
          alt={title}
          height={160}
          width={160}
          className="h-full w-full object-cover"
        />
        {icon && (
          <span className="absolute -bottom-2 -right-2 bg-white rounded-full shadow p-2 text-blue-600 text-sm">
            {icon}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center space-y-1">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {desc && <p className="text-xs text-gray-600 line-clamp-2">{desc}</p>}
        {count !== undefined && (
          <span className="text-[11px] text-blue-600 font-medium">
            {typeof count === "number" ? `${count} lawyers available` : count}
          </span>
        )}
      </div>
    </Link>
  );
}
