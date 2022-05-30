let cityList =[
    {
        cityName:"Барнаул",
        cityID: 1,
        cityStock: true
    },
    {
        cityName:"Новосибирск",
        cityID: 2,
        cityStock: false
    },
    {
        cityName:"Бийск",
        cityID: 3,
        cityStock: false
    },
    {
        cityName:"Заринск",
        cityID: 4,
        cityStock: false
    },
    {
        cityName:"Искитим",
        cityID: 5,
        cityStock: true
    }
  ];
  
  let wayList =[
    {
        cityStart: 1,
        cityFinish: 2,
        longWay: 35
    },
    {
        cityStart: 2,
        cityFinish: 4,
        longWay: 30
    },
    {
        cityStart: 3,
        cityFinish: 4,
        longWay: 50
    },
    {
        cityStart: 4,
        cityFinish: 3,
        longWay: 25
    },
    {
        cityStart: 5,
        cityFinish: 1,
        longWay: 40
    },
    {
        cityStart: 2,
        cityFinish: 1,
        longWay: 15
    },
    {
        cityStart: 3,
        cityFinish: 2,
        longWay: 45
    },
    {
        cityStart: 1,
        cityFinish: 3,
        longWay: 25
    },
    {
        cityStart: 5,
        cityFinish: 4,
        longWay: 20
    },
    {
        cityStart: 3,
        cityFinish: 5,
        longWay: 10
    },
  ]; 
  
  
  document.body.onload = addElement();
  
  
  let button = document.getElementById("clickButton");
  button.addEventListener("click", eventt);
  let cityValue = document.getElementById("cityID");
  cityValue.setAttribute("max", cityList.length);
  
  
  function addElement(){
    const seeCityList = cityList.map(function (city) {
        return "id:" + city.cityID + "; город: " + city.cityName + "<br>";
    }).join("");
  
    let newList = document.createElement ("div");
    newList.innerHTML = seeCityList;
  
    let listDiv = document.getElementById("cityList");               
    listDiv.before(newList);
  }
  
  
  function eventt() {
  let answerTest = document.getElementById("answerDiv");
  let cityFinishID = document.getElementById("cityID").value;
  let city;
  let answer = document.createElement("div");
  answer.id = 'answerDiv';
  
  
  
  for (let i = 0; i < cityList.length; i++) {
        if(cityList[i].cityID == cityFinishID) {
        city = cityList[i];
        }
    }
  
  
    if(answerTest){
        answerTest.remove();
    }
  
    
    if(city.cityStock) {
        answer.innerHTML = "<p id='1'> В городе " + city.cityName + " есть склад. </p>";
    } else {
        wayAnswer = calcWay(city);
        answer.innerHTML = "<p id='1'> В городе " + city.cityName + " нет склада. Груз поедет из города " + wayAnswer.way.cityName + 
        ", дорога протяженностью " + wayAnswer.minWay + "км </p>";
    }
    
  
    let placeAnswer = document.getElementById("clickButton");
    placeAnswer.after(answer);
  }
  

  function calcWay(cityStart){
    let elemWay = [];
    let actualWay = [];
    let expulsion = [];
    let indexMinCity;
    let way;
    let minWay;
  

    if(!elemWay[0]){ 
        for (let i = 0; i < cityList.length; i++) {
            if(cityList[i] == cityStart) {
                elemWay.push(0);
            } else {
                elemWay.push(Infinity);
            }
        }
    }


    for(let i = 0; expulsion.length < cityList.length || i == 20; i++){ 
        let min = Infinity;

        for (let i = 0; i < cityList.length; i++){ 
            if(elemWay[i] < min && actualWay.indexOf(cityList[i]) == -1 && expulsion.indexOf(cityList[i]) == -1) {
                min = elemWay[i]; 
                indexMinCity = i;
            }
        }

        if(indexMinCity !== undefined){
            actualWay.push(cityList[indexMinCity]);
        }
  
        let thisCity = actualWay[actualWay.length-1];
        let newWay = getWay(thisCity);

  
        let testForInfinity = [];
        for(let i = 0; i < cityList.length; i++){
            if((actualWay.indexOf(cityList[i]) && expulsion.indexOf(cityList[i]) == -1) || newWay[i] == Infinity) {
                testForInfinity.push(false);
            } else { 
                testForInfinity.push(true);
            }
  
        }


        if(testForInfinity.indexOf(true) != -1){
            expulsion.push(actualWay.pop());
        }
  
        
        for(let i = 0; i < cityList.length; i++) {
            if(newWay[i] !==Infinity && newWay[i]+elemWay[cityList.indexOf(thisCity)] < elemWay[i]) {
                elemWay.splice(i, 1, newWay[i]+elemWay[cityList.indexOf(thisCity)]);
            }
        }
        

        minWay = Infinity;
  
        for (let i = 0; i < cityList.length; i++){
            if(elemWay[i] < minWay && cityList[i].cityStock) {
  
                minWay = elemWay[i];
                way = cityList[i];
            }
        }
    }
    return {
        way, minWay
    }
  }
  
function getWay(cityStart){
    let elemWayCompare = [];
  

    for (let i = 0; i < cityList.length; i++) {
        if(cityList[i] == cityStart) {
            elemWayCompare.push(0);
            
        } else {
            let start = cityStart.cityID; 
            let finish = cityList[i].cityID;
            let longWay = Infinity;

            for (let i = 0; i < wayList.length; i++){
                if(wayList[i].cityStart == start && wayList[i].cityFinish == finish) {
                    longWay = wayList[i].longWay;
                }
            }
            elemWayCompare.push(longWay);
        }
    }
  

    return (elemWayCompare);
}