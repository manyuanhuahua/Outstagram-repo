
// import React from 'react';
// import { useSpringCarousel } from 'react-spring-carousel'
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// export default function Carousel() {
//   const images = [
//     {
//       imageUrl: "https://st.depositphotos.com/1002489/3561/i/600/depositphotos_35619861-stock-photo-paris-la-defense-at-sunset.jpg"
//     },
//     {
//       imageUrl: "https://static.remove.bg/remove-bg-web/f9c9a2813e0321c04d66062f8cca92aedbefced7/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
//     },
//     {
//       imageUrl: "https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"
//     }
//   ]
//   const dispatch = useDispatch();
//   const {
//     carouselFragment,
//     // slideToPrevItem,
//     slideToNextItem
//   } = useSpringCarousel({
//     withLoop: true,
//     items: images.map((i) => ({
//       id: i.id,
//       renderItem: (
//         <div>

//           <div className="image-cards" key={i.id} to={`/images/${i.id}`}>
//             <div>
//               {i.title}
//             </div>
//             <div>

//               <img className="image-card" src={i.imageUrl} style={{ maxHeight: "750px", maxWidth: '330px' }}>
//               </img>
//             </div>
//           </div>
//         </div>
//       ),
//     })),
//   });
//   useEffect(() => {
//     const timer = setInterval(() => {
//       slideToNextItem();
//     }, 5000);
//     return () => {
//       window.clearInterval(timer);
//     };
//     // You MUST add the slide methods to the dependency list useEffect!
//   }, [slideToNextItem]);



//   return (
//     <div style={{ width: '352px', position: 'fixed', left: '160px' }}>
//       {carouselFragment}
//       {/* <button onClick={slideToPrevItem}>Prev item</button>
//       <button onClick={slideToNextItem}>Next item</button> */}
//     </div>
//   );
// }
