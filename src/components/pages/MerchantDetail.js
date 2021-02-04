import React from "react";
import { Grid, Image } from "semantic-ui-react";
import QRCode from "qrcode.react";

export default function MerchantDetail(props) {
    console.log(props);
    const getPaymentUrl = (info) => {
      let url = 'https://dropp.test-app.link/gbgyyWKfR3?';
      const paymentDetails = {
        amount: parseFloat(info.amount),
        type: info.type,
        merchantAccount: info.merchantAccount,
        reference: "sdgfhdsiu",
        currency: "USD",
        thumbnail: info.thumbnail,
        description: info.description,
        url: info.url
      };
      const esc = encodeURIComponent;
      const validQueryParams = Object.keys(paymentDetails)
      .reduce((newObj, k) => ({ ...newObj, [k]: paymentDetails[k] }), {});
      const queryStr = Object.keys(validQueryParams)
        .map(p => esc(p) + '=' + esc(validQueryParams[p]))
        .join('&');
      console.log(url + queryStr);
      return (url + queryStr);
    };

    const getSize = () => {
      return (window.innerWidth < 768) ? 125 : 200;
    };

    return (
      <div className="merchant-section">
        <div>
          <Image src={props.info.bgImage} style={{width: "100%", height: "100%"}} />
          {/* <div style={{backgroundImage: `url(${props.info.bgImage})`, height: "100%", width: "100%", backgroundSize: "cover"}}></div> */}

          <div className={`detail-box ${props.info.bgClass}`}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <div className="detail-wrapper">
                    <div className="name">
                      {props.info.merchantName}
                    </div>
                    <div className="desc">
                      {props.info.description}
                    </div>
                    <div className="amount">
                      $ {props.info.amount}
                    </div>
                  </div>

                </Grid.Column>
                <Grid.Column>
                  <QRCode value={getPaymentUrl(props.info)} size={getSize()} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    );
}
