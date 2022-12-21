import ListMemberPresentationComponent from "../../components/group/detail/ListMemberPresentationComponent";
import React, {useEffect, useState} from "react";
import ListPresentationComponent from "../../components/group/detail/ListPresentationComponent";
import {getInvitation, getListPresentation} from "../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";

const PresentationList = () => {
    const [data, setData] = useState([])
    const dataProfile = useSelector(state => state.loginPage);
    const email = dataProfile.profile.email;
    const loadData = ({type}) => {
        if(type === "created") {
            getListPresentation({email}).then((response) => {

                if (response.status == 200) {
                    console.log(response.data)
                    setData(response.data)
                }
            })
        } else {
            getInvitation({email}).then((response) => {
                if (response.status == 200) {
                    console.log(response.data)
                    setData(response.data)
                }
            })
        }
    }

    useEffect(() => {
        loadData({type:"created"})
    }, []);


    return (
        <>
            <article className="content items-list-page" style={{minHeight: "100vh"}}>
                <div className="card sameheight-item" data-exclude="xs" id="dashboard-history">
                    <div className="card-header card-header-sm bordered">
                        <div className="header-block">
                            <h3 className="title">Presentations </h3>
                        </div>
                        <ul className="nav nav-tabs pull-right" role="tablist" onClick={(e) => {
                           loadData({type: e.target.id})
                        }}>
                            <li className="nav-item">
                                <a className="nav-link" href="#visits" id="invited" role="tab" data-toggle="tab"
                                   aria-selected="true">Presentation Invitations</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active show" href="#downloads" id="created" role="tab" data-toggle="tab"
                                   aria-selected="false">List of Presentations</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-block">
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane fade" id="visits">
                                <ListPresentationComponent type={"invited"} data={data} loadData={loadData}/>
                                <div id="dashboard-visits-chart"
                                     style={{position: "relative", "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"}}>
                                    <div className="morris-hover morris-default-style" style={{display: "none"}}></div>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane fade active show" id="downloads">
                                <ListPresentationComponent type={"created"} data={data} loadData={loadData}/>
                                <div id="dashboard-downloads-chart"
                                     style={{position: "relative", "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"}}>
                                    <div className="morris-hover morris-default-style" style={{display: "none"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>


        </>
    )
}

export default PresentationList