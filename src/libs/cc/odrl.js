import {
  ID_BY_ND, ID_BY_SA, ID_BY_NC, ID_BY_NC_ND, ID_BY_NC_SA,
} from './identifiers';
import {
  URI_REPRODUCTION, URI_DISTRIBUTION, URI_DERIVATIVE_WORKS, URI_NOTICE, URI_ATTRIBUTION, URI_SHARE_ALIKE, URI_COMMERCIAL_USE,
} from './uris';

function ccIDToODRL(ccID) {
  const license = {
    '@context': 'http://www.w3.org/ns/odrl.jsonld',
    '@type': 'Set',
    uid: 'http://www.schulcloud.de/lernstore/lizenzen/license:0001.json',
  };

  license.permission = [
    { action: URI_REPRODUCTION },
    { action: URI_DISTRIBUTION },
  ];

  if (!isND(ccID)) {
    license.permission.push({ action: URI_DERIVATIVE_WORKS });
  }

  license.obligation = [
    { action: URI_NOTICE },
    { action: URI_ATTRIBUTION },
  ];

  if (isSA(ccID)) {
    license.obligation.push({ action: URI_SHARE_ALIKE });
  }

  if (isNC(ccID)) {
    license.prohibition = [{ action: URI_COMMERCIAL_USE }];
  }

  return license;
}

function isND(ccID) {
  return ccID === ID_BY_ND || ccID === ID_BY_NC_ND;
}

function isSA(ccID) {
  return ccID === ID_BY_SA || ccID === ID_BY_NC_SA;
}

function isNC(ccID) {
  return ccID === ID_BY_NC || ccID === ID_BY_NC_ND || ccID === ID_BY_NC_SA;
}

export { ccIDToODRL };
