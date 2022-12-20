import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Notification from "../../../components/notification/Notification";
import * as constraintNotification from "../../../components/notification/Notification.constraints"
import {addNewPresentation, getListPresentation} from "../../../apis/presentation/presentationAPI";
import {useSelector} from "react-redux";
import PresentationCardComponent from "../../../components/group/public/PresentationCardComponent";
import ListPresentationComponent from "../../../components/group/detail/ListPresentationComponent";
import ListMemberPresentationComponent from "../../../components/group/detail/ListMemberPresentationComponent";

const PublicGroupDetailPage = () => {
    const location=useLocation();

    return (
      <>
          <article className="content items-list-page" style={{minHeight:"100vh"}}>
              <div className="card sameheight-item" data-exclude="xs" id="dashboard-history">
                  <div className="card-header card-header-sm bordered">
                      <div className="header-block">
                          <h3 className="title">Detail </h3>
                      </div>
                      <ul className="nav nav-tabs pull-right" role="tablist">
                          {/*<li className="nav-item">*/}
                          {/*    <a className="nav-link" href="#visits" role="tab" data-toggle="tab"*/}
                          {/*       aria-selected="true">List Presentation</a>*/}
                          {/*</li>*/}
                          <li className="nav-item">
                              <a className="nav-link active show" href="#downloads" role="tab" data-toggle="tab"
                                 aria-selected="false">List Member</a>
                          </li>
                      </ul>
                  </div>
                  <div className="card-block">
                      <div className="tab-content">
                          {/*<div role="tabpanel" className="tab-pane fade" id="visits">*/}
                          {/*  <ListPresentationComponent />*/}
                          {/*    <div id="dashboard-visits-chart"*/}
                          {/*         style={{position: "relative", "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"}}>*/}
                          {/*        <div className="morris-hover morris-default-style" style={{display: "none"}}></div>*/}
                          {/*    </div>*/}
                          {/*</div>*/}
                          <div role="tabpanel" className="tab-pane fade active show" id="downloads">
                              <ListMemberPresentationComponent/>
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

export default PublicGroupDetailPage