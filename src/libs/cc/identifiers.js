export const ID_BY = 'http://creativecommons.org/licenses/by/4.0/';
export const ID_BY_ND = 'http://creativecommons.org/licenses/by-nd/4.0/';
export const ID_BY_SA = 'http://creativecommons.org/licenses/by-sa/4.0/';
export const ID_BY_NC = 'http://creativecommons.org/licenses/by-nc/4.0/';
export const ID_BY_NC_ND = 'http://creativecommons.org/licenses/by-nc-nd/4.0/';
export const ID_BY_NC_SA = 'http://creativecommons.org/licenses/by-nc-sa/4.0/';

let nameMapping = {};
nameMapping[ID_BY] = 'Namensnennung';
nameMapping[ID_BY_ND] = 'Namensnennung-Keine Bearbeitung';
nameMapping[ID_BY_SA] = 'Namensnennung - Weitergabe unter gleichen Bedingungen';
nameMapping[ID_BY_NC] = 'Namensnennung-Nicht kommerziell';
nameMapping[ID_BY_NC_ND] = 'Namensnennung - Nicht-kommerziell - Keine Bearbeitung';
nameMapping[ID_BY_NC_SA] = 'Namensnennung - Nicht-kommerziell - Weitergabe unter gleichen Bedingungen';

export const ccNames = nameMapping;
