const MemberCard = ({email, userMame, imageUrl, score, role}) => {
  return (
    <li className="item">
      <div className="item-row">
        <div className="item-col fixed item-col-check">
          <label className="item-check" id="select-all-items">
            <input type="checkbox" className="checkbox"/>
            <span></span>
          </label>
        </div>
        <div className="item-col fixed item-col-img md">
          <a href="item-editor.html">
            <div className="item-img rounded"
                 style={{backgroundImage: `url(${imageUrl})`}}></div>
          </a>
        </div>
        <div className="item-col fixed pull-left item-col-title">
          <div className="item-heading">Name</div>
          <div>
            <a href="item-editor.html" className="">
              <h4 className="item-title"> {userMame} </h4>
            </a>
          </div>
        </div>
        <div className="item-col item-col-sales">
          <div className="item-heading">Score</div>
          <div style={{marginRight:"20px"}}> {score}</div>
        </div>


        <div className="item-col item-col-author">
          <div className="item-heading">Role</div>
          <div className="no-overflow" style={{marginLeft:"10px"}}>
            <a href="#">{role}</a>
          </div>
        </div>
        <div className="item-col item-col-date">
          <div className="item-heading">Email</div>
          <div className="no-overflow"> {email}</div>
        </div>
        <div className="item-col fixed item-col-actions-dropdown">
          <div className="item-actions-dropdown">
            <a className="item-actions-toggle-btn">
                                                <span className="inactive">
                                                    <i className="fa fa-cog"></i>
                                                </span>
              <span className="active">
                                                    <i className="fa fa-chevron-circle-right"></i>
                                                </span>
            </a>
            <div className="item-actions-block">
              <ul className="item-actions-list">
                <li>
                  <a className="remove" href="#" data-toggle="modal" data-target="#confirm-modal">
                    <i className="fa fa-trash-o "></i>
                  </a>
                </li>
                <li>
                  <a className="edit" href="item-editor.html">
                    <i className="fa fa-pencil"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default MemberCard