import React from "react";


const HomePage = () => {
  return (
   /* <article className="content charts-flot-page">
      <div className="title-block">
        <h3 className="title"> Charts Flot </h3>
        <p className="title-description"> List of sample charts with custom colors </p>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-block">
                <div className="card-title-block">
                  <h3 className="title"> Bar Chart Example </h3>
                </div>
                <section className="example">
                  <div className="flot-chart">
                    <div className="flot-chart-content" id="flot-bar-chart" style="padding: 0px; position: relative;">
                      <canvas className="flot-base" width="815" height="281"
                              style={{direction: "ltr", position: "absolute", left: "0px", top: "0px", width: "652.8px", height: "225px"}}></canvas>
                      <div className="flot-text"
                           style={{position: "absolute", inset: "0px", fontSize: "smaller", color: "rgb(84, 84, 84)"}}>
                        <div className="flot-x-axis flot-x1-axis xAxis x1Axis" style="position: absolute; inset: 0px;">
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "75px", top: "205px", left: "17px", textAlign: "center"}}>1
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "75px", top: "205px", left: "17px", textAlign: "center"}}>2
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "75px", top: "205px", left: "17px", textAlign: "center"}}>3
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "75px", top: "205px", left: "17px", textAlign: "center"}}>4
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "75px", top: "205px", left: "17px", textAlign: "center"}}>5
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "75px", top: "205px", left: "17px", textAlign: "center"}}>6
                          </div>
                        </div>
                        <div className="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; inset: 0px;">
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 190px; left: 8px; text-align: right;">0
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 152px; left: 0px; text-align: right;">10
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 114px; left: 0px; text-align: right;">20
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 76px; left: 0px; text-align: right;">30
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 38px; left: 0px; text-align: right;">40
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 0px; left: 0px; text-align: right;">50
                          </div>
                        </div>
                      </div>
                      <canvas className="flot-overlay" width="815" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 652.8px; height: 225px;"></canvas>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-block">
                <div className="card-title-block">
                  <h3 className="title"> Line Cahrt Example </h3>
                </div>
                <section className="example">
                  <div className="flot-chart">
                    <div className="flot-chart-content" id="flot-line-chart" style="padding: 0px; position: relative;">
                      <canvas className="flot-base" width="815" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 652.8px; height: 225px;"></canvas>
                      <div className="flot-text"
                           style="position: absolute; inset: 0px; font-size: smaller; color: rgb(84, 84, 84);">
                        <div className="flot-x-axis flot-x1-axis xAxis x1Axis" style="position: absolute; inset: 0px;">
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; max-width: 87px; top: 205px; left: 17px; text-align: center;">1
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; max-width: 87px; top: 205px; left: 142px; text-align: center;">2
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; max-width: 87px; top: 205px; left: 267px; text-align: center;">3
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; max-width: 87px; top: 205px; left: 391px; text-align: center;">4
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; max-width: 87px; top: 205px; left: 516px; text-align: center;">5
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; max-width: 87px; top: 205px; left: 641px; text-align: center;">6
                          </div>
                        </div>
                        <div className="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; inset: 0px;">
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 190px; left: 8px; text-align: right;">0
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 152px; left: 0px; text-align: right;">10
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 114px; left: 0px; text-align: right;">20
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 76px; left: 0px; text-align: right;">30
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 38px; left: 0px; text-align: right;">40
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 0px; left: 0px; text-align: right;">50
                          </div>
                        </div>
                      </div>
                      <canvas className="flot-overlay" width="815" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 652.8px; height: 225px;"></canvas>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-block">
                <div className="card-title-block">
                  <h3 className="title"> Pie Chart Example </h3>
                </div>
                <section className="example">
                  <div className="flot-chart">
                    <div className="flot-chart-pie-content" id="flot-pie-chart"
                         style="padding: 0px; position: relative;">
                      <canvas className="flot-base" width="281" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 225px; height: 225px;"></canvas>
                      <canvas className="flot-overlay" width="281" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 225px; height: 225px;"></canvas>
                      <div className="legend">
                        <div
                          style="position: absolute; width: 61px; height: 88px; top: 5px; right: 5px; background-color: rgb(255, 255, 255); opacity: 0.85;"></div>
                        <table style="position:absolute;top:5px;right:5px;;font-size:smaller;color:#545454">
                          <tbody>
                          <tr>
                            <td className="legendColorBox">
                              <div style="border:1px solid #ccc;padding:1px">
                                <div
                                  style="width:4px;height:0;border:5px solid rgb(183, 226, 136);overflow:hidden"></div>
                              </div>
                            </td>
                            <td className="legendLabel">Sales 1</td>
                          </tr>
                          <tr>
                            <td className="legendColorBox">
                              <div style="border:1px solid #ccc;padding:1px">
                                <div
                                  style="width:4px;height:0;border:5px solid rgb(158, 216, 95);overflow:hidden"></div>
                              </div>
                            </td>
                            <td className="legendLabel">Sales 2</td>
                          </tr>
                          <tr>
                            <td className="legendColorBox">
                              <div style="border:1px solid #ccc;padding:1px">
                                <div
                                  style="width:4px;height:0;border:5px solid rgb(133, 206, 54);overflow:hidden"></div>
                              </div>
                            </td>
                            <td className="legendLabel">Sales 3</td>
                          </tr>
                          <tr>
                            <td className="legendColorBox">
                              <div style="border:1px solid #ccc;padding:1px">
                                <div
                                  style="width:4px;height:0;border:5px solid rgb(107, 168, 41);overflow:hidden"></div>
                              </div>
                            </td>
                            <td className="legendLabel">Sales 4</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-block">
                <div className="card-title-block">
                  <h3 className="title"> Live Chart Example </h3>
                </div>
                <section className="example">
                  <div className="flot-chart">
                    <div className="flot-chart-content" id="flot-line-chart-moving"
                         style="padding: 0px; position: relative;">
                      <canvas className="flot-base" width="815" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 652.8px; height: 225px;"></canvas>
                      <div className="flot-text"
                           style="position: absolute; inset: 0px; font-size: smaller; color: rgb(84, 84, 84);">
                        <div className="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; inset: 0px;">
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 185px; left: 35px; text-align: right;">0
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 145px; left: 28px; text-align: right;">25
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 105px; left: 28px; text-align: right;">50
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 66px; left: 28px; text-align: right;">75
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 26px; left: 20px; text-align: right;">100
                          </div>
                        </div>
                      </div>
                      <canvas className="flot-overlay" width="815" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 652.8px; height: 225px;"></canvas>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-block">
                <div className="card-title-block">
                  <h3 className="title"> Multiple Axes Line Chart Example </h3>
                </div>
                <section className="example">
                  <div className="flot-chart">
                    <div className="flot-chart-content" id="flot-line-chart-multi"
                         style={{padding: "0px", position: "relative"}}>
                      <canvas className="flot-base" width="815" height="281"
                              style={{direction: "ltr", position: "absolute", left: "0px", top: "0px", width: "652.8px", height: "225px"}}></canvas>
                      <div className="flot-text"
                           style="position: absolute; inset: 0px; font-size: smaller; color: rgb(84, 84, 84);">
                        <div className="flot-x-axis flot-x1-axis xAxis x1Axis" style={{position: "absolute", inset: "0px"}}>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "72px", top: "205px", left: "1px", textAlign: "center"}}>Jan
                            2007
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "72px", top: "205px", left: "1px", textAlign: "center"}}>Apr
                            2007
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "72px", top: "205px", left: "1px", textAlign: "center"}}>Jul
                            2007
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "72px", top: "205px", left: "1px", textAlign: "center"}}>Oct
                            2007
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "72px", top: "205px", left: "1px", textAlign: "center"}}>Jan
                            2008
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "72px", top: "205px", left: "1px", textAlign: "center"}}>Apr
                            2008
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style={{position: "absolute", maxWidth: "72px", top: "205px", left: "1px", textAlign: "center"}}>Jul
                            2008
                          </div>
                        </div>
                        <div className="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; inset: 0px;">
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 190px; left: 15px; text-align: right;">0
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 127px; left: 8px; text-align: right;">50
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 63px; left: 0px; text-align: right;">100
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 0px; left: 0px; text-align: right;">150
                          </div>
                        </div>
                        <div className="flot-y-axis flot-y2-axis yAxis y2Axis" style="position: absolute; inset: 0px;">
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 190px; left: 619px;">0.60€
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 142px; left: 619px;">0.65€
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 95px; left: 619px;">0.70€
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 47px; left: 619px;">0.75€
                          </div>
                          <div className="flot-tick-label tickLabel"
                               style="position: absolute; top: 0px; left: 619px;">0.80€
                          </div>
                        </div>
                      </div>
                      <canvas className="flot-overlay" width="815" height="281"
                              style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 652.8px; height: 225px;"></canvas>
                      <div className="legend">
                        <div
                          style="position: absolute; width: 166.262px; height: 44px; bottom: 30px; left: 33px; background-color: rgb(255, 255, 255); opacity: 0.85;"></div>
                        <table style="position:absolute;bottom:30px;left:33px;;font-size:smaller;color:#999999">
                          <tbody>
                          <tr>
                            <td className="legendColorBox">
                              <div style="border:1px solid #ccc;padding:1px">
                                <div style="width:4px;height:0;border:5px solid rgb(133,206,54);overflow:hidden"></div>
                              </div>
                            </td>
                            <td className="legendLabel">Oil price ($)</td>
                          </tr>
                          <tr>
                            <td className="legendColorBox">
                              <div style="border:1px solid #ccc;padding:1px">
                                <div style="width:4px;height:0;border:5px solid rgb(106,164,43);overflow:hidden"></div>
                              </div>
                            </td>
                            <td className="legendLabel">USD/EUR exchange rate</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>*/
    <></>
  );
}

export default HomePage;
