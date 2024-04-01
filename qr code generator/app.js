const wrapper = document.querySelector(".wrapper"),
qrinput = wrapper.querySelector(".form input"),    
generatebtn = wrapper.querySelector(".form button"),
qrimg = wrapper.querySelector(".qr-code img");


generatebtn.addEventListener("click", () => {
    let qrvalue = qrinput.value;
    if (!qrvalue) return;
    generatebtn.innerText="Generating QR Code..."
    qrimg.src = `http://api.qrserver.com/v1/create-qr-code/?data=${qrvalue}&size=200x200`
    qrimg.addEventListener("load",()=>{
        wrapper.classList.add("active")
        generatebtn.innerText="Generate QR Code"
    }); 
});

qrinput.addEventListener("keyup",()=>{
    if (!qrinput.value) {
        wrapper.classList.remove("active")
        
    }
})