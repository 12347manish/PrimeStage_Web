// import React, { useRef, useEffect } from "react";

// const MovingBoxes = () => {
//   const boxData = [
//     {
//       videoSrc: '/2f19b82504e6cc2d91bdc069c9bfcd7a 2.mov',
//       stars: "★★★★★",
//       name: "John Doe",
//       review: "Amazing video! Loved it.",
//     },
//     {
//       videoSrc: '/86b4b08b6c1c35fd9c9c0578c7882f9f 2.mov',
//       stars: "★★★★☆",
//       name: "Jane Smith",
//       review: "Very informative and well-made.",
//     },
//     {
//       videoSrc: '/336529c683423ecd1b2d4316d7db703d 2.mov',
//       stars: "★★★★★",
//       name: "Alice Johnson",
//       review: "Fantastic content, highly recommended!",
//     },
//     {
//       videoSrc: '/b2532f0b128b2d2e7af95145d7137936 2.mov',
//       stars: "★★★★★",
//       name: "Alice Johnson",
//       review: "Fantastic content, highly recommended!",
//     },
    
    
//   ];

//   const containerRef = useRef(null);
//   const videoRefs = useRef([]); // Ref to store all video elements

//   useEffect(() => {
//     // Preload all videos
//     const preloadVideos = () => {
//       videoRefs.current.forEach((video) => {
//         if (video) {
//           video.preload = "auto";
//           video.load(); // Force the browser to load the video
//         }
//       });
//     };

//     // Start all videos
//     const startAllVideos = () => {
//       videoRefs.current.forEach((video) => {
//         if (video) {
//           video.currentTime = 0; // Reset video to start
//           const playPromise = video.play();
//           if (playPromise !== undefined) {
//             playPromise.catch((error) => {
//               console.log("Playback prevented:", error);
//             });
//           }
//         }
//       });
//     };

//     // Handle video end event to restart smoothly
//     const handleVideoEnd = (event) => {
//       const video = event.target;
//       video.currentTime = 0; // Reset video to start
//       video.play(); // Restart the video
//     };

//     // Attach event listeners to all videos
//     const attachVideoListeners = () => {
//       videoRefs.current.forEach((video) => {
//         if (video) {
//           video.addEventListener("ended", handleVideoEnd);
//         }
//       });
//     };

//     // Detach event listeners on cleanup
//     const detachVideoListeners = () => {
//       videoRefs.current.forEach((video) => {
//         if (video) {
//           video.removeEventListener("ended", handleVideoEnd);
//         }
//       });
//     };

//     // Preload videos and start playback
//     preloadVideos();
//     startAllVideos();
//     attachVideoListeners();

//     // Cleanup
//     return () => {
//       detachVideoListeners();
//       videoRefs.current.forEach((video) => {
//         if (video) {
//           video.pause();
//         }
//       });
//     };
//   }, []);

//   const VideoBox = ({ box, index }) => (
//     <div
//       key={index}
//       className="flex-shrink-0 w-96 border-2 border-gray-200 mx-4 text-left rounded-2xl overflow-hidden"
//     >
//       <div className="w-full h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
//         <video
//           ref={(el) => (videoRefs.current[index] = el)} // Store video ref
//           src={box.videoSrc}
//           className="w-full h-full object-cover"
//           muted
//           loop
//           playsInline
//           autoPlay
//           preload="auto"
//         >
//           Your browser does not support the video tag.
//         </video>
//       </div>
//       <div className="p-6">
//         <span className="text-2xl text-yellow-400">{box.stars}</span>
//         <span className="block text-lg font-medium mt-2">{box.name}</span>
//         <span className="text-sm text-gray-600">{box.review}</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white pt-10 pb-20">
//       <h2 className="text-3xl font-normal text-center text-gray-800 mb-12">
//         Our Achievements
//       </h2>
//       <div className="overflow-hidden">
//         <div ref={containerRef} className="flex animate-moveBoxes">
//           {/* Original boxes */}
//           {boxData.map((box, index) => (
//             <VideoBox key={index} box={box} index={index} />
//           ))}
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovingBoxes;
