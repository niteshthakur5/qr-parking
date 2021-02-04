import React from "react";
import queryString from 'querystring';
import * as nacl from "tweetnacl";
import axios from 'axios';
import { Loader } from "semantic-ui-react";


export default function ProcessPayment(props) {

  const paymentRequestHeaders = {
    'Content-Type': 'application/json',
    'X-API-KEY': props.activeMerchant.apiKey
  };

  const parseQueryParams = (queryparams) => {
    if (!queryparams) {
      return {};
    }
    queryparams = queryparams.replace('?', '');
    return queryString.parse(queryparams);
  };

  const addMerchantSignature = (p2p, signingKey) => {
    p2p = JSON.parse(p2p);
    if (signingKey.startsWith("302e020100300506032b657004220420")) {
        signingKey = signingKey.slice(32);
    }
    const bytesToSign = [Buffer.from(p2p.signatures.payer, "hex")];
    const keyPair = nacl.sign.keyPair.fromSeed(new Uint8Array(Buffer.from(signingKey, "hex")));
    const merchantByteArray = nacl.sign.detached(
        new Uint8Array(Buffer.concat(bytesToSign)),
        keyPair.secretKey
    );
    p2p.signatures.merchant = Buffer.from(merchantByteArray.buffer).toString("hex");
    return p2p;
  }

  const getSignedData = (p2p) => {
    return addMerchantSignature(p2p, props.activeMerchant.signingKey);
  }

  const params = parseQueryParams(props.location.search);
  if (params && params.p2p) {
    console.log(params.p2p);
    const objJsonStr = JSON.stringify(params.p2p);
    const objJsonB64 = Buffer.from(objJsonStr).toString("base64");
    console.log(objJsonB64);
    fetch(`/api/accounts/mainnet/p2p?p2p=${objJsonB64}`, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      console.log(data);
      if (data.ok) {
        props.history.push(`/payments/${props.merchantName}/success?p2p=${objJsonStr}&getRequest=${`/api/accounts/mainnet/p2p?p2p=${objJsonB64}`}&Response=${data.status}`);
      } else {
        props.history.push(`/payments/error?p2p=${objJsonStr}&getRequest=${`/api/accounts/mainnet/p2p?p2p=${objJsonB64}`}&Response=${data.status}`);
      }

    }, (err) => {
      props.history.push(`/payments/error?p2p=${objJsonStr}&Response=${err.status}&getRequest=${`/api/accounts/mainnet/p2p?p2p=${objJsonB64}`}`);
    });
    // fetch.post('/api/accounts/mainnet/p2p', , {'Access-Control-Allow-Origin': '*'}).then((data) => {
    //   alert(data);
    //   props.history.push(`/payments/${props.merchantName}`);
    // }, (err) => {
    //   console.log(err);
    //   alert(err);
    //   props.history.push(`/payments/error`);
    // });

    // Try with adding merchant signing
    // const p2p = getSignedData(params.p2p);
    // if (p2p) {
    //   axios.post('http://api.dropp.cc/payment/processRequest', JSON.stringify({ methodName: "payMerchant", paymentData: p2p }), paymentRequestHeaders).then((data) => {
    //     console.log(data);
    //   }, (err) => {
    //     console.log(err);
    //   });
    // }
  }

  return (
    <div style={{marginTop: "10%"}}>
      <Loader active inline='centered'>Payment in progress...</Loader>
    </div>
  );

}