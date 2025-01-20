import { faArrowRight, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RecentlySubscribedUsers({ users }) {
  return (
    <section className="mt-10">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg md:text-xl">
          Recently Subscribed Clients
        </h2>
        {/* <button className="border-b border-transparent hover:border-black transition duration-150 text-base md:text-lg font-medium">
          View All{" "}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-gray-400"
            size="xs"
          />
        </button> */}
      </div>

      {/* Users List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user._id || index}
              className="shadow-custom-shadow rounded-lg overflow-hidden bg-white"
            >
              {/* User Information */}
              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  {user.fullName.firstName} {user.fullName.lastName}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Subscription Details */}
              <div className="px-5 py-4 bg-gray-100 border-t">
                {user.packageDetails ? (
                  <div>
                    <p className="text-sm text-gray-500">Plan:</p>
                    <p className="font-medium text-gray-800">
                      {user.packageDetails.currentPlan.packageName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Ends on:</p>
                    <p className="font-medium text-gray-800">
                      {new Date(
                        user.packageDetails.currentPlan.endDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-red-500" />
                    <p className="text-sm mt-2">Not Subscribed</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            <p>No recently subscribed clients with active packages.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentlySubscribedUsers;
