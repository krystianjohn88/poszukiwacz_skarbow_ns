// Autor Krystian John //
//Zmiene
let numberOfString = 24;
let dangonLvl = 0;
const plus = '(';
const minus = ')';
const tresures = '*';
const queryRoute = [plus, minus, tresures];
const lengthRandomString = queryRoute.length;
let selectedTypeOfRoute = '';
let stringWord = [];
let queryTresuresFound = [];
let queryTreuserToDangonLvl = [];
let sameLvlTreuser = 0;
let arrLvlOfRouteToIndex = [];
let arrDangonLvlTresuer = [];
let indexOfTresures = '';
const imgTreuser = document.querySelector("#Treuser");
let gTrigger = 0;
let sTrigger = 0;
const elementMap = document.querySelector("#gMap");
const elementBtnMap = document.querySelector("#map");
const dateInfo = document.querySelector("#treasureDate");

//tworze obiekt(tablice) z ciagiem znaków reprezentujący świat---------------------


const lenghtStringWord = stringWord.length;
//Funkcje
//Losowanie znaków do mapy------------------------------------------------
const randomString = function () {
    let queryRouteIndexSelect = Math.floor(Math.random() * (lengthRandomString));
    selectedTypeOfRoute = queryRoute[queryRouteIndexSelect];
    return selectedTypeOfRoute;
}

//funkcja do tworzenia randomowego świata z N wyrazów w ciagu----------------

const randomStringWord = function () {
    for (let i = 0; i < numberOfString; i++) {
        randomString();
        stringWord.push(selectedTypeOfRoute);
    }
}
//randomStringWord();

//szukam skarbu---------------------------------------------------------------

function foundTreasure() {
    for (let i = 0; i < numberOfString; i++) {
        if (stringWord[i] === '(') {
            dangonLvl++;
            arrLvlOfRouteToIndex.push([i, dangonLvl]);
        } else if (stringWord[i] === ')') {
            dangonLvl--;
            arrLvlOfRouteToIndex.push([i, dangonLvl]);
        } else {
            queryTresuresFound.push(i);
            queryTreuserToDangonLvl.push([i, dangonLvl]);
            arrLvlOfRouteToIndex.push([i, dangonLvl]);
        }
    };
    const lenghtQueryTreuserToDangonLvl = queryTreuserToDangonLvl.length;

    //licze ile jest skarbów na danym poziomie-------------------------------------
    for (let i = 0; i < lenghtQueryTreuserToDangonLvl; i++) {
        let numberDangonLvl = queryTreuserToDangonLvl[i][1];

        for (let iN = i + 1; iN < lenghtQueryTreuserToDangonLvl; iN++) {
            //            debugger;
            if (numberDangonLvl == queryTreuserToDangonLvl[iN][1]) {
                //                console.log('jaki pozion '+queryTreuserToDangonLvl[iN][1]);
                sameLvlTreuser++;
            }
            //           console.log('lvl '+sameLvlTreuser); 
        }
        arrDangonLvlTresuer.push([[sameLvlTreuser], [queryTreuserToDangonLvl[i][0]]]);
        sameLvlTreuser = 0;
    }
    //sprawdzam, w którym indexie jest skarb z założeniami że na danym poziomie ma być najwięcej skarów a index najmniejszy---
    function maxInArray() {
        let max = 0;
        let maxIndex;
        for (let i = 0; i < arrDangonLvlTresuer.length; i++) {

            if (arrDangonLvlTresuer[i][0] > max) {
                max = arrDangonLvlTresuer[i][0];
                maxIndex = arrDangonLvlTresuer[i][1];
            }

        }
        indexOfTresures = maxIndex;
        dateInfo.innerText = `Index pierwszego skarbu, których jest najwięcej na jednym poziomie to: ${maxIndex} i jest on na poziomie: ${arrLvlOfRouteToIndex[maxIndex][1]}. `;
    }
    maxInArray()

}

