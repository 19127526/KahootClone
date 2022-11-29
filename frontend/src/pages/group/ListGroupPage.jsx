import {Col, Container} from "react-bootstrap";
import {Button, Divider, List, Modal, Row, Skeleton, Tabs} from "antd";
import Search from "antd/es/input/Search";
import {PlusCircleFilled} from "@ant-design/icons";
import OTPCreateGroup from "../../components/otpcreategroup/OTPCreateGroup";
import {useState, useEffect} from "react";
import GroupContent from "./GroupContent";



const ListGroupPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const pages = [
        {
            label: `Joined Groups`,
            key: 1,
            children: GroupContent("joined"),
        },
        {
            label: `Created Groups`,
            key: 2,
            children: GroupContent("created"),
        }
    ];

    return (

        <div className="container-profile">
            <div className="body__overlay"></div>
            <img src="img/body-img.jpg" alt="Hermoso fondo de pantalla" className="body__img"/>
            <div className="main-content" style={{background:"white", border:"dashed", overflow:"auto"}}>
                <Container style={{padding: 20}}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                    />
                    <div style={{height: 10}}/>
                        <Tabs
                            tabBarExtraContent={
                                <Button type="primary" shape="round" icon = {<PlusCircleFilled />} onClick={showModal}/>
                            }
                            defaultActiveKey="1"
                            type="card"
                            size={"large"}
                            items={pages}
                        />
                </Container>

                <OTPCreateGroup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </div>
        </div>
    );
}



export  default ListGroupPage