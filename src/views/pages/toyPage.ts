import { PageRenderer } from './PageRenderer'
import { data } from '../../toyData';
import { ToyCard, IToyCard } from './ToyCard'
import { ToyCardsSort } from '../../services/sort'
import { ToyCardsFilter, IFilterShape, IFilterColor, IFilterSize } from '../../services/filter';
import { cardAnimationOf, cardAnimationOn } from '../../services/cardsAnimation';
import { RangeSlider } from '../../services/rangeSlider';

let ToyPage: PageRenderer = {
    render: async () => {
        let view =  /*html*/`
        <div class="pop-up">
            <div class="pop-up__absent-toy">
            <div class="cross" id="cross-absent-toy">
                <div class="cross-line"></div>
                <div class="cross-line"></div>
            </div>
            <div class="absent-toy-text">
            <p id="pop-up-info"></p>
            <p id="pop-up-info-mini"class="absent-toy-text-mini"></p>
            </div>
            </div>
        </div>
        <div class="page toy-page">
            <div class="blur">
            
                    <div class="controls">
                    <div class="filters">
                        <div class="controls-title">
                        Фильтры по значению
                        </div>
                        <div class="shape">
                            <p class="filters-text">Форма:</p>
                            <button class="shape-button" data-filter="шар"></button>
                            <button class="shape-button" data-filter="колокольчик"></button>
                            <button class="shape-button" data-filter="шишка"></button>
                            <button class="shape-button" data-filter="снежинка"></button>
                            <button class="shape-button" data-filter="фигурка"></button>
                        </div>
                        <div class="color">
                            <p class="filters-text">Цвет:</p>
                            <button class="color-button" data-filter="белый"></button>
                            <button class="color-button" data-filter="желтый"></button>
                            <button class="color-button" data-filter="красный"></button>
                            <button class="color-button" data-filter="синий"></button>
                            <button class="color-button" data-filter="зелёный"></button>
                        </div>
                        <div class="size">
                            <p class="filters-text">Размер:</p>
                            <button class="size-button" data-filter="большой"></button>
                            <button class="size-button" data-filter="средний"></button>
                            <button class="size-button" data-filter="малый"></button>
                        </div>
                        <div class="favorite-container">
                            <div class="input-wrap">
                                <p>Только отобранные: </p>
                                <div class="form-group">
                                    <input type="checkbox" class="favorite-input" id="checkbox">
                                    <label for="checkbox" class="favorite-input-label"></label>
                                </div>
                            </div>
                            <div class="input-wrap">
                                <p>Только любимые: </p>
                                <div class="form-group">
                                    <input type="checkbox" class="favorite-input" id="checkbox-lovest">
                                    <label for="checkbox-lovest" class="favorite-input-label"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="range">
                        <div class="controls-title">Фильтры по диапазону</div>
                        <div class="count">
                            <span class="control-span">Количество экземпляров:</span>
                            <maryanzh-range-slider id="range-slider-count" minValue="1" maxValue="12" step="1" lineWidth="300" startValue="1" endValue="12" runerSize="20"></maryanzh-range-slider>
                            
                            <span class="control-span">Год приобретения:</span>
                            <maryanzh-range-slider id="range-slider-year" minValue="1940" maxValue="2020" step="10" lineWidth="300" startValue="1940" endValue="2020" runerSize="20"></maryanzh-range-slider>
                            <p class="range-text">Для вашего удобства, фильтрация начинает работать после того, как вы отпустили бегунок</p>
                        </div>                    
                    </div>
                    
                    <div class="sort">
                        <div class="controls-title">
                        Сортировка
                        </div>
                        <select class="sort-select">
                            <option value="sort-name-max">По названию от «А» до «Я»</option>
                            <option  value="sort-name-min">По названию от «Я» до «А»</option>
                            <option value="sort-year-max">По году по возрастанию</option>
                            <option value="sort-year-min">По году по убыванию</option>
                        </select>
                        <button class="reset">Сброс фильтров</button>
                    </div>
                </div>
                <div class="text-under-card">
                    <p id="count"></p>
                    <p class="text-under-card-info">Для добавления или удаления игрушки в Отобранные нажмите на ее ихображение</p>
                </div>
                <div class="toy-card-container">
                    
                </div>
            </div>
        </div>
        `
        return view
    },

    after_render: async () => {
        const sortData = new ToyCardsSort(currentCardArr);
        sortData.sortAtoZ();
        cardRender(currentCardArr);

        const select = <HTMLSelectElement>document.querySelector('.sort-select');
        select.addEventListener('change', changeSelectSort);

        const sharpButtons = document.querySelectorAll('.shape-button');
        for (let i = 0; i < sharpButtons.length; i++) {
            sharpButtons[i].addEventListener('click', filterOnClick);
        };

        const colorButtons = document.querySelectorAll('.color-button');
        for (let i = 0; i < colorButtons.length; i++) {
            colorButtons[i].addEventListener('click', filterOnClick);
        };

        const sizeButtons = document.querySelectorAll('.size-button');
        for (let i = 0; i < sizeButtons.length; i++) {
            sizeButtons[i].addEventListener('click', filterOnClick);
        };

        const checkbox = <HTMLInputElement>document.getElementById('checkbox');
        checkbox.addEventListener('change', isFavoriteOnChange);
        const checkboxLovest = <HTMLInputElement>document.getElementById('checkbox-lovest');
        checkboxLovest.addEventListener('change', showLoveatOnChange);

        const crossPopUpAbsentToy = <HTMLLIElement>document.querySelector('#cross-absent-toy');
        crossPopUpAbsentToy.addEventListener('click', clpuseAbsentToyPopUpOnClick);

        const reset = <HTMLInputElement>document.querySelector('.reset');
        reset.addEventListener('click', resetFilterOnClick);

        const countSlider = <RangeSlider>document.getElementById('range-slider-count');
        const yearSlider = <RangeSlider>document.getElementById('range-slider-year');
        countSlider.addEventListener('startValueChanged', upDateFilter);
        countSlider.addEventListener('endValueChanged', upDateFilter);
        yearSlider.addEventListener('startValueChanged', upDateFilter);
        yearSlider.addEventListener('endValueChanged', upDateFilter);

        const search = <HTMLInputElement>document.querySelector('.search');
        search.style.opacity = '1';
        search.addEventListener('change', searchValueOnCnange);
    }
};