$(document).ready(function () {
    //przycisk do generowania kodu--------------------------------------
    $("#btnGenerator").click(function (e) {
        e.preventDefault();
        if (gTrigger == 0) {
            gTrigger++
            elementMap.innerText = '';
            randomStringWord();
            let indexStringInDiv = 1;
            stringWord.forEach((string) => {
                let el = document.createElement('p');

                elementMap.appendChild(el);
                document.querySelector(`#gMap > p:nth-child(${indexStringInDiv})`).append(string);
                indexStringInDiv++
            });

        }
    });
    //przycisk do przeszukiwania--------------------------------------------
    $("#btnSearch").click(function (e) {

        if (sTrigger == 0 && gTrigger > 0) {
            sTrigger++;
            e.preventDefault();
            const btnLeft = document.createElement('button');
            btnLeft.classList.add('btnLeft');
            btnLeft.textContent = '<=== rusz w lewo |';
            elementBtnMap.appendChild(btnLeft);
            const btnRight = document.createElement('button');
            btnRight.classList.add('btnRight');
            btnRight.textContent = '| rusz w prawo ===>';
            elementBtnMap.appendChild(btnRight);

            foundTreasure();

            let iBtn = Math.floor(Math.random() * numberOfString);
            document.querySelectorAll("#gMap>p")[iBtn].style.color = 'red';
            document.querySelectorAll("#gMap>p")[iBtn].style.fontSize = '40px';
            const bohater = function () {
                const btnL = document.querySelector('.btnLeft');
                const btnR = document.querySelector('.btnRight');

                btnL.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (iBtn > 0) {
                        document.querySelectorAll("#gMap>p")[iBtn].style.color = 'white';
                        document.querySelectorAll("#gMap>p")[iBtn].style.fontSize = '20px';
                        iBtn--;
                        document.querySelectorAll("#gMap>p")[iBtn].style.color = 'red';
                        document.querySelectorAll("#gMap>p")[iBtn].style.fontSize = '40px';
                        if (document.querySelectorAll("#gMap>p")[iBtn].innerText == '(') {
                            imgTreuser.innerHTML = '<img src="schodygora.jpg">';
                        }else if(document.querySelectorAll("#gMap>p")[iBtn].innerText == ')') {
                            imgTreuser.innerHTML = '<img src="schodydol.jpg">';
                        }

                    }
                    if (iBtn == indexOfTresures) {

                        imgTreuser.innerHTML = '<img src="skarb.png">';

                    }

                })
                btnR.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (iBtn < numberOfString - 1) {
                        document.querySelectorAll("#gMap>p")[iBtn].style.color = 'white';
                        document.querySelectorAll("#gMap>p")[iBtn].style.fontSize = '20px';
                        iBtn++;
                        document.querySelectorAll("#gMap>p")[iBtn].style.color = 'red';
                        document.querySelectorAll("#gMap>p")[iBtn].style.fontSize = '40px';
                        if (document.querySelectorAll("#gMap>p")[iBtn].innerText == '(') {
                            imgTreuser.innerHTML = '<img src="schodygora.jpg">';
                        }else if(document.querySelectorAll("#gMap>p")[iBtn].innerText == ')') {
                            imgTreuser.innerHTML = '<img src="schodydol.jpg">';
                        }
                    }
                    if (iBtn == indexOfTresures) {

                        imgTreuser.innerHTML = '<img src="skarb.png">';

                    }

                })


            }
            bohater();
        }
    });
    //    przycisk resetu-------------------------------------
    $('#btnReset').click(function (e) {
        e.preventDefault();
        sTrigger = 0;
        gTrigger = 0;
        dangonLvl = 0;
        elementMap.innerHTML = "";
        document.querySelector("#map").childNodes[3].remove();
        document.querySelector("#map").childNodes[3].remove();
        stringWord = [];
        queryTresuresFound = [];
        queryTreuserToDangonLvl = [];
        sameLvlTreuser = 0;
        arrLvlOfRouteToIndex = [];
        arrDangonLvlTresuer = [];
        indexOfTresures = '';
        dateInfo.innerText = '';
        imgTreuser.innerHTML = "";
    })

});
