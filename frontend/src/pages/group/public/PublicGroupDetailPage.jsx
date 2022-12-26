import React from "react";
import ListMemberPresentationComponent from "../../../components/group/detail/ListMemberPresentationComponent";

const PublicGroupDetailPage = () => {

    // const location=useLocation();
    // const type = location.pathname.split("/")[2];


    return (
      <>
          <article className="content items-list-page" style={{minHeight: "100vh"}}>
              <div className="card sameheight-item" data-exclude="xs" id="dashboard-history">
                  <div className="card-header card-header-sm bordered">
                      <div className="header-block">
                          <h3 className="title">Detail </h3>
                      </div>
                      <ul className="nav nav-tabs pull-right" role="tablist">
                          <li className="nav-item">
                              <a className="nav-link active show" href="#downloads" role="tab" data-toggle="tab"
                                 aria-selected="false">List Member</a>
                          </li>
                      </ul>
                  </div>
                  <div className="card-block">
                      <div className="tab-content">
                          <div role="tabpanel" className="tab-pane fade active show" id="downloads">
                              {/*{type === "created" ? <ListMemberPresentationComponent/> : <ListMemberJoined/>}*/}
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