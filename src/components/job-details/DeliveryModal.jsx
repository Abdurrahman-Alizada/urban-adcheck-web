'use client';
import React from 'react';
import Image from 'next/image';

const DeliveryModal = ({ watchdogReports, onClose }) => {
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-[80%] max-h-[95vh] overflow-y-auto">
                  {/* Modal Header */}
             <h2 className="text-xl font-semibold mb-4 text-primary">Watchdog Reports</h2>
             <p className="text-gray-600 mb-6">Here is your job delivery:</p>
                  {/* Modal Content */}
                {watchdogReports?.map((report, index) => (
                  <div key={index} className="mb-6">
                    {/* Drone Images Section */}
                    <div>
                     <h3 className="text-lg font-semibold mb-4 text-primary">Drone Images</h3>
                      {report?.media?.filter((media) => media.subType === "drone").length > 0 ? (
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {report?.media
                              ?.filter((media) => media.subType === "drone")
                              .map((media, idx) => (
                                <div key={idx}>
                                  <Image
                                    src={media?.url}
                                    width={200}
                                    height={200}
                                    alt='Drone-images'
                                    className="rounded-md object-contain max-w-[200px] max-h-[200px]"
                                  />
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p>No Drone Images Found.</p>
                        )}
                      </div>
    
                      {/* Camera Images Section */}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4 text-primary">Camera Images</h3>
                        {report?.media?.filter((media) => media.subType === "camera").length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {report?.media
                              ?.filter((media) => media.subType === "camera")
                              .map((media, idx) => (
                                <div key={idx}>
                                  <Image
                                    src={media?.url}
                                    width={200}
                                    height={200}
                                    alt='camera-image'
                                    className="rounded-md object-contain max-w-[200px] max-h-[200px]"
                                  />
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p>No Camera Images Found.</p>
                        )}
                      </div>
    
                      {/* comments */}
                      <div className='mt-4'>
                        <h3 className="text-lg font-semibold mb-4 text-primary">Comments</h3>
    
                        {report?.comments &&
                          Object.entries(report.comments).map(([title, comment], index) => (
                            <div key={index} className="mb-4">
                              <h3 className="text-gray-700 font-bold text-sm">
                                {title.charAt(0).toUpperCase() + title.slice(1)} {/* Capitalize the title */}
                              </h3>
                              <p className="text-gray-500 text-sm">{comment}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
    
                  {/* Modal Buttons */}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-gray-300"
                    >
                      Submit a revision
                    </button>
                    <button
                      onClick={() =>onClose}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700"
                    >
                      Accept Delivery
                    </button>
                  </div>
                </div>
        </div>
  );
};

export default DeliveryModal;
