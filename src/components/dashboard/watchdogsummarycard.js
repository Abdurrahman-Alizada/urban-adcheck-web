'use client';
import { useRouter } from 'next/navigation';
import {
  MdOutlineCheckCircle,
  MdOutlineWorkOutline,
  MdOutlineVisibilityOff,
  MdOutlineAccessTime,
} from 'react-icons/md';

const iconMapping = {
  MdOutlineCheckCircle: MdOutlineCheckCircle,
  MdOutlineWorkOutline: MdOutlineWorkOutline,
  MdOutlineVisibilityOff: MdOutlineVisibilityOff,
  MdOutlineAccessTime: MdOutlineAccessTime,
};

export default function WatchdogCards({ info }) {
  console.log("info", info);
const router=useRouter();
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {info?.map((card, index) => {
        const IconComponent = iconMapping[card.webIcon]; // Dynamically get the icon component

        return (
          <div
          onClick={() => router.push(`/dashboard/watchdog/jobs?title=${encodeURIComponent(card.title)}`)}

            key={index}
            style={{ backgroundColor: card.bgColor }}
            className="flex justify-between items-center rounded-lg px-4 py-6 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{card.count}</span>
              <span className="text-gray-700 text-lg">{card.title}</span>
            </div>
            {IconComponent ? (
              <IconComponent
                size={48}
                color={card.color} // Apply the dynamic color
                className="shrink-0"
              />
            ) : (
              <div>No Icon</div> // Handle cases where the icon is missing
            )}
          </div>
        );
      })}
    </section>
  );
}