//текуший иассив карточек, обновляется при нажатии каждого фильтра
let currentCardArr: IToyCard[] = [];
for (let index = 0; index < data.length; index++) {
    currentCardArr.push(data[index]);
};
//флаги, какие фильтры включены
let filterSharpArr: IFilterShape[] = [
    {
        shape: 'шар',
        isOn: false,
    },
    {
        shape: 'колокольчик',
        isOn: false,
    },
    {
        shape: 'шишка',
        isOn: false,
    },
    {
        shape: 'снежинка',
        isOn: false,
    },
    {
        shape: 'фигурка',
        isOn: false,
    },

];

let filterColorArr: IFilterColor[] = [
    {
        color: 'белый',
        isOn: false,
    },
    {
        color: 'желтый',
        isOn: false,
    },
    {
        color: 'красный',
        isOn: false,
    },
    {
        color: 'синий',
        isOn: false,
    },
    {
        color: 'зелёный',
        isOn: false,
    },

];

let filterSizeArr: IFilterSize[] = [
    {
        size: 'большой',
        isOn: false
    },
    {
        size: 'средний',
        isOn: false
    },
    {
        size: 'малый',
        isOn: false
    },
];

// редндеринг карточек
function cardRender(cardsArr: IToyCard[]) {
    cardAnimationOf();
    const cards = document.querySelectorAll('.toy-card');
    setTimeout(() => {
        for (let i = 0; i < cards.length; i++) {
            cards[i].remove()
        }
    }, 290);

    let count: number = 0;
    setTimeout(() => {
        for (let i = 0; i < cardsArr.length; i++) {
            count = count + 1;
            const newCard: ToyCard = new ToyCard(cardsArr[i].num, cardsArr[i].name, cardsArr[i].count, cardsArr[i].year, cardsArr[i].shape, cardsArr[i].color, cardsArr[i].size,
                cardsArr[i].favorite, cardsArr[i].lovest);
            newCard.createCard();
        }
    }, 290)

    setTimeout(cardAnimationOn, 320);
    setTimeout(() => {
        let curentToyCount = document.getElementById('count');
        if (curentToyCount != undefined) {
            let countToStr = count.toString();
        curentToyCount.textContent = `Количество игрушек на странице ${countToStr}`;
        }
    }, 290)

};

