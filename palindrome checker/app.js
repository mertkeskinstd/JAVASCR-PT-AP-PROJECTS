const button=document.querySelector("#btn");
const inputtext=document.querySelector("#input-text");
const result=document.querySelector("#result");


button.addEventListener("click",()=>{
    const text=inputtext.value.trim();

    if (text.length==0) {
        alert("Lütfen burayı doldurunuz");
        return;
        
    }


    const cleantext=text.replace(/[^a-zA-Z0-9]/g,"").toLowerCase();

    const ispalindrome=cleantext===cleantext.split("").reverse("").join("");


    const messages=ispalindrome 
    ? `<span>Evet. </span>Bu bir PALİNDROME!`
    : `<span>Hayır. </span>Bu bir PALİNDROME değil!`;

    result.innerHTML=messages;
    result.classList.remove("error","success");
    setTimeout(()=>{
        result.classList.add(ispalindrome ? "success" : "error");
    },10)

});