
import {useNavigate} from "react-router-dom";

const ErrorPage=()=>{
  const navigate=useNavigate();
  return (
    <article className="content" style={{background:"#4f5f6f"}}>
      <div className="error-card global">
        <div className="error-title-block">
          <h1 className="error-title">404</h1>
          <h2 className="error-sub-title"> Sorry, page not found </h2>
        </div>
        <div className="error-container visible">
          <p>You better try our awesome search:</p>
          <br/>
          <a className="btn btn-primary" onClick={()=>navigate("/")}>
            <i className="fa fa-angle-left"></i> Back to Dashboard </a>
        </div>
      </div>
    </article>
  )
}

export default ErrorPage