//текущий селект
let currentSort = 'sort-name-max';
// сортировка по селект
function changeSelectSort() {
    const select = <HTMLSelectElement>document.querySelector('.sort-select');
    const optionValue: string = select.value;
    const sortData = new ToyCardsSort(currentCardArr);
    switch (optionValue) {
        case 'sort-name-max':
            sortData.sortAtoZ();
            cardRender(currentCardArr);
            currentSort = 'sort-name-max';
            break;
        case 'sort-name-min':
            sortData.sortZtoA();
            cardRender(currentCardArr);
            currentSort = 'sort-name-min';
            break;
        case 'sort-year-max':
            sortData.sortYearMax();
            cardRender(currentCardArr);
            currentSort = 'sort-year-max';
            break;
        case 'sort-year-min':
            sortData.sortYearMin();
            cardRender(currentCardArr);
            currentSort = 'sort-year-min';
            break;
    }
};
// поределчем текущую сортировку на странице
function whatSort() {
    const sortData = new ToyCardsSort(currentCardArr);
    switch (currentSort) {
        case 'sort-name-max':
            sortData.sortAtoZ();
            break;
        case 'sort-name-min':
            sortData.sortZtoA();
            break;
        case 'sort-year-max':
            sortData.sortYearMax();
            break;
        case 'sort-year-min':
            sortData.sortYearMin();
            break;
    }
};

// фильтрация форма, цвет, размер
let isFavorite: boolean = false;
let isLovest: boolean = false;
function isFavoriteOnChange(e: Event) {
    let a = <HTMLInputElement>e.target;
    isFavorite = a.checked;
    filterOnClick(e);
}

function showLoveatOnChange(e: Event) {
    let a = <HTMLInputElement>e.target;
    isLovest = a.checked;
    filterOnClick(e);
}

function addToFavoriteOnClick(e: Event) {

    const toy = <HTMLElement>e.target;
    const card = <HTMLLIElement>toy.parentNode;
    const ribbon = <HTMLLIElement>card.lastChild;
    const imgNumber = +(toy.dataset.number);
    const cardData = data.find(d => +d.num == imgNumber);

    let favoriteCount: number = 0;
    for (let i = 0; i < data.length; i++) {
        data[i].favorite ? favoriteCount++ : favoriteCount;
    };

    if (favoriteCount > 19 && cardData.favorite == false) {
        openAbsentToyPopUpOn('Извините, все слоты заполнены', 'Вы можете добавить не более 20 игрущек');
    }
    else {
        if (cardData.favorite) {
            favoriteCount--;
            cardData.favorite = false;
            const favBall = <HTMLLIElement>ribbon.lastChild;
            favBall.remove();
            //card.style.background = 'rgba(31, 112, 127, .3';
            ribbon.classList.remove('ribbon-favorite');
            ribbon.classList.add('ribbon');
            const favoriteFilter = <HTMLInputElement>document.getElementById('checkbox');
            if (favoriteFilter.checked) {
                //const favoriteCollection = document.querySelectorAll('.toy-card');

                card.style.animationName = 'hlop';
                setTimeout(() => { card.remove() }, 290);
            }
        }
        else {
            cardData.favorite = true;
            favoriteCount++;
            //card.style.background = 'rgba(31, 112, 127, .6';
            ribbon.classList.remove('ribbon');
            ribbon.classList.add('ribbon-favorite');
            const favoriteBall = document.createElement('div');
            favoriteBall.classList.add('ribbon-favorite-ball');
            ribbon.append(favoriteBall);
        }
    };
    const favoriteCountELem = document.getElementById('favorite-toy-count');
    favoriteCountELem.textContent = favoriteCount.toString();
    
    if (isFavorite) {
        const count = document.getElementById('count');
        count.textContent = `Количество игрушек на странице ${favoriteCount}`;
    }
};

function filterOnClick(e: Event) {
    const elem = <HTMLElement>e.target;
    const countSLider = <RangeSlider>document.getElementById('range-slider-count');
    const yearSlider = <RangeSlider>document.getElementById('range-slider-year');
    const countStartVal = +countSLider.startValue;
    const countEndVal = +countSLider.endValue;
    const yearStartVal = +yearSlider.startValue;
    const yearEndVal = +yearSlider.endValue;

    const filter = new ToyCardsFilter(data, filterSharpArr, filterColorArr, filterSizeArr, isFavorite, isLovest, countStartVal, countEndVal, yearStartVal, yearEndVal);
    filter.filterAddShapeFlag(elem);
    filter.filterAddColorFlag(elem);
    filter.filterAddSizeFlag(elem);

    filter.filterCardArr = [];
    filter.createFilterArr(filterSharpArr, filterColorArr, filterSizeArr, isFavorite, isLovest, countStartVal, countEndVal, yearStartVal, yearEndVal);
    currentCardArr = filter.filterCardArr;
    whatSort();
    cardRender(currentCardArr);
};

