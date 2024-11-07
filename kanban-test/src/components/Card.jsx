import React, { useState } from "react";

const Card = ({ title, id, column }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div
        draggable="true"
        className="relative mt-2 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        onClick={handleCardClick} // Handle click to open dialog
      >
        <p className="text-sm text-neutral-100 pe-4">{title}</p>

        {/* Small circle at the bottom right */}
        <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-neutral-900"></div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="min-w-full min-h-screen fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-neutral-800 rounded-lg p-6 h-1/2 w-3/4">
            <h2 className="text-lg text-neutral-100 mb-4">{title}</h2>
            <p className="text-sm text-neutral-400">description</p>

            <div className="mt-4 flex " >
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={handleCloseDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
