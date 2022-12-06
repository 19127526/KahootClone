import CardGroupComponent from "../../../components/card/publicgroup/CardGroupComponent";


const PublicGroupPage=()=>{
  return(
    <article className="content charts-morris-page">
      <div className="title-block">
        <h3 className="title"> Public Group </h3>
        <p className="title-description"> List group is public </p>
        <section className="section">
          <div className="row">
            <div className="col-md-6" style={{padding:"10px"}}>
              <CardGroupComponent title={"Public Group"} subTitle={"Group Slide Viet Nam"}/>
            </div>
            <div className="col-md-6" style={{padding:"10px"}}>
              <CardGroupComponent title={"Public Group"} subTitle={"Group Slide Viet Nam"}/>
            </div>
            <div className="col-md-6" style={{padding:"10px"}}>
              <CardGroupComponent title={"Public Group"} subTitle={"Group Slide Viet Nam"}/>
            </div>
            <div className="col-md-6" style={{padding:"10px"}}>
              <CardGroupComponent title={"Public Group"} subTitle={"Group Slide Viet Nam"}/>
            </div>
            <div className="col-md-6" style={{padding:"10px"}}>
              <CardGroupComponent title={"Public Group"} subTitle={"Group Slide Viet Nam"}/>
            </div>
            <div className="col-md-6" style={{padding:"10px"}}>
              <CardGroupComponent title={"Public Group"} subTitle={"Group Slide Viet Nam"}/>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}


export default PublicGroupPage