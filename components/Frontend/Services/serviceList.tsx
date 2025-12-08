import React from "react";
import ServiceCard from "./ServiceCard";
import type { ServiceProp } from "./ServiceCard";

type Props = {
  services?: ServiceProp[];
};

export default function ServiceList({ services = [] }: Props) {
  if (!services.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
        No services to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {services.map((service) => (
        <ServiceCard key={service.slug} {...service} />
      ))}
    </div>
  );
}
