const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownS = document.querySelectorAll(".dropdown .select");

const btn =  document.querySelector("button");

const fromCurr = document.querySelector(".from .select-container select");
const toCurr = document.querySelector(".to .select-container select");
let msg = document.querySelector("#msg");

for(let select of dropdownS)
{
    for (code in countryList){
    let newOption = document.createElement("option");
    newOption.innerText= code;
    newOption.value= code;
    if(select.name==="from" && code==="USD"){
        newOption.selected=true;
    }
    if(select.name==="to" && code==="NPR"){
        newOption.selected= true;
    }

    select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

}


const updateFlag = (element) => {
    let code= element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;   
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const fromURL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(fromURL);
    // console.log(response);
    // let json = await fetchJSON(`/currencies/{fromCurr}`)
    // let rate = json[fromCurr][toCurr];
    // console.log(json,rate);
    // const toURL=`${BASE_URL}/${toCurr.value.toLowerCase()}.json`;
    // let reply = await fetch(toURL);
    // console.log(reply);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
})