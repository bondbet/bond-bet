export const getUtcTimestamp = () => {
    let now = new Date;
    return Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()) / 1000;
}

export const formatToHumatReadableDate = (timestamp) =>{

let a = new Date(timestamp * 1000);
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let year = a.getFullYear();
let month = months[a.getMonth()];
let date = a.getDate();
let hour = a.getHours();
let min = a.getMinutes();
let sec = a.getSeconds();
let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
return time;
}
// } new Date(timestamp).toLocaleDateString()