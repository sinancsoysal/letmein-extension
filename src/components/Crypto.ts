import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require("crypto-js");


const dynamicValue = '12/12/2021'; // Could use a date or something dynamic

export function AESEncrypt(pureText: any) {    
    const privateKey=`${dynamicValue} secret key 123`;    
    var ciphertext = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(pureText), privateKey).toString());    
    return ciphertext;
}

export function AESDecrypt(encryptedText: string) {  
    const privateKey=`${dynamicValue} secret key 123`;    
    var bytes  = CryptoJS.AES.decrypt(decodeURIComponent(encryptedText), privateKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));    
    return decryptedData;
}

export function Sha256Hash(id: any, first: any, last: any) {    
    const pureText = `${first}-${id}-${last}`;
    const privateKey=`${dynamicValue} secret key 123`;    
    var hash = encodeURIComponent(Base64.stringify(hmacSHA512(pureText, privateKey)));    
    return hash;
}