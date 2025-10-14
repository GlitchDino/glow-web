import React from 'react';

export default function BeforeAfter() {
  return (
    <div className="w-full bg-black/10 border border-white/30 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        {/* Before Card */}
        <div className="flex-1 w-full bg-white/90 p-3 flex flex-col items-center">
          <div className="w-full aspect-[3/4] relative overflow-hidden mb-4">
            <img
              src="/before.png"
              alt="Before"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-black text-lg font-medium">Week 1</p>
        </div>

        {/* After Card */}
        <div className="flex-1 w-full bg-white/90 p-3 flex flex-col items-center">
          <div className="w-full aspect-[3/4] relative  overflow-hidden mb-4">
            <img
              src="/after.png"
              alt="After"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-black text-lg font-medium">Week 12</p>
        </div>
      </div>
    </div>
  );
}