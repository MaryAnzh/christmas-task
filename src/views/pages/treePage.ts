import { PageRenderer } from './PageRenderer'
import { data } from './../../toyData';
import { IToyCard } from './ToyCard'

let TreePage: PageRenderer = {
    render: async () => {
        let view =  /*html*/`
         
        <div class="page tree-page">
            <div class="blur blur-tree-page">
            <div class="tree-page-wrap">
                    <div class="left-setting">
                        <div class="music-snow-wrap">
                            <div class="music-wrap">    
                                <div class="music">
                                <audio class="audio" loop></audio>
                                </div>
                                <select class="music-select">
                                    <option value="1">Трек 1</option>
                                    <option  value="2">Трек 2</option>
                                    <option value="3">Трек 3</option>
                                    <option value="4">Трек 4</option>
                                   
                                </select>
                            </div>
                            <div class="snow"></div>
                        </div>

                        <div class="tree-selection">
                            <p class="controls-title">Выберите Ёлку</p>
                            <div class="trees-wrap">
                                <div class="tree-icon" data-number="1"></div>
                                <div class="tree-icon" data-number="2"></div>
                                <div class="tree-icon" data-number="3"></div>
                                <div class="tree-icon" data-number="4"></div>
                                <div class="tree-icon" data-number="5"></div>
                                <div class="tree-icon" data-number="6"></div>
                            </div>
                        </div>

                        <div class="background-icon-wrap">
                            <p class="controls-title">Выберите фон</p>
                            <div class="background-icon-collection"></div>                            
                        </div>

                        <div class="fairy-light-wrap">
                            <p class="controls-title">Гирлянда</p>
                            <div class="fairy-light">
                                <div class="fairy-light-white fairy-light-icon" data-index="0"></div>
                                <div class="fairy-light-yellow fairy-light-icon" data-index="1"></div>
                                <div class="fairy-light-red fairy-light-icon" data-index="2"></div>
                                <div class="fairy-light-blue fairy-light-icon" data-index="3"></div>
                                <div class="fairy-light-green fairy-light-icon" data-index="4"></div>
                            </div>
                        </div>
                    </div>

                    <div class="game">
                        <div class="hidden-toy-set"></div>
                        <div class="tree-wrap" id="game-wrap"></div>
                        <img class="fir-tree-img" id="fir-tree-img" usemap="#tree-map">
                         <div class="garland-tree-mask">
                            <div class="garland-tree-wrap"></div>
                         </div>
                            <map name="tree-map">
                            <area  id="area" data-drop-target="true" coords="${treeSVG1}" shape="poly">
                                </area>
                            </map>
                        
                    </div>

                    <div class="right-setting">                        
                        <div class="game-toy-set-wrap">
                            <p class="controls-title">Игрушки</o>
                            <div class="game-toy-set"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        return view
    },
    after_render: async () => {
        const search = document.getElementById('search');
        search.style.opacity = '0';

        const audioElem = <HTMLAudioElement>document.querySelector('.audio');
        audioElem.src = `audio/audio-${currentAudioTrak}.mp3`;
        const audioButton = <HTMLElement>document.querySelector('.music');
        audioButton.addEventListener('click', audioOnClick);

        const audioSelect = <HTMLInputElement>document.querySelector('.music-select');
        audioSelect.onchange = selectTrackOnChange;

        const snow = document.querySelector('.snow');
        snow.addEventListener('click', addSnowOnClick);

        currentToyImgCollection = [];
        toyCountInfo = [];
        let imgCollection: IToyCard[] = [];
        for (let i = 0; i < data.length; i++) {
            data[i].favorite ? imgCollection.push(data[i]) : false;
        };
        imgCollection.length > 0 ? currentToyImgCollection = imgCollection : false;

        const firTreeIconCollection = document.querySelectorAll('.tree-icon');
        for (let i = 0; i < firTreeIconCollection.length; i++) {
            const elem = <HTMLLIElement>firTreeIconCollection[i];
            const firTreeIconNumber = i + 1;
            elem.onclick = changeFirTreeOnClick;
            currentTreeImgNumber == firTreeIconNumber ? elem.style.backgroundColor = 'rgba(246, 254, 255, 0.8)' : false;

        };

        const backgroundCollectionWrap = <HTMLElement>document.querySelector('.background-icon-collection');
        const backgroundCollectionNumber = 10;
        for (let i = 0; i < backgroundCollectionNumber; i++) {
            createDivBGCollection(backgroundCollectionWrap, 'background-icon', i);
        };

        const fairyLightIcons = document.querySelectorAll('.fairy-light-icon');
        for (let index = 0; index < fairyLightIcons.length; index++) {
            const elem = <HTMLLIElement>fairyLightIcons[index];
            elem.addEventListener('click', addFairyLightOnClick)
        };

        const gameBg = document.getElementById('game-wrap');
        gameBg.style.background = `url(bg/${currentBgImgNumber}.jpg)`

        const toySet = <HTMLElement>document.querySelector('.game-toy-set');
        const toySetNumber = 20;
        for (let i = 0; i < toySetNumber; i++) {
            createDivToyImgCollection(toySet, i, imgCollection);

        };

        const hiddenToy = <HTMLElement>document.querySelector('.hidden-toy-set');
        const hiddenToySlotNum = data.length + 1;
        for (let i = 0; i < hiddenToySlotNum; i++) {
            createDivAllToyCollection(i, hiddenToy);
        };

        const firTreeImg = <HTMLImageElement>document.getElementById('fir-tree-img');
        firTreeImg.src = `tree/${currentTreeImgNumber}.png`;

        const treeContour = document.querySelector('area');
        treeContour.addEventListener('dragover', imgDragOver);
        treeContour.addEventListener('drop', imgDrop);

        const toyImgSet = document.querySelectorAll('.toy-item-img');
        for (let index = 0; index < toyImgSet.length; index++) {
            const element = toyImgSet[index];
            element.addEventListener('dragstart', imgOnDragStart);
        }
    }
};

let currentBgImgNumber = 1;
let currentTreeImgNumber = 1;
let isHiddenFormOpen = false;
let currentToyImgCollection: IToyCard[] = [];

function createDivBGCollection(parent: HTMLElement, newElemClass: string, i: number) {
    const newElem = document.createElement('div');
    newElem.classList.add(newElemClass);
    let imgNumber = i + 1;
    newElem.dataset.number = imgNumber.toString();
    newElem.style.backgroundImage = `url(bg/${imgNumber}.jpg)`;
    newElem.onclick = changeBgOnClick;
    i == currentBgImgNumber - 1 ? newElem.style.opacity = '1' : false;
    parent.append(newElem);
};
interface IToyCountInfo {
    toyNum: string;
    toyCount: string;
    currentToyCount: number;
};
let toyCountInfo: IToyCountInfo[] = [];
function createDivToyImgCollection(parent: HTMLElement, i: number, collection: IToyCard[]) {

    const newElem = document.createElement('div');
    const elemCount = document.createElement('div');
    const elemImg = <HTMLImageElement>document.createElement('img');
    elemImg.classList.add('toy-item-img');
    elemImg.draggable = true;
    elemImg.id = `imgToy${i}`;
    elemCount.id = `imgToy${i}Count`;
    elemImg.dataset.type = 'icon-toy-fav';


    const imgNumber = i + 1;
    if (collection.length == 0) {
        elemImg.src = `toys/${imgNumber}.png`;
        elemImg.dataset.number = data[i].num;
        elemCount.textContent = data[i].count;
        let toyCorntInfo: IToyCountInfo = {
            toyNum: data[i].num,
            toyCount: data[i].count,
            currentToyCount: +data[i].count,
        };
        toyCountInfo.push(toyCorntInfo);
        currentToyImgCollection.push(data[i]);
    }
    else {
        if (collection.length > i) {
            let satImgNum = collection[i].num;
            
            elemImg.dataset.number = satImgNum;
            
            elemImg.src = `toys/${satImgNum}.png`;
            const imgIndex = +satImgNum - 1;
            

            elemCount.textContent = data[imgIndex].count;
            let toyCorntInfo: IToyCountInfo = {
                toyNum: data[imgIndex].num,
                toyCount: data[imgIndex].count,
                currentToyCount: +data[imgIndex].count,
            };
            toyCountInfo.push(toyCorntInfo);
            elemImg.addEventListener('dragstart', imgOnDragStart);
        }
        else {
            elemImg.src = `toys/ball.svg`;
            elemImg.style.opacity = '0.2';
            const p = document.createElement('p');
            p.textContent = 'Добавить';
            p.classList.add('img-hover-js');
            newElem.onmouseover = () => {
                if (!isHiddenFormOpen) {
                    elemImg.style.opacity = '0.5';
                    elemImg.style.transition = '.5s';
                    newElem.append(p);
                }
            };

            newElem.onmouseout = () => {
                elemImg.style.opacity = '0.2';
                elemImg.style.transition = '.5s';
                p.remove();

            };

            elemImg.onclick = unHiddenAllToyCollection;

            function dragEnter(ev: DragEvent) {
                ev.preventDefault();
                return true;
            }
            function dragOver(ev: DragEvent) {
                ev.preventDefault();
            }
        }
    };

    newElem.classList.add('toy-item');
    elemCount.classList.add('item-count');
    newElem.append(elemImg, elemCount);
    parent.append(newElem);
};

function createDivAllToyCollection(imgIndex: number, parent: HTMLElement) {

    const newElem = document.createElement('div');
    const elemCount = document.createElement('div');
    const elemImg = <HTMLImageElement>document.createElement('img');
    elemImg.classList.add('toy-item-img');
    if (imgIndex == data.length) {
        newElem.classList.add('last-toy-item');

        const closeButton = document.createElement('button');
        closeButton.classList.add('hidden-toy-set-buttpn');
        closeButton.textContent = 'Закрыть окно';
        closeButton.onclick = unHiddenAllToyCollection;

        const addItrmToSlotButton = document.createElement('button');
        addItrmToSlotButton.classList.add('hidden-toy-set-buttpn');
        addItrmToSlotButton.textContent = 'Добавить в слот';
        newElem.append(addItrmToSlotButton, closeButton);
    }
    else {
        if (!data[imgIndex].favorite) {
            elemImg.src = `toys/${data[imgIndex].num}.png`;
            elemCount.textContent = data[imgIndex].count;
        }
        else {
            elemImg.style.opacity = '0.2';
            elemImg.src = `toys/ball.svg`;
        };
        newElem.classList.add('toy-item');
        elemCount.classList.add('item-count');
        newElem.append(elemCount, elemImg);
    };

    parent.append(newElem);
};

function changeFirTreeOnClick(e: Event) {
    const firTreeIconCollrction = document.querySelectorAll('.tree-icon');
    for (let i = 0; i < firTreeIconCollrction.length; i++) {
        const elem = <HTMLImageElement>firTreeIconCollrction[i];
        elem.removeAttribute('style');
    };

    const elem = <HTMLLIElement>e.target;
    const elemNumber = elem.dataset.number;
    const firTreeImg = <HTMLImageElement>document.getElementById('fir-tree-img');
    firTreeImg.src = `tree/${elemNumber}.png`;
    elem.style.backgroundColor = 'rgba(246, 254, 255, 0.8)';
    currentTreeImgNumber = +elemNumber;
};

function changeBgOnClick(e: Event) {
    const bgCollection = document.querySelectorAll('.background-icon');
    for (let j = 0; j < bgCollection.length; j++) {
        const elem = <HTMLLIElement>bgCollection[j];
        elem.style.opacity = '.7';
    }

    const elem = <HTMLElement>e.target;
    const bgNumber = elem.dataset.number;
    currentBgImgNumber = +bgNumber;
    const treeBg = <HTMLImageElement>document.getElementById('game-wrap');

    treeBg.style.backgroundImage = `url(bg/${bgNumber}.jpg)`;

    elem.style.opacity = '1';
};

function unHiddenAllToyCollection() {
    const hidden = <HTMLElement>document.querySelector('.hidden-toy-set');
    if (isHiddenFormOpen) {
        hidden.style.marginTop = '-170vh';
        isHiddenFormOpen = false;
    }
    else {
        hidden.style.marginTop = '0';
        isHiddenFormOpen = true;
    }
};


let isAudioPlay = false;
let currentAudioTrak = '1';
function audioOnClick(e: Event) {
    const elem = <HTMLBRElement>e.target;
    const audioElem = <HTMLAudioElement>document.querySelector('.audio');

    if (!isAudioPlay) {
        audioElem.play();
        elem.style.opacity = '1';
        isAudioPlay = true;
    }
    else {
        audioElem.pause();
        elem.style.opacity = '.5';
        isAudioPlay = false;
    };
};

function selectTrackOnChange(e: Event) {
    const audioElem = <HTMLAudioElement>document.querySelector('.audio');
    const audioButton = <HTMLElement>document.querySelector('.music');

    const elem = <HTMLInputElement>e.target;
    const elemValue = elem.value;

    switch (elemValue) {
        case '1':
            currentAudioTrak = '1';
            break;
        case '2':
            currentAudioTrak = '2';
            break;
        case '3':
            currentAudioTrak = '3';
            break;
        case '4':
            currentAudioTrak = '4';
            break;
    };
    audioElem.src = `audio/audio-${currentAudioTrak}.mp3`;
    isAudioPlay ? audioElem.play() : false;
};

const treeSVG1 = `365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664`;

function createSnowFlake(zIndex: string) {
    const game = document.querySelector('.game');
    const snowFrameWidth = 740;
    const snow_flake = document.createElement('div');
    snow_flake.classList.add('fa-snowflake');
    snow_flake.style.left = Math.random() * snowFrameWidth + 'px';
    // between 3 - 10 seconds
    const animationDurationTime = Math.random() * 7 + 3;
    snow_flake.style.animationDuration = `${animationDurationTime}s`;
    snow_flake.style.opacity = `${Math.random()}`;
    const widthHightSnow = Math.random() * 10 + 10;
    snow_flake.style.width = `${widthHightSnow}px`;
    snow_flake.style.height = `${widthHightSnow}px`;
    snow_flake.style.zIndex = zIndex;
    //snow_flake.style.animation = 'rotate 3s infinite linear';

    game.append(snow_flake);

    setTimeout(() => {
        snow_flake.remove();
    }, (animationDurationTime*1000));
};

let isSnowDown = false;
let id1: number;
let id2: number;

function addSnowOnClick(e: Event) {
    const elem = <HTMLLIElement>e.target;

    if (!isSnowDown) {
        elem.style.opacity = '1';
        let snowSetInterval1 = setInterval(createSnowFlake, 50, 1);
        id1 = snowSetInterval1;
        let snowSetInterval2 = setInterval(createSnowFlake, 50, 99);
        id2 = snowSetInterval2;
        isSnowDown = true;
    }
    else {
        elem.style.opacity = '.5';
        clearTimeout(id1);
        clearTimeout(id2);
        const snowflake = document.querySelectorAll('.fa-snowflake');
        for (let i = 0; i < snowflake.length; i++) {
            const elem = <HTMLLIElement>snowflake[i];
            elem.style.opacity = '0';
            elem.style.transition = '.3';
            setTimeout(() => { elem.remove() }, 350);
        }
        isSnowDown = false;
    };

};

interface IColorFairyLight {
    color: string;
    isOn: boolean;
    colorValue: string;
};

let colorFairyLight: IColorFairyLight[] = [
    {
        color: 'white',
        isOn: false,
        colorValue: 'white'
    },
    {
        color: 'yellow',
        isOn: false,
        colorValue: 'yellow'
    },
    {
        color: 'red',
        isOn: false,
        colorValue: 'red'
    },
    {
        color: 'blue',
        isOn: false,
        colorValue: 'rgb(199, 199, 250)'
    },
    {
        color: 'green',
        isOn: false,
        colorValue: '#ABFF00'
    },
];

function addFairyLightOnTree(count: number, radiusLine: number, color: IColorFairyLight[]) {
    //контейнер
    const firTree = document.querySelector('.garland-tree-wrap');
    // линия гирляднды
    const fairyLightLine = document.createElement('ul');
    fairyLightLine.classList.add('fairy-light-line');

    //количество шариков
    const itemCount = count;
    // const mmarginTop = 30;
    const radius = radiusLine;
    // центр окружности
    const xCenter = 0;
    const yCenter = 0;

    let colorSet = [];
    for (let index = 0; index < color.length; index++) {
        color[index].isOn ? colorSet.push(color[index].color) : false;
    };

    // вешаеи шарики на дугу
    for (let index = 0; index < itemCount; index++) {
        const fairyLight = document.createElement('li');
        fairyLight.classList.add('fairy-light-in-garland');

        //высчитываем радианы
        let radian = ((Math.PI / 2) * (index / itemCount)) - Math.PI / 5;

        let x = xCenter + radius * Math.cos(radian);
        let y = yCenter + radius * Math.sin(radian);

        fairyLight.style.marginTop = `${x}px`;
        fairyLight.style.marginLeft = `${y}px`;
        let lightTime = (Math.random() * 2) + 0.5;

        switch (colorSet.length.toString()) {
            case '1':
                const oneColor = colorSet[0];
                fairyLight.style.animation = `fairy-${oneColor} ${lightTime}s infinite linear`;
                break;
            case '2':
                let twoColor: string;
                index % 2 == 0 ? twoColor = colorSet[0] : twoColor = colorSet[1];
                fairyLight.style.animation = `fairy-${twoColor} ${lightTime}s infinite linear`;
                break;
            case '3':
                let random3 = Math.floor(Math.random() * 10 / 4);
                let threeColor = colorSet[random3];
                fairyLight.style.animation = `fairy-${threeColor} ${lightTime}s infinite linear`;
                break;
            case '4':
                let random4 = Math.floor(Math.random() * 10 / 3);
                let foorColor = colorSet[random4];
                fairyLight.style.animation = `fairy-${foorColor} ${lightTime}s infinite linear`;
                break;
            case '5':
                let random5 = Math.floor(Math.random() * 10 / 2.5);
                let fiveColor = colorSet[random5];
                fairyLight.style.animation = `fairy-${fiveColor} ${lightTime}s infinite linear`;
                break;
        };
        fairyLightLine.append(fairyLight);
    }

    firTree.append(fairyLightLine);
};

function addFairyLightOnClick(e: Event) {
    const remuvElem = document.querySelectorAll('.fairy-light-line');
    for (let index = 0; index < remuvElem.length; index++) {
        const elem = remuvElem[index];
        elem.remove();
    };

    const elem = <HTMLLIElement>e.target;
    const elemIndex = +elem.dataset.index;

    if (!colorFairyLight[elemIndex].isOn) {
        const color = colorFairyLight[elemIndex].colorValue;
        elem.style.background = `radial-gradient(circle closest-side at 50% 50%, ${color} 40%, #000 120%)`;
        colorFairyLight[elemIndex].isOn = true;

        const fairyLightLineCount = 7;
        for (let index = 0; index < fairyLightLineCount; index++) {
            const fairyLightCount = 6;
            const fairyLightLineMargin = ((index + 1) * 60 + (index + 1) * 40);
            addFairyLightOnTree(((index + 1) * fairyLightCount), fairyLightLineMargin, colorFairyLight);
        };
    }
    else {
        // выкл стиль иконкт и стывим флаг
        colorFairyLight[elemIndex].isOn = false;
        elem.removeAttribute('style');

        //проверяем вкл ли еще элементы
        let isFairyLightOn = false;
        for (let index = 0; index < colorFairyLight.length; index++) {
            colorFairyLight[index].isOn ? isFairyLightOn = true : false;
        };
        if (isFairyLightOn) {
            const fairyLightLineCount = 7;
            for (let index = 0; index < fairyLightLineCount; index++) {
                const fairyLightCount = 6;
                const fairyLightLineMargin = ((index + 1) * 60 + (index + 1) * 40);
                addFairyLightOnTree(((index + 1) * fairyLightCount), fairyLightLineMargin, colorFairyLight);
            };
        }
    }
};

function resetSetting() {
    if (isSnowDown) {
        const snowIcon = <HTMLLIElement>document.querySelector('.snow');
        snowIcon.style.opacity = '.5';
        clearTimeout(id1);
        clearTimeout(id2);
        const snowflake = document.querySelectorAll('.fa-snowflake');
        for (let i = 0; i < snowflake.length; i++) {
            const elem = <HTMLLIElement>snowflake[i];
            elem.style.opacity = '0';
            elem.style.transition = '.3';
            setTimeout(() => { elem.remove() }, 350);
        }
        isSnowDown = false;
    };

    if (isAudioPlay) {
        const audioElem = <HTMLAudioElement>document.querySelector('.audio');
        const audioIcon = <HTMLElement>document.querySelector('.music');
        audioElem.pause();
        audioIcon.style.opacity = '.5';
        isAudioPlay = false;
    };
};

function imgOnDragStart(ev: DragEvent) {
    const targetElem = <HTMLElement>ev.target;
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('DragImgSrc', targetElem.getAttribute('src'));
    ev.dataTransfer.setData('DragImgId', targetElem.getAttribute('id'));
    return true;
};

function imgDragOver(e: DragEvent) {
    e.preventDefault();
    // console.log(e);
};

let currentImgZIndex = 5;
let imgTreeId = 0;
function checkToyQuantity(countInfoArr: IToyCountInfo[], imgNum: string, countElem: HTMLElement, img: HTMLElement) {
    for (let index = 0; index < countInfoArr.length; index++) {
        const checkedElem = countInfoArr[index];
        if (checkedElem.toyNum == imgNum) {
            if (+checkedElem.currentToyCount == 0) {
                img.style.opacity = '0.5';
                img.style.transition = '1s';
                return true;
            }
            else if (+checkedElem.currentToyCount == 1) {
                img.style.opacity = '0.3';
                img.style.transition = '1s';
                checkedElem.currentToyCount--;
                countElem.textContent = checkedElem.currentToyCount.toString();
                return false;
            }
            else {
                checkedElem.currentToyCount--;
                countElem.textContent = checkedElem.currentToyCount.toString();
                return false;
            }
        }
    }
};

function imgDrop(e: DragEvent) {
    console.log('toyCountInfo');
    console.log(toyCountInfo);
    console.log('currentToyImgCollection');
    console.log(currentToyImgCollection);
    e.preventDefault();
    const area = <HTMLLIElement>e.target;
    const dragImgSrc = e.dataTransfer.getData("DragImgSrc");

    const dragImgId = e.dataTransfer.getData("DragImgId");

    const dragElem = <HTMLLIElement>document.getElementById(dragImgId);
    const toyType = dragElem.dataset.type;
    const toyNumber = dragElem.dataset.number;

    const imgWidth = 60;
    let elemmarginLeft = +e.offsetX - imgWidth / 2;
    let elemmarginTop = +e.offsetY - imgWidth / 2;

    if (area.id == 'area') {
        if (toyType == 'icon-toy-fav') {
            const srcImgCount = document.getElementById(`${dragImgId}Count`);
            let isCountNull = checkToyQuantity(toyCountInfo, toyNumber, srcImgCount, dragElem);

            if (!isCountNull) {
                const distImg = document.createElement('img');
                distImg.classList.add('firtree-toy-img');
                distImg.dataset.type = 'toy-on-tree';
                distImg.id = `treeToy${imgTreeId}`;
                imgTreeId++;
                distImg.src = dragImgSrc;
                distImg.style.zIndex = `${currentImgZIndex}`;
                currentImgZIndex++;

                distImg.style.left = elemmarginLeft + 'px';
                distImg.style.top = elemmarginTop + 'px';

                area.append(distImg);
                distImg.addEventListener('dragstart', imgOnDragStart);
            }
            else {
                alert('Этот вид игрушек закончился');
            }
        }

        else {
            dragElem.style.left = elemmarginLeft + 'px';
            dragElem.style.top = elemmarginTop + 'px';

        };
    };
};

export { TreePage, resetSetting };