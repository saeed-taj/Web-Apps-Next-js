// "use client";

// import { TabItem, Tabs } from "flowbite-react";
// import { FaFire, FaGavel, FaUserTie, FaExclamationTriangle } from "react-icons/fa";
// import ServiceList from "./Services/serviceList";

// export default function TabbedItems() {
//   const tabs = [
//     { 
//       title: "Popular Services", 
//       icon: FaFire 
//     },
//     { 
//       title: "Lawyers", 
//       icon: FaGavel 
//     },
//     { 
//       title: "Specialists", 
//       icon: FaUserTie 
//     },
//     { 
//       title: "Legal Issues", 
//       icon: FaExclamationTriangle 
//     },
//   ];
  
//   return (
//     <div className="w-full">
//       <Tabs aria-label="Legal services tabs" variant="underline">
//         {tabs.map((tab, i) => (
//           <TabItem key={i} active={i === 0} title={tab.title} icon={tab.icon}>
//             <div className="p-4">
//               <h3 className="text-xl font-bold mb-6">{tab.title}</h3>
//               <ServiceList />
//             </div>
//           </TabItem>
//         ))}
//       </Tabs>
//     </div>
//   );
// }

"use client";
import { FileUser, Gavel, LockOpen, Scale, User, Video } from "lucide-react";
import { TabItem, Tabs } from "flowbite-react";
import { FaFire, FaGavel, FaUserTie, FaExclamationTriangle } from "react-icons/fa";
import ServiceList from "./Services/serviceList";
import { TbLoadBalancer } from "react-icons/tb";

export default function TabbedItems() {
  const topServices = [
    { icon: <Video/>, title: "Video Consultation", desc: "Instant legal advice" },
    { icon: <Scale/>, title: "Legal Notice", desc: "Draft & send legal notice" },
    { icon: <LockOpen/>, title: "Bail Application", desc: "Emergency bail filing" },
    { icon: <FileUser/>, title: "Will Writing", desc: "Create legally valid will" },
  ];

  const lawyersFilters = [
    "Search by Name",
    "Near Me",
    "Top Rated (4.5+ stars)",
    "Video Consultation",
    "Available Today",
    "Free First Consultation"
  ];

  const specialists = [
    { category: "Criminal Law", count: 45 },
    { category: "Family Law", count: 32 },
    { category: "Corporate Law", count: 28 },
    { category: "Property Law", count: 25 },
    { category: "Immigration", count: 18 },
    { category: "Employment Law", count: 22 },
  ];

  const legalIssues = [
    "Divorce & Separation",
    "Property Dispute",
    "Police Case/FIR",
    "Cheque Bounce",
    "Tenant Issues",
    "Business Dispute",
    "Employment Termination",
    "Immigration Issues"
  ];

  const tabs = [
    {
      title: "Popular Services",
      icon: FaFire,
      content: (
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Most Booked Legal Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topServices.map((service, index) => (
              <div 
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="text-2xl mb-2 ">{service.icon}</div>
                <h4 className="font-medium text-gray-800 mb-1">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ServiceList />
          </div>
        </div>
      )
    },
    {
      title: "Lawyers",
      icon: FaGavel,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Find the Right Lawyer</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {lawyersFilters.map((filter, index) => (
              <div 
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-gray-700">{filter}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Recommended For You</h4>
            <p className="text-sm text-gray-600 mb-4">Based on your location and needs</p>
            <ServiceList />
          </div>
        </div>
      )
    },
    {
      title: "Specialists",
      icon: FaUserTie,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Legal Specialists by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {specialists.map((specialist, index) => (
              <div 
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800">{specialist.category}</h4>
                  <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {specialist.count} lawyers
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Expert lawyers in {specialist.category.toLowerCase()}</p>
              </div>
            ))}
          </div>
          <ServiceList />
        </div>
      )
    },
    {
      title: "Legal Issues",
      icon: FaExclamationTriangle,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Common Legal Problems</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {legalIssues.map((issue, index) => (
              <div 
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
              >
                <div className="text-red-500 mb-2">⚠️</div>
                <h4 className="font-medium text-gray-800">{issue}</h4>
              </div>
            ))}
          </div>
          <ServiceList />
        </div>
      )
    }
  ];
  
  return (
    <div className="">
      <Tabs 
        aria-label="Legal services tabs" 
        variant="underline"
        className="border-b cursor-pointer align-center justify-center"
      >
        {tabs.map((tab, i) => (
          <TabItem 
            className="py-4 cursor-pointer font-medium transition-colors duration-300
                   group-hover:text-blue-600"
            key={i} 
            active={i === 0} 
            title={<div className="mx-2 cursor-pointer">{tab.title}</div>} 
            icon={tab.icon}
            
          >
            {tab.content}
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}