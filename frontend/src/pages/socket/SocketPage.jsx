import {useEffect, useState} from "react";
import {over} from "stompjs"
import SockJS from 'sockjs-client';
import {SERVER_URL} from "../../configs/url";
import publicGroupPage from "../group/public/PublicGroupPage";
import {useLocation, useParams} from "react-router-dom";
import {nextSlide, startPresentation} from "../../apis/slide/slideAPI";
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper";
import ChartPresentation from "../../components/chart/Presentation/ChartPresentation";

let stompClient=null
const SocketPage=()=>{
  const [slideList, setListSlide] = useState([
    {}
  ]);
  const [received,setReceived]=useState([]);
  const location=useLocation();
  const [activeIndex,setActiveIndex] = useState(0)
  const {id} = useParams()





  console.log(slideList)
  useEffect(()=>{
    setListSlide(location.state.index)
  },[location.state.index]);

  const startPresent = () => {
    console.log(slideList)
    startPresentation({presentationId: id, slideId: slideList[0].id}).then((response) => {
      // setListSlide(response.data["questions"])
    })
  }


  useEffect(() => {
    startPresent()
    registerUser();
  },[])





  const onIndex=(e)=>{
    // console.log(slideList[e.activeIndex]["id"])
    setActiveIndex(e.activeIndex)
    console.log(slideList)
    nextSlide({slideId: slideList[e.activeIndex]?.id}).then((response) => {
    })
    // console.log(e.activeIndex)
  }

  console.log(slideList)

  const registerUser = () => {
    let Sock = new SockJS("https://spring-heroku.herokuapp.com/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }
  const onMessageReceived = (payload) => {
    console.log(slideList)
    console.log(payload)
    const data = JSON.parse(payload.body)
    console.log("ashdjkashdjkas",data)
    // let tempList =  slideList.map((value,index) => {
    //     if(value.id === data.id){
    //        return data
    //     }
    //     return value
    // })
    // // console.log(slideList)
    // // console.log(tempList)
    // setListSlide(tempList)

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

export default SocketPage