

const FooterComponent=()=>{
  return (
    <footer className="clearfix">
      <div className="footer__logo">
        <a href="https://www.glab.vn"></a>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-4 col-xs-4">
              <div className="items__footer">
                <p className="item__title">Service &amp; Support</p>
                <p><a href="">glabvn@gmail.com</a></p>
                <p><a href="">+84945378809</a></p>
                <p><a href="https://goo.gl/maps/nFxWKN4ihUWKviNT6">Locations</a></p>
              </div>
            </div>
            <div className="col-sm-4 col-xs-4">
              <div className="items__footer">
                <p className="item__title">Info</p>
                <p><a href="https://www.glab.vn/page/consignment-term">Consignment Terms</a></p>
                <p><a href="https://www.glab.vn/page/about">Connect with Us</a></p>
                <p><a href="https://www.glab.vn/page/delivery-return">Delivery and Returns</a></p>
                <p><a href="https://www.glab.vn/page/faq">FAQs</a></p>
              </div>
            </div>
            <div className="col-sm-4 col-xs-4">
              <div className="items__footer">
                <p className="item__title">Follow Us</p>
                <p><a href="https://www.facebook.com/glab.vn/">Facebook</a></p>
                <p><a href="https://www.instagram.com/glab.vn/">Instagram</a></p>
                <p><a href="https://www.youtube.com/user/giaytv">Youtube</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">Copyright © 2018 GLAB.VN</div>

      <div className="container hide">
        <div className="footer__left">
          <a href=""><img src="/themes/v1/icons/logo-footer.svg"/></a>
        </div>
        <div className="footer__menu">
          <ul>
            <li><a href="">home</a></li>
            <li><a href="">store</a></li>
            <li><a href="">CONSIGNMENT</a></li>
            <li><a href="https://www.glab.vn/page/about">CONNECT WITH US</a></li>
            <li><a href="">LOCATION</a></li>
            <li><a href="">POLICY &amp; TERM</a></li>
          </ul>

        </div>
        <div className="footer__right">

          <div className="footer__right__social"><a href=""><span className="icon-facebook2"></span></a><a href=""><span
            className="icon-306026"></span></a><a href=""><span className="icon-play"></span></a>
          </div>
          <form id="frm-email" className="">
            <div className="frm-icon">
              <input type="text" placeholder="YOUR EMAIL"/>
              <button type="submit" className="icon-frm"><span className="icon-search"></span></button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent