// ADD NEW ICONS HERE
const ICONS= {
    robot:(
        <>
    <ellipse cx="340" cy="620" rx="120" ry="18" fill="#1a1a2e" opacity="0.18"/>
    <rect x="275" y="540" width="48" height="70" rx="14" fill="#7ec8c8"/>
    <rect x="357" y="540" width="48" height="70" rx="14" fill="#7ec8c8"/>
    <rect x="268" y="595" width="62" height="28" rx="12" fill="#5bb0b0"/>
    <rect x="350" y="595" width="62" height="28" rx="12" fill="#5bb0b0"/>
    <rect x="220" y="390" width="240" height="175" rx="38" fill="#9edede"/>
    <rect x="235" y="405" width="210" height="145" rx="28" fill="#b8ebeb"/>
    <rect x="288" y="430" width="104" height="90" rx="16" fill="#4a90d9"/>
    <rect x="298" y="440" width="84" height="70" rx="10" fill="#3478c0"/>
    <circle cx="340" cy="475" r="16" fill="#60aaff"/>
    <circle cx="340" cy="475" r="9" fill="#1a5caa"/>
    <circle cx="336" cy="471" r="3" fill="#7ecfff" opacity="0.7"/>
    <rect x="148" y="400" width="62" height="120" rx="24" fill="#9edede"/>
    <rect x="158" y="412" width="22" height="60" rx="10" fill="#b8ebeb"/>
    <rect x="138" y="505" width="74" height="38" rx="16" fill="#7ec8c8"/>
    <rect x="470" y="400" width="62" height="120" rx="24" fill="#9edede"/>
    <rect x="480" y="412" width="22" height="60" rx="10" fill="#b8ebeb"/>
    <rect x="468" y="505" width="74" height="38" rx="16" fill="#7ec8c8"/>
    <rect x="312" y="360" width="56" height="38" rx="10" fill="#7ec8c8"/>
    <rect x="320" y="365" width="40" height="26" rx="7" fill="#9edede"/>
    <rect x="190" y="180" width="300" height="196" rx="44" fill="#9edede"/>
    <rect x="205" y="195" width="270" height="168" rx="34" fill="#b8ebeb"/>
    <rect x="332" y="135" width="16" height="52" rx="6" fill="#7ec8c8"/>
    <circle cx="340" cy="122" r="20" fill="#4a90d9"/>
    <circle cx="340" cy="122" r="12" fill="#60aaff"/>
    <circle cx="335" cy="117" r="4" fill="#a8d8ff" opacity="0.8"/>
    <rect x="175" y="222" width="34" height="68" rx="14" fill="#7ec8c8"/>
    <rect x="471" y="222" width="34" height="68" rx="14" fill="#7ec8c8"/>
    <rect x="182" y="232" width="20" height="48" rx="8" fill="#5bb0b0"/>
    <rect x="478" y="232" width="20" height="48" rx="8" fill="#5bb0b0"/>
    <rect x="218" y="215" width="244" height="130" rx="24" fill="#2a4a5e"/>
    <rect x="226" y="222" width="228" height="116" rx="18" fill="#1e3a4e"/>
    <circle cx="285" cy="264" r="28" fill="#0d2535"/>
    <circle cx="285" cy="264" r="19" fill="#00c97a"/>
    <circle cx="285" cy="264" r="11" fill="#008850"/>
    <circle cx="278" cy="257" r="5" fill="#7fffd4" opacity="0.7"/>
    <circle cx="395" cy="264" r="28" fill="#0d2535"/>
    <circle cx="395" cy="264" r="19" fill="#00c97a"/>
    <circle cx="395" cy="264" r="11" fill="#008850"/>
    <circle cx="388" cy="257" r="5" fill="#7fffd4" opacity="0.7"/>
    {/* ↓ Fixed: stroke-width → strokeWidth, stroke-linecap → strokeLinecap */}
    <path d="M295 308 Q340 340 385 308" stroke="#00c97a" strokeWidth="9" fill="none" strokeLinecap="round"/>
    <path d="M295 308 Q340 340 385 308 Q340 322 295 308Z" fill="#008850" opacity="0.5"/>
    <circle cx="232" cy="198" r="8" fill="#7ec8c8"/>
    <circle cx="232" cy="198" r="5" fill="#5bb0b0"/>
    <circle cx="448" cy="198" r="8" fill="#7ec8c8"/>
    <circle cx="448" cy="198" r="5" fill="#5bb0b0"/>
    </>
    ),
    resolution:(
        <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#000"/>
  <line x1="256" y1="48" x2="256" y2="80" stroke="#2d3a4a" stroke-width="14" stroke-linecap="round"/>
  <line x1="340" y1="72" x2="324" y2="100" stroke="#2d3a4a" stroke-width="14" stroke-linecap="round"/>
  <line x1="400" y1="150" x2="372" y2="162" stroke="#2d3a4a" stroke-width="14" stroke-linecap="round"/>
  <line x1="400" y1="330" x2="372" y2="316" stroke="#2d3a4a" stroke-width="14" stroke-linecap="round"/>
  <line x1="112" y1="150" x2="140" y2="162" stroke="#2d3a4a" stroke-width="14" stroke-linecap="round"/>
  <line x1="112" y1="330" x2="140" y2="316" stroke="#2d3a4a" stroke-width="14" stroke-linecap="round"/>
  <line x1="172" y1="72" x2="188" y2="100" stroke="#2d3a4a" stroke-width="14" stroke-linecap="round"/>
  <path d="
    M256 105
    C186 105 130 161 130 231
    C130 278 156 318 195 340
    L195 370
    Q195 378 203 378
    L309 378
    Q317 378 317 370
    L317 340
    C356 318 382 278 382 231
    C382 161 326 105 256 105Z
  " fill="#f5a623" stroke="#2d3a4a" stroke-width="14" stroke-linejoin="round"/>
  <rect x="195" y="382" width="122" height="20" rx="10" fill="#5bc8f5" stroke="#2d3a4a" stroke-width="5"/>
  <rect x="200" y="406" width="112" height="20" rx="10" fill="#5bc8f5" stroke="#2d3a4a" stroke-width="5"/>
  <rect x="208" y="430" width="96" height="20" rx="10" fill="#5bc8f5" stroke="#2d3a4a" stroke-width="5"/>
  <ellipse cx="256" cy="455" rx="38" ry="16" fill="#1ecfaa" stroke="#2d3a4a" stroke-width="6"/>
  <polyline
    points="170,240 222,300 340,170"
    fill="none"
    stroke="#1ecfaa"
    stroke-width="38"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <polyline
    points="170,240 222,300 340,170"
    fill="none"
    stroke="#2d3a4a"
    stroke-width="52"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity="0.18"
  />
 
  <polyline
    points="172,242 222,300 338,172"
    fill="none"
    stroke="#1ecfaa"
    stroke-width="36"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

</svg>
        </>
    ),
    googleLogin:(
        <>
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
  <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.3l-6.1-5.2C29.1 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.1-8l-6.5 5C9.7 39.5 16.3 44 24 44z"/>
  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.1 7.1l6.1 5.2C39 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"/>
        </>
    ),
    microLogin:(
        <>
        <path fill="#F25022" d="M1 1h10v10H1z"/>
  <path fill="#7FBA00" d="M13 1h10v10H13z"/>
  <path fill="#00A4EF" d="M1 13h10v10H1z"/>
  <path fill="#FFB900" d="M13 13h10v10H13z"/>
        </>
    ),
    gitLogin:(
        <>
         <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.3 7.6 10.8.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 2.5.8 3.1-1 .1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 .1a10.5 10.5 0 0 1 5.5 0c2.1-.4 3-.1 3-.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.7 1.1 2.9 0 4.3-2.6 5.3-5.1 5.6.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.4-1.5 7.6-5.8 7.6-10.8C23.2 5.4 18.3.5 12 .5z"/>
        </>
    )
}

const ICON=({name,size,viewBox,className}) =>{
    const icon = ICONS[name];

    if(!icon){
        console.warn("Icon not Found");
        return null;
    }

    return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox!==undefined ? viewBox: "0 0 680 680"}
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-${name} ${className}`}
    //   style={{ cursor: onClick ? "pointer" : "default", ...style }}
    >
      {icon}
    </svg>
  );
};

export default ICON;