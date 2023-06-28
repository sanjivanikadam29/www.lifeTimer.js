let isDOBOpen = 'false';
let dateOfBirth;
const settingcogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingcontent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTextEl = document.getElementById("afterDOBBtnText");
const dobButtonEl = document.getElementById('dobButton');
const dobinputEl = document.getElementById("dobinput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minutesEl = document.getElementById("minutes");
const secondEl = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
  return number > 9 ? number : `0${number}`;
}


const toggleDateOfBirthSelector =() =>{
        if(isDOBOpen){
            settingContentEl.classList.add("hide");
        }
        else{
            settingContentEl.classList.remove("hide");
        }

        isDOBOpen = !isDOBOpen;

        console.log('toggle',isDOBOpen);
};


const updateAge = ()=>{
  const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;
  const year = Math.floor(dateDiff/(1000*60*60*24*365));
  const month = Math.floor(dateDiff/(1000*60*60*24*365) % 12);
  const day = Math.floor(dateDiff/(1000*60*60*24))%30;
  const hour = Math.floor(dateDiff/(1000*60*60))%24;
  const minutes = Math.floor(dateDiff/(1000*60))%60;
  const second = Math.floor(dateDiff/1000)%60;

  yearEl.innerHTML=  makeTwoDigitNumber (year);
  monthEl.innerHTML=  makeTwoDigitNumber (month);
  dayEl.innerHTML=  makeTwoDigitNumber (day);
  hourEl.innerHTML=  makeTwoDigitNumber (hour);
  minutesEl.innerHTML=  makeTwoDigitNumber (minutes);
  secondEl.innerHTML=  makeTwoDigitNumber(second);
}

const setDOBHandler = () =>{
     const  dateString = dobinputEl.value;

      dateOfBirth = dateString ? new Date(dateString) : null;

      const year = localStorage.getItem("year");
      const month = localStorage.getItem("month");
      const date = localStorage.getItem("date");

      if(year && month && date){
        console.log({
          year,month,date
        });
        dateOfBirth = new Date(year,month,date)
      }

      if(dateOfBirth){

         localStorage.setItem("year",dateOfBirth.getFullYear());
         localStorage.setItem("month",dateOfBirth.getMonth());
         localStorage.setItem("date",dateOfBirth.getDate());
       
        initialTextEl.classList.add('hide')
        afterDOBBtnTextEl.classList.remove('hide')

        setInterval(()=>updateAge(),1000);
      }
      else{
        afterDOBBtnTextEl.classList.add('hide')
        initialTextEl.classList.remove('hide')
      }
}

setDOBHandler();



settingcogEl.addEventListener("click",toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click",setDOBHandler)
