const cars = () => {
    const car1 = creatImgCar("images/car1.png", "img-car");
    const car2 = creatImgCar("images/car2.png", "img-car");
    const car3 = creatImgCar("images/car3.png", "img-car");
    const car4 = creatImgCar("images/car4.png", "img-car");
    
    const carsImg = [car1, car2, car3, car4];
    return carsImg;
};

let arrTotalTime = [];

const numCars = () => {
    const numStr = document.querySelector("#num");
    const numValue = parseInt(numStr.value, 10);
    return numValue;
}

const creatImgCar = (src, className) => {
    const img = document.createElement("img");
    img.setAttribute("class", className);
    img.setAttribute("src", src);
    return img;
};

const racingCarsDiv = () => {
    const racingDiv = document.createElement("div");
    racingDiv.setAttribute("class", "racing-cars");
    return racingDiv;
}

const finishLine = () => {
    const line = document.createElement("div");
    line.setAttribute("class", "finish-line");
    return line;
}

const butoonCleir = () => {
    const divButoon = document.createElement("div");
    divButoon.setAttribute("id", "div-butoon");
    const butoon = document.createElement("button");
    butoon.setAttribute("id", "botoon-cleir");
    butoon.innerText = "Start over";
    divButoon.appendChild(butoon);

    // הגדרת אירוע הכפתור בצורה נכונה
    butoon.addEventListener("click", clickButoonCleir);

    return divButoon;
}

const clickButoonCleir = () => {
    const listCars = document.querySelector(".list-cars");
    listCars.innerHTML = ""; // איפוס התוכן
    arrTotalTime = []; // איפוס תוצאות המירוץ
}

const result = () => {
    const arrId = ["h3-blue", "h3-red", "h3-green"];
    const divH3 = document.createElement("div");
    divH3.setAttribute("id", "div-h3");
    const listCars = document.querySelector(".list-cars");
    listCars.appendChild(divH3);
    let i = 0;
    let j = 1
    arrTotalTime.forEach((car) => {
        const resultH3 = document.createElement("h3");
        resultH3.innerHTML = `זמן שלקח ${car.time} שניות, מסלול ${car.idx}, מקום ${j++}`;
        resultH3.setAttribute("id", arrId[i++]);
        divH3.appendChild(resultH3);
    });

    // הוספת כפתור "Start over" רק פעם אחת לאחר סיום המירוץ
    listCars.appendChild(butoonCleir());
}

const randomCarIsDriving = (car, idx) => {
    let position = 0;
    const leftDate = Date.now();
    const raceInterval = setInterval(() => {
        if (position >= 94) {
            clearInterval(raceInterval);
            const rightDate = Date.now();
            const totalTime = (rightDate - leftDate) / 1000;
            const time = totalTime.toFixed(2);
            arrTotalTime.push({ idx, time });
            if (arrTotalTime.length === numCars() || arrTotalTime.length === 3) {
                result(); // הצגת התוצאות כאשר כל המכוניות סיימו
            }
        } else {
            const randomSpeed = Math.random() * 2;
            position += randomSpeed;
            car.style.paddingLeft = position + '%';
            if(arrTotalTime.length === 3){
                clearInterval(raceInterval);
            }
        }
    }, 100);
};

const createRace = (num) => {
    arrTotalTime = []; // איפוס תוצאות קודמות
    const arrImgCar = cars().slice(0, num);
    const listCars = document.querySelector(".list-cars");
    listCars.innerHTML = ""; // איפוס המסלול לפני מרוץ חדש
    for (let i = 0; i < num; i++) {
        const racing = racingCarsDiv();
        racing.appendChild(arrImgCar[i]);
        racing.appendChild(finishLine());
        listCars.appendChild(racing);
    }
    arrImgCar.forEach((car, idx) => randomCarIsDriving(car, idx + 1));
}

const clickButoonMain = () => {
    const numStr = document.querySelector("#num");
    const numValue = parseInt(numStr.value, 10);
    createRace(numValue);
}

const butoonMain = document.querySelector("#button-main");
butoonMain.addEventListener("click", clickButoonMain);
