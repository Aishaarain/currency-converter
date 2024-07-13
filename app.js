const Base_Url = 'https://exchangeratespro.p.rapidapi.com/historical?';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6f6a3f406bmshdd7efea0dd6c831p12be6fjsn94db8338f395',
		'x-rapidapi-host': 'exchangeratespro.p.rapidapi.com'
	}
};

const dropdown=document.querySelectorAll(".drop_down select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const date= new Date();


for(let select of dropdown){
for (currcode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currcode;
    newOption.value=currcode;
    select.append(newOption);
if(select.name==="from" && currcode==="USD"){
    newOption.selected="selected";
}
else if(select.name==="to" && currcode==="PKR"){
        newOption.selected="selected";
    }
}

select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
});
}


const updateExchangeRate=()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue===" " || amtValue<1){
        amtValue=1;
        amount.value="1";
    }
    
    // const URL = `${Base_Url}&base=${fromCurr.value}&symbols=${toCurr.value}`;
    const URL = `${Base_Url}/${fromCurr.value.toUpperCase()}/${toCurr.value.toUpperCase()}.json`;
    fetch(URL, options).then(response=>response.json())
 .then((response)=>{
        console.log(response);
        
        let data =  response.rates;
        let rate = data[toCurr.value];
       
        
        let finalAmount = amtValue * rate;
        msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        console.log(rate);
        console.log(data);
        console.log(finalAmount);
        }).catch (error=>{
        console.log(error);
     });}
     


const updateflag=(element)=>{
let currcode= element.value;
let countrycode=countryList[currcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let image=element.parentElement.querySelector("img");
image.src=newsrc;
};
// 
btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
updateExchangeRate();
});

document.addEventListener("load",()=>{
updateExchangeRate();
});
