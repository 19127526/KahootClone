import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Pagination, Navigation} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useEffect, useState} from "react";
import barchart from "../../assets/img/chart.png"
import slide from "../../assets/img/slide.png"

import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import {useLocation} from "react-router-dom";


const MainPresentation = () => {
    const [slideList, setListSlide] = useState([
        {}
    ]);
    const location=useLocation();
    console.log(location.state.index)
    useEffect(()=>{
        console.log(location.state.index)
        setListSlide(location.state.index)
    },[location.state.index]);
    const onIndex=(e)=>{
        console.log(e)
    }
    return (
        <>
            <Swiper
                slidesPerView={1}
                autoHeight={true}
                // setWrapperSize={true}
                centeredSlides={true}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    type: "bullets",
                }}
                navigation={false}
                onActiveIndexChange={onIndex}
                modules={[Keyboard, Pagination, Navigation]}
            >
                {slideList.map((value, index) => {
                    return (<SwiperSlide style={{backgroundColor: "white", height:"100%", padding: "5%"}}  >
                        {<ChartPresentation value={value} width={"165vh"}/>}
                    </SwiperSlide>)
                })}
            </Swiper>
        </>
    );
}

export default MainPresentation