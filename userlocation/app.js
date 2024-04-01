const button=document.querySelector("button");

const APIKEY="yourapi key"

button.addEventListener("click",()=>{
    if (navigator.geolocation) {
        button.innerText="allow to detect location"
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
        
    }
    else{
        button.innerText="Tarayıcnız malesef desteklememektedir."
    }
});


function onSuccess(position) {
    button.innerText="Konumunuz bulunuyor..."
    let {latitude,longitude}=position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${APIKEY}`)
    .then(response=> response.json())
    .then(result=>{
        let alldetails=result.results[0].components;
        let{province,town,postcode,country}=alldetails;
        button.innerText=`${province}/${town} ${country}, ${postcode}`;
        console.table(alldetails);
    }).catch(()=>{
        button.innerText="Birşeyler yanlış gitti..."
    })
}
function onError(err) {
    if (err.code==1) {
        button.innerText="Tarayıcnız malesef desteklememektedir."
    }
    else if (err.code==2) {
        button.innerText="Konumunuz bulunamadı."
    }
    else{
        button.innerText="Bir şeyler yanlış gitti."
    }
    button.setAttribute("disabled","true")
}