import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Pagination, Navigation} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useState} from "react";
import barchart from "../../assets/image/chart.png";
import ChartPresentation from "../../components/chart/ChartPresentation";
import SlidePresentation from "../../components/normal_slide/SlidePresentation";
import slide from "../../assets/image/slide.png";


const MainPresentation = () => {
    const [slideList, setListSlide] = useState([
        {
            "question": "Your question",
            "type": "chart",
            "preview": barchart,
            "content": {
                "labels": ["First", "Second", "Third", "Fourth"],
                "datasets": [
                    {
                        label: 'Data',
                        data: [10, 3, 0, 7],
                        backgroundColor: 'blue',
                    },
                ]
            }
        },
        {
            "type": "slide",
            "preview": slide,
            "content": {
                "heading": "Heading",
                "paragraph": "Paragraph",
                "image": "https://www.w3schools.com/w3css/img_lights.jpg"
            }
        },
        {
            "type": "slide",
            "preview": slide,
            "content": {
                "heading": "Heading",
                "paragraph": "Paragraph",
                "image": "https://www.w3schools.com/w3css/img_lights.jpg"
            }
        },
        {
            "question": "Your question",
            "type": "chart",
            "preview": barchart,
            "content": {
                "labels": ["First", "Second", "Third", "Fourth"],
                "datasets": [
                    {
                        label: 'Data',
                        data: [5, 0, 1, 0],
                        backgroundColor: 'blue',
                    },
                ]
            }
        },
        {
            "question": "Your question",
            "type": "chart",
            "preview": barchart,
            "content": {
                "labels": ["First", "Second", "Third", "Fourth"],
                "datasets": [
                    {
                        label: 'Data',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'blue',
                    },
                ]
            }
        },
        {
            "question": "Your question",
            "type": "chart",
            "preview": barchart,
            "content": {
                "labels": ["First", "Second", "Third", "Fourth"],
                "datasets": [
                    {
                        label: 'Data',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'blue',
                    },
                ]
            }
        },
        {
            "question": "Your question",
            "type": "chart",
            "preview": barchart,
            "content": {
                "labels": ["First", "Second", "Third", "Fourth"],
                "datasets": [
                    {
                        label: 'Data',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'blue',
                    },
                ]
            }
        }
    ]);

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
                modules={[Keyboard, Pagination, Navigation]}
            >
                {slideList.map((value, index) => {
                    return (<SwiperSlide style={{backgroundColor: "white", height:"100%", padding: "5%"}}>
                        {value.type === "chart" ? <ChartPresentation item={value} width={"165vh"}/> :
                            <SlidePresentation item={value}/>}
                    </SwiperSlide>)
                })}
            </Swiper>
        </>
    );
}

export default MainPresentation