import React from 'react';

interface GrowCommonLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GrowCommonLogo({ size = 'md', className = '' }: GrowCommonLogoProps) {
  const sizeClasses = {
    sm: { container: 'w-8 h-8', outer: 'border-[3px]', inner: 'border-[1.5px]', text: 'text-[3px]' },
    md: { container: 'w-10 h-10', outer: 'border-4', inner: 'border-2', text: 'text-[4px]' },
    lg: { container: 'w-12 h-12', outer: 'border-[5px]', inner: 'border-[2.5px]', text: 'text-[5px]' }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`${sizes.container} ${className} relative flex-shrink-0`}>
      {/* Outer dark green circle - thick border */}
      <div className={`absolute inset-0 rounded-full ${sizes.outer} border-[#2d3e26] bg-white`}>
        {/* Inner light green circle - thinner border */}
        <div className={`absolute inset-1.5 rounded-full ${sizes.inner} border-[#9EBB8C] bg-white`}>
          {/* White center area */}
          <div className="absolute inset-2.5 rounded-full bg-white overflow-hidden">
            {/* Plant sprout at top */}
            <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2">
              {/* Main light green rounded leaf at top */}
              <div className="w-2 h-2.5 bg-[#9EBB8C] rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
              {/* Dark green stem */}
              <div className="w-[1px] h-2 bg-[#2d3e26] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
              {/* Orange leaves/petals branching from stem */}
              <div className="absolute top-0.5 -left-1 w-1.5 h-2 bg-orange-400 rounded-full transform -rotate-12"></div>
              <div className="absolute top-0.5 -right-1 w-1.5 h-2 bg-orange-400 rounded-full transform rotate-12"></div>
              {/* Small red accents */}
              <div className="absolute top-0.75 -left-0.75 w-0.5 h-0.5 bg-red-500 rounded-full"></div>
              <div className="absolute top-0.75 -right-0.75 w-0.5 h-0.5 bg-red-500 rounded-full"></div>
              {/* Small dark green leaves */}
              <div className="absolute top-1 -left-0.5 w-1 h-1 bg-[#2d3e26] rounded-full transform -rotate-45"></div>
              <div className="absolute top-1 -right-0.5 w-1 h-1 bg-[#2d3e26] rounded-full transform rotate-45"></div>
            </div>
            
            {/* GROWCOMMON text in center - bold dark green */}
            {size !== 'sm' && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`${sizes.text} font-bold text-[#2d3e26] leading-none whitespace-nowrap tracking-tight`}>
                  GROWCOMMON
                </div>
                {/* Thin horizontal line under text extending beyond */}
                <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-[120%] h-[0.5px] bg-[#2d3e26]"></div>
              </div>
            )}
            
            {/* Dense root system at bottom - dark green thick intertwining lines */}
            <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-full">
              {/* Main vertical root */}
              <div className="w-[1px] h-2 bg-[#2d3e26] absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
              {/* Branching roots - dense network */}
              <div className="w-[1px] h-1.5 bg-[#2d3e26] absolute bottom-0 left-1/2 transform -translate-x-1/2 -rotate-30 origin-top"></div>
              <div className="w-[1px] h-1.5 bg-[#2d3e26] absolute bottom-0 left-1/2 transform -translate-x-1/2 rotate-30 origin-top"></div>
              <div className="w-[1px] h-1 bg-[#2d3e26] absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 -rotate-60 origin-top"></div>
              <div className="w-[1px] h-1 bg-[#2d3e26] absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 rotate-60 origin-top"></div>
              <div className="w-[1px] h-0.75 bg-[#2d3e26] absolute -bottom-1 left-1/2 transform -translate-x-1/2 -rotate-45 origin-top"></div>
              <div className="w-[1px] h-0.75 bg-[#2d3e26] absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 origin-top"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
