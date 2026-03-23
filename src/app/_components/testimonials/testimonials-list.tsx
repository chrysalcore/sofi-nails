export default function TestimonialsList() {
    return <div className="elfsight-app-2db79281-8c28-4ef2-9073-01929cb15609" data-elfsight-app-lazy></div>
    // return (
    //     <ul ref={ref} className={`testimonials-list ${inView? 'animate' : ''}`}>
    //         {data.map(item => {
    //             return (
    //                 <Testimonial data={item} supports={supports.current} key={item.name} />
    //             )
    //         })}
    //     </ul>
    // )
}

// function Testimonial({ data, supports }) {
//     return (
//         <li className={`testimonial ${supports ? 'slide-animate' : ''}`} key={data.name}>
//             <a className="testimonial__link" href={data.href} rel="noopener noreferrer" target="_blank">
//                 <header className="testimonial__header">
//                     <Stars rating={5} />
//                     <p className="testimonial__desc">{data.text}</p>
//                 </header>
//                 <h3 className="testimonial__name">{data.name}</h3>
//                 <Image loading="lazy" className="testimonial__ticks" src={new URL("../../../assets/icons/ticks.svg", import.meta.url).href} alt="ticks icon" />
//             </a>
//         </li>
//     )
// }