function upDateFilter() {
    const countSLider = <RangeSlider>document.getElementById('range-slider-count');
    const yearSlider = <RangeSlider>document.getElementById('range-slider-year');
    const countStartVal = +countSLider.startValue;
    const countEndVal = +countSLider.endValue;
    const yearStartVal = +yearSlider.startValue;
    const yearEndVal = +yearSlider.endValue;

    const filter = new ToyCardsFilter(data, filterSharpArr, filterColorArr, filterSizeArr, isFavorite, isLovest, countStartVal, countEndVal, yearStartVal, yearEndVal);
    filter.filterCardArr = [];
    filter.createFilterArr(filterSharpArr, filterColorArr, filterSizeArr, isFavorite, isLovest, countStartVal, countEndVal, yearStartVal, yearEndVal);
    currentCardArr = filter.filterCardArr;

    whatSort();
    cardRender(currentCardArr);
};

function resetFilterOnClick() {
    function resetFilte() {
        for (let i = 0; i < filterSharpArr.length; i++) {
            filterSharpArr[i].isOn = false;
        }
        for (let i = 0; i < filterColorArr.length; i++) {
            filterColorArr[i].isOn = false;
        }
        for (let i = 0; i < filterSizeArr.length; i++) {
            filterSizeArr[i].isOn = false;
        }
    };
    resetFilte();

    function resetFilteStyle() {
        const shapeFilterArr = document.querySelectorAll('.shape-button');
        for (let i = 0; i < shapeFilterArr.length; i++) {
            shapeFilterArr[i].removeAttribute('style');
        };
        const filterColorArr = document.querySelectorAll('.color-button');
        for (let i = 0; i < filterColorArr.length; i++) {
            filterColorArr[i].removeAttribute('style');
        };
        const filterSizeArr = document.querySelectorAll('.size-button');
        for (let i = 0; i < filterSizeArr.length; i++) {
            filterSizeArr[i].removeAttribute('style');
        };
    };
    resetFilteStyle();
    const checkbox = <HTMLInputElement>document.getElementById('checkbox');
    const checkboxLovest = <HTMLInputElement>document.getElementById('checkbox-lovest');
    checkbox.checked = false;
    checkboxLovest.checked = false;
    isFavorite = false;
    isLovest = false;

    const countSLider = <RangeSlider>document.getElementById('range-slider-count');
    const yearSlider = <RangeSlider>document.getElementById('range-slider-year');
    countSLider.startValue = countSLider.minValue;
    countSLider.endValue = countSLider.maxValue;
    yearSlider.startValue = yearSlider.minValue;
    yearSlider.endValue = yearSlider.maxValue;

    upDateFilter();
};

function openAbsentToyPopUpOn(a: string, b: string) {
    const popUpAlert = <HTMLElement>document.querySelector('.pop-up__absent-toy');
    const popUp = <HTMLLIElement>document.querySelector('.pop-up');
    const alertText = <HTMLLIElement>document.querySelector('#pop-up-info');
    alertText.textContent = a;
    const alertTextMini = <HTMLLIElement>document.querySelector('#pop-up-info-mini');
    alertTextMini.textContent = b;
    popUp.style.display = 'flex';
    popUp.style.animation = 'unHidden .3s';
    setTimeout(() => {
        popUp.style.opacity = '1';
        popUpAlert.style.animation = 'up .3s';
    }, 300);
    setTimeout(() => { popUpAlert.style.marginTop = '0' }, 490)
};

function clpuseAbsentToyPopUpOnClick() {
    const popUpAlert = <HTMLElement>document.querySelector('.pop-up__absent-toy');
    const popUp = <HTMLLIElement>document.querySelector('.pop-up');
    popUpAlert.style.animation = 'clouse .3s';
    setTimeout(() => {
        popUpAlert.style.marginTop = '-170vh';
        popUp.style.animation = 'hidden .3s';
    }, 200);
    setTimeout(() => {
        popUp.style.display = 'none';
    }, 500);
}

function searchValueOnCnange() {
    const search = <HTMLInputElement>document.querySelector('.search');
    const value = search.value.toLowerCase();
    if (value == '') {
        upDateFilter()
    }
    else {

        const result = currentCardArr.filter(elem => isTrueValue(elem));
        function isTrueValue(elem: IToyCard) {
            const name = elem.name.toLowerCase();
            if (name.indexOf(value) > -1) {
                return true;
            }
            else {
                return false;
            };

        };
        if (result.length > 0) {
            currentCardArr = result;
            cardRender(currentCardArr);
        }
        else {
            openAbsentToyPopUpOn('Извините, совпадений не обнаружено', '');
        }
    }
}

export { ToyPage, addToFavoriteOnClick, openAbsentToyPopUpOn, resetFilterOnClick };