// 'use client';

// import Spline from '@splinetool/react-spline';

// const SplineWork: React.FC = () => {
//   return (
//     <section className="creative-exploration">
//       <h2 className='text-heading-m-120 md:text-heading-l-20'>Spline</h2>
//       <p>自由な創作をごく稀にします</p>

//       {/* ✅ Spline 3D モデル */}
//       <Spline
//         style={{ width: '90%' }}
//         className="spline"
//         scene="https://prod.spline.design/HS2WPsXRP-WLukO0/scene.splinecode"
//       />

//       <div className="ce_text-container">
//         <div className="ce_work-time">
//           <div className="ce_work-date">Jan 2024</div>
//           <img className="ce_work-tool-logo1" src="/Figma logo.svg" alt="Figma logo" />
//           <img className="ce_work-tool-logo2" src="/Spline logo.png" alt="Spline logo" />

//           <div className="ce_work-period">
//             <p>制作期間：</p>
//             <p>2週間</p>
//           </div>
//         </div>

//         <h3>Vision Pro + Spotify</h3>
//         <p>
//           Vision
//           Proについて調べるうちに妄想が膨らみ制作に至りました。よく使うSpotifyのLyricsをスマホの画面を覗き込まずに空間に表示できないかなあ...なんて考えをビジュアルにしました。マウスを押しながら自由にどの角度からでもご覧いただけます。💡
//           サイズが大きいためパソコンで見ていただきたいです！
//         </p>

//         {/* ✅ Webページへの遷移ボタン */}
//         <div className="arrow-text-container">
//           <p>Webページに遷移します</p>
//           <a href="https://visionpro-spotify.netlify.app/" target="_blank" rel="noopener noreferrer">
//             <svg
//               className="arrow-container"
//               width="70"
//               height="70"
//               viewBox="0 0 70 70"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect
//                 className="arrow-rect"
//                 width="70"
//                 height="70"
//                 rx="35"
//                 transform="matrix(-1 0 0 1 70 0)"
//                 fill="white"
//                 fillOpacity="0.5"
//               />
//               <path
//                 className="arrow-border"
//                 d="M39.7322 0.030804C34.4094 -0.12516 29.2024 0.311121 24.1113 1.33964..."
//                 fill="#065D44"
//               />
//               <path
//                 className="arrow-path"
//                 d="M43.1971 37.0388C43.2181 37.1063 43.216 37.1863 43.1907 37.279C43.1739..."
//                 fill="#065D44"
//               />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SplineWork;

'use client';

import Spline from '@splinetool/react-spline';

const SplineWork: React.FC = () => {
  return (
    <section className="w-full py-12">
      {/* 横並びのflexレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 左カラム：Spline 3D */}
        <div className="lg:col-span-6 relative w-full h-[400px] md:h-[500px]">
          <div className="absolute inset-0 bg-gray-100 -z-10"></div>
          <Spline
            className="w-full  rounded-[16px] "
            scene="https://prod.spline.design/HS2WPsXRP-WLukO0/scene.splinecode"
          />
        </div>

        {/* 右カラム：テキストなど */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="text-heading-m-120 md:text-heading-l-20">Vision Pro + Spotify</h2>
          <p className="text-body-l-140">
            {/* Vision Proについて調べるうちに妄想が膨らみ制作に至りました。
            よく使うSpotifyのLyricsをスマホの画面を覗き込まずに空間に表示できないかなあ…
            なんて考えをビジュアルにしました。マウスを押しながら自由にどの角度からでもご覧いただけます💡
            サイズが大きいためパソコンで見ていただきたいです！ */}
            As I researched Vision Pro, my imagination grew and I decided to create this product. I wondered if it would
            be possible to display the Spotify Lyrics that I often use in a space without looking into the screen of my
            smartphone... I turned this idea into a visual. You can freely view it from any angle while pressing the
            mouse button 💡. Due to its large size, I recommend that you view it on a computer!
          </p>

          {/* 制作情報 */}
          {/* <div className="flex items-center gap-4">
            <div className="text-caption-m-120">Jan 2024</div>
            <img src="/Figma logo.svg" alt="Figma logo" className="w-8 h-8" />
            <img src="/Spline logo.png" alt="Spline logo" className="w-8 h-8" />
            <div className="text-caption-m-120">制作期間：2週間</div>
          </div> */}
          {/* --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              {/* キャプション: Caption/XL_120 (font-sf-mono) */}
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Timeline</h3>
              {/* 小テキスト: Body/L_140 */}
              <p className="text-body-l-140 font-sf-pro">2 Weeks in Jan 2024</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">My Skills</h3>
              <p className="text-body-l-140 font-sf-pro">Spline</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Type</h3>
              <p className="text-body-l-140 font-sf-pro">Solo</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Deliverables</h3>
              <p className="text-body-l-140 font-sf-pro">Prototype</p>
            </div>
          </div>

          {/* 遷移ボタン */}
          {/* <div className="flex flex-col gap-2">
            <a
              href="https://visionpro-spotify.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit inline-flex items-center gap-2 px-6 py-2 border border-[#065D44] rounded-full text-[#065D44] hover:bg-[#065D44]/10 transition"
            >
              <span>Visit Prototype</span>
            </a>
          </div> */}
          <button
            onClick={() => window.open('https://visionpro-spotify.netlify.app/', '_blank')}
            aria-label="Vision Pro + Spotify"
            className="w-fit all-[unset] box-border inline-flex flex-col items-start px-10 py-2 relative flex-[0_0_auto] border-2 border-black rounded-[40px]"
          >
            <div className="text-heading-xxs-120 py-1 z-10">View Prototype</div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SplineWork;
