const fromtext=document.querySelector(".from-text"),
totext=document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selecttag=document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translatebtn=document.querySelector("button");


selecttag.forEach((tag,id) =>{
    for(const country_code in countries){
        //default şekilde ing-turkce ....
        let selected;
        if (id==0   &&  country_code=="en-GB"){
            selected="selected";
        }
        else if(id==1 && country_code=="tr-TR"){
            selected="selected";
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);//select tag in içine option kısmını ekle...

    }
});

exchageIcon.addEventListener("click",()=>{
    let temptext=fromtext.value,
    templang=selecttag[0].value;
    fromtext.value=totext.value;
    selecttag[0].value=selecttag[1].value;
    totext.value=temptext;
    selecttag[1].value=templang;
    
})


translatebtn.addEventListener("click",()=>{
    let text=fromtext.value,
    translateform=selecttag[0].value, //
    translateto=selecttag[1].value;
    if (!text) return;
    totext.setAttribute("placeholder","translating...");
        
     //
    let apiurl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateform}|${translateto}`;
    fetch(apiurl)
    .then(response=>response.json())
    .then(data=>{
        totext.value=data.responseData.translatedText;
        totext.setAttribute("placeholder","translatione");
    })


});




icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        if (target.classList.contains("fa-copy")) {
            //kopyala iconuna basıldıgında girileni ve gelen degeri kopyalar
            if(target.id=="from"){
                navigator.clipboard.writeText(fromtext.value);
            }
            else{
                navigator.clipboard.writeText(totext.value);
            }
            
        }else{
            let utterance;
            if (target.id=="from") {
                utterance=new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang=selecttag[0].value;
            }
            else{
                utterance=new SpeechSynthesisUtterance(totext.value);
                utterance.lang=selecttag[1].value;
            }
            speechSynthesis.speak(utterance);
            
        }
    })
})