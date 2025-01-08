import {
    MdWork,
    MdPeople,
    MdVisibility,
    MdStar,
    MdFavorite,
    MdCardMembership,
    MdPauseCircleFilled,
  } from "react-icons/md";
  
  const iconMapping = {
    MdWork: MdWork,
    MdPeople: MdPeople,
    MdVisibility: MdVisibility,
    MdStar: MdStar,
    MdFavorite: MdFavorite,
    MdCardMembership: MdCardMembership,
    MdPauseCircleFilled: MdPauseCircleFilled,
  };
  
  export default function DashboardCards({ info }) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {info?.map((card, index) => {
          const IconComponent = iconMapping[card.icon]; // Dynamically get the icon component
  
          return (
            <div
              key={index}
              style={{ backgroundColor: card.bgColor }}
              className="flex justify-between gap-2 items-center rounded-lg px-4 py-6"
            >
              <div className="flex flex-col">
                <span className="text-xl font-semibold">{card.count}</span>
                <span className="text-gray-500 text-[16px]">{card.title}</span>
              </div>
              {IconComponent ? (
                <IconComponent
                  size={48}
                  color={card.color}
                  className="shrink-0"
                />
              ) : null}
            </div>
          );
        })}
      </section>
    );
  }
  