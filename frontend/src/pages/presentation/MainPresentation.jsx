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
import {useLocation, useParams} from "react-router-dom";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {nextSlide, startPresentation} from "../../apis/slide/slideAPI";

let stompClient=null
const MainPresentation = () => {
    const [slideList, setListSlide] = useState([
        {}
    ]);
    const [received,setReceived]=useState([]);
    const location=useLocation();
    // const [activeSlide, setActiveSlide] = useState(0)
    const {id} = useParams()






    useEffect(()=>{
        setListSlide(location.state.index)

    },[location.state.index]);

    const startPresent = () => {
        startPresentation({presentationId: id, slideId: slideList[0]["id"]}).then((response) => {
            console.log(response)
        })
    }

    // startPresent()



    const onIndex=(e)=>{
        // console.log(slideList[e.activeIndex]["id"])
        nextSlide({slideId: slideList[e.activeIndex]["id"]}).then((response) => {
            console.log(response)
        })
        // console.log(e.activeIndex)
    }

    const registerUser = () => {
        let Sock = new SockJS("https://spring-heroku.herokuapp.com/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }
    const onMessageReceived = (payload) => {
        setReceived(payload)
        console.log(payload);

        console.log("dsds",payload.data)
    }
    const onConnected=()=>{

        stompClient.subscribe(`/slide/${id}/playing`,onMessageReceived)
    }
    const onError=(err)=>{
        console.log(err)
    }


    useEffect(() => {
        startPresent()
        registerUser();
    },[])


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