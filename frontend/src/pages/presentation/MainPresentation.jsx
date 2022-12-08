import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Pagination, Navigation} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useEffect, useState} from "react";

import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";
import {useLocation, useParams} from "react-router-dom";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import {closePresentation, nextSlide, startPresentation} from "../../apis/slide/slideAPI";

let stompClient=null
const MainPresentation = () => {
    const [activeIndex,setActiveIndex] = useState(0)
    const location=useLocation();
    const {id} = useParams()
    const [slideList,setListSlide]=useState(location.state.index);


    useEffect(()=>{
        const registerUser = () => {
            let Sock = new SockJS("https://spring-heroku.herokuapp.com/ws");
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        }
        const onMessageReceived = (payload) => {
            const data = JSON.parse(payload.body)
            const list=slideList?.map(index=>{
                if(index.id===data.id){
                    return data
                }
                return index
            })

            setListSlide(list);

            console.log("list",list)


        }
        const onConnected=()=>{
            stompClient.subscribe(`/slide/${id}/playing`,onMessageReceived)
        }
        const onError=(err)=>{
            console.log(err)
        }
        const startPresent = () => {
            console.log(location.state.firstSlide)
            startPresentation({presentationId: id, slideId: location.state.firstSlide}).then((response) => {
                // setListSlide(response.data["questions"])
            })
        }
        registerUser();
        startPresent();
    },[]);

    window.addEventListener('popstate', function(event) {
        closePresentation({presentationId: id})
    });

    const onIndex=(e)=>{
        setActiveIndex(e.activeIndex)
        nextSlide({slideId: slideList[e.activeIndex]?.id}).then((response) => {
        })
    }


    return (
      <>
          <Swiper
            slidesPerView={1}
            autoHeight={true}
            // setWrapperSize={true}
            initialSlide={activeIndex}
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