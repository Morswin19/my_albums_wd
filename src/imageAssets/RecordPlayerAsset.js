import React from 'react';

const RecordPlayerAsset = ({ cover, isPlaying }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
      <defs>
        <filter id="shadow-main" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#0435A7" floodOpacity="0.25" />
        </filter>
        
        <filter id="shadow-plate" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0435A7" floodOpacity="0.15" />
        </filter>
        
        <clipPath id="album-cover-clip">
          <circle cx="215" cy="250" r="55" />
        </clipPath>
      </defs>

      <rect x="30" y="50" width="440" height="400" rx="16" fill="#DFF0FF" stroke="#1E48B1" strokeWidth="4" filter="url(#shadow-main)" />

      <circle cx="215" cy="250" r="170" fill="#FFFFFF" stroke="#6BB0EC" strokeWidth="3" filter="url(#shadow-plate)" />

      <g 
        id="vinyl-record" 
        className="vinyl-record-spin" 
        style={{ transformOrigin: '215px 250px', animationPlayState: isPlaying ? 'running' : 'paused' }}
      >
        <circle cx="215" cy="250" r="155" fill="#0D0D0D" />
        
        <circle cx="215" cy="250" r="145" fill="none" stroke="#F6F6F6" strokeWidth="1" opacity="0.15" />
        <circle cx="215" cy="250" r="135" fill="none" stroke="#F6F6F6" strokeWidth="0.8" opacity="0.1" />
        <circle cx="215" cy="250" r="120" fill="none" stroke="#F6F6F6" strokeWidth="1" opacity="0.15" />
        <circle cx="215" cy="250" r="105" fill="none" stroke="#F6F6F6" strokeWidth="0.8" opacity="0.1" />
        <circle cx="215" cy="250" r="90" fill="none" stroke="#F6F6F6" strokeWidth="1" opacity="0.15" />
        
        {cover ? (
          <image 
            href={cover} 
            x="160" 
            y="195" 
            width="110" 
            height="110" 
            preserveAspectRatio="xMidYMid slice" 
            clipPath="url(#album-cover-clip)" 
          />
        ) : (
          <circle cx="215" cy="250" r="55" fill="#1E48B1" />
        )}

        <circle cx="215" cy="250" r="50" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.2" />
      </g>

      <circle cx="215" cy="250" r="6" fill="#F6F6F6" stroke="#FFFFFF" strokeWidth="1" />
      <circle cx="215" cy="250" r="2" fill="#1A1A1A" />

      <rect x="415" y="390" width="30" height="30" rx="6" fill="#1E48B1" />
      <rect x="375" y="390" width="30" height="30" rx="6" fill="#1E48B1" />
      <rect x="335" y="390" width="30" height="30" rx="6" fill="#1E48B1" />
      
      <rect x="415" y="350" width="30" height="15" rx="4" fill="#1E48B1" />
      <rect x="415" y="320" width="30" height="15" rx="4" fill="#1E48B1" />

      <circle cx="75" cy="390" r="18" fill="#1E48B1" />
      <line x1="75" y1="372" x2="75" y2="382" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      <circle cx="410" cy="140" r="30" fill="#6BA8EC" opacity="0.3" />
      <circle cx="410" cy="140" r="22" fill="#F35953" />
      <circle cx="410" cy="140" r="10" fill="#1E48B1" />
      
      <rect x="403" y="85" width="14" height="25" rx="3" fill="#F35953" />
      <line x1="410" y1="110" x2="410" y2="140" stroke="#F35953" strokeWidth="5" />

      <path d="M 410 140 Q 425 240 375 280 L 320 340" fill="none" stroke="#F35953" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      
      <g transform="translate(320, 340) rotate(40)">
        <rect x="-8" y="0" width="16" height="28" rx="2" fill="#F35953" />
        <rect x="-5" y="20" width="10" height="5" fill="#1E48B1" />
      </g>
    </svg>
  );
};

export default RecordPlayerAsset;