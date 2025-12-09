"use client";

import { useEffect, useState } from "react";
import { TabItem, Tabs } from "flowbite-react";
import { FaFire, FaGavel, FaUserTie, FaExclamationTriangle } from "react-icons/fa";
import ServiceList from "./Services/serviceList";
import LawyersTab from "./Lawyers/LawyersTab";
import { Loader2 } from "lucide-react";

type Service = {
  icon: string;
  image: string;
  title: string;
  desc: string;
  slug: string;
  count?: number;
};

type Specialist = {
  icon: string;
  image: string;
  title: string;
  desc: string;
  slug: string;
  count: number;
  category: string;
};

type LegalIssue = {
  icon: string;
  image: string;
  title: string;
  desc: string;
  slug: string;
  count: number;
  urgent: boolean;
};

export default function TabbedItems() {
  const [popularServices, setPopularServices] = useState<Service[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [legalIssues, setLegalIssues] = useState<LegalIssue[]>([]);
  const [loading, setLoading] = useState({
    services: true,
    specialists: true,
    issues: true,
  });

  useEffect(() => {
    // Fetch popular services
    fetch("/api/services/list?popular=true")
      .then((res) => res.json())
      .then((data) => {
        setPopularServices(data.services || []);
        setLoading((prev) => ({ ...prev, services: false }));
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading((prev) => ({ ...prev, services: false }));
      });

    // Fetch specialists
    fetch("/api/specialists/list")
      .then((res) => res.json())
      .then((data) => {
        setSpecialists(data.specialists || []);
        setLoading((prev) => ({ ...prev, specialists: false }));
      })
      .catch((err) => {
        console.error("Error fetching specialists:", err);
        setLoading((prev) => ({ ...prev, specialists: false }));
      });

    // Fetch legal issues
    fetch("/api/legal-issues/list")
      .then((res) => res.json())
      .then((data) => {
        setLegalIssues(data.issues || []);
        setLoading((prev) => ({ ...prev, issues: false }));
      })
      .catch((err) => {
        console.error("Error fetching legal issues:", err);
        setLoading((prev) => ({ ...prev, issues: false }));
      });
  }, []);

  const tabs = [
    {
      title: "Popular Services",
      icon: FaFire,
      component: loading.services ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <ServiceList services={popularServices} />
      ),
    },
    {
      title: "Lawyers",
      icon: FaGavel,
      component: <LawyersTab />,
    },
    {
      title: "Specialists",
      icon: FaUserTie,
      component: loading.specialists ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <ServiceList services={specialists} />
      ),
    },
    {
      title: "Legal Issues",
      icon: FaExclamationTriangle,
      component: loading.issues ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <ServiceList services={legalIssues} />
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs aria-label="Tabs with underline" variant="underline" className="justify-center align-middle">
        {tabs.map((tab, i) => (
          <TabItem
            key={i}
            active={i === 0}
            title={<div className="cursor-pointer">{tab.title}</div>}
            icon={tab.icon}
          >
            <div className="p-5">{tab.component}</div>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}
