import { IToyCard } from "../views/pages/ToyCard";
import { openAbsentToyPopUpOn } from '../views/pages/toyPage';
interface IFilterShape {
    shape: string;
    isOn: boolean;
};
interface IFilterColor {
    color: string;
    isOn: boolean;
};
interface IFilterSize {
    size: string;
    isOn: boolean;
};

class ToyCardsFilter {
    cardArray: IToyCard[];
    filterCardArr: IToyCard[];
    filterShapeFlagArr: IFilterShape[];
    filterColorArr: IFilterColor[];
    filterSizeArr: IFilterSize[];
    filterFavorite: boolean;
    filterLovest: boolean;
    filterCountStart: number;
    filterCountEnd: number;
    filterYearStart: number;
    filterYearEnd: number;

    constructor(cardArray: IToyCard[], filterShapeFlagArr: IFilterShape[], filterColorArr: IFilterColor[],
        filterSizeArr: IFilterSize[], filterFavorite: boolean, filterLovest: boolean, filterCountStart: number, filterCountEnd: number,
        filterYearStart: number, filterYearEnd: number) {
        this.cardArray = cardArray;
        this.filterShapeFlagArr = filterShapeFlagArr;
        this.filterColorArr = filterColorArr;
        this.filterSizeArr = filterSizeArr;
        this.filterFavorite = filterFavorite;
        this.filterLovest = filterLovest;
        this.filterCountStart = filterCountStart;
        this.filterCountEnd = filterCountEnd;
        this.filterYearStart = filterYearStart;
        this.filterYearEnd = filterYearEnd;
        this.filterCardArr = [];
    }

    filterAddShapeFlag(value: HTMLElement) {
        const sortType = value.dataset.filter;

        for (let i = 0; i < this.filterShapeFlagArr.length; i++) {
            if (this.filterShapeFlagArr[i].shape == sortType) {
                if (this.filterShapeFlagArr[i].isOn == false) {
                    this.filterShapeFlagArr[i].isOn = true;
                    value.style.filter = 'invert(57%) sepia(100%) saturate(329%) hue-rotate(141deg) brightness(89%) contrast(90%)';
                }
                else if (this.filterShapeFlagArr[i].isOn == true) {
                    value.removeAttribute('style');
                    this.filterShapeFlagArr[i].isOn = false;
                }
            }
        }
    }

    filterAddColorFlag(value: HTMLElement) {
        const sortType = value.dataset.filter;

        for (let i = 0; i < this.filterColorArr.length; i++) {
            if (this.filterColorArr[i].color == sortType) {
                if (this.filterColorArr[i].isOn == false) {
                    this.filterColorArr[i].isOn = true;
                    value.style.outline = '2px  solid wheat';
                }
                else if (this.filterColorArr[i].isOn == true) {
                    value.removeAttribute('style');
                    this.filterColorArr[i].isOn = false;
                }
            }
        }
    }

    filterAddSizeFlag(value: HTMLElement) {
        const sortType = value.dataset.filter;

        for (let i = 0; i < this.filterSizeArr.length; i++) {
            if (this.filterSizeArr[i].size == sortType) {
                if (this.filterSizeArr[i].isOn == false) {
                    this.filterSizeArr[i].isOn = true;
                    value.style.filter = 'invert(57%) sepia(100%) saturate(329%) hue-rotate(141deg) brightness(89%) contrast(90%)';
                }
                else if (this.filterSizeArr[i].isOn == true) {
                    value.removeAttribute('style');
                    this.filterSizeArr[i].isOn = false;
                }
            }
        }
    }
    // создаю массив, в котором прописаны все условия фильтрации
    createFilterArr(shapeFlag: IFilterShape[], colorFlag: IFilterColor[], sizeFlag: IFilterSize[], isFavorite: boolean, isLovest: boolean, countStartValue: number,
        countEndValue: number, yearStartValue: number, yearEndValue: number) {
        //добавляем выделенные в фильтрах свойства, например форма -- шар, цвет --красный и т.д
        let filterShapes: string[] = [];
        let filterColors: string[] = [];
        let filterSizes: string[] = [];
       
        for (let i = 0; i < shapeFlag.length; i++) {
            shapeFlag[i].isOn ? filterShapes.push(shapeFlag[i].shape) : false
        };
        for (let i = 0; i < colorFlag.length; i++) {
            colorFlag[i].isOn ? filterColors.push(colorFlag[i].color) : false
        };
        for (let i = 0; i < sizeFlag.length; i++) {
            sizeFlag[i].isOn ? filterSizes.push(sizeFlag[i].size) : false
        };
        //создаем новый  массив из элементов подпадающих под фильтры
        let arr: IToyCard[] = this.cardArray.filter(elem => this.isTrueCard(elem, filterShapes, filterColors, filterSizes, isFavorite, isLovest,
            countStartValue, countEndValue, yearStartValue, yearEndValue));

        if ((filterShapes.length != 0 || filterColors.length != 0 || filterSizes.length != 0 || isFavorite || isLovest) && arr.length == 0) {
            openAbsentToyPopUpOn('Извините, совпадений не обнаружено', '');
        }
        
        else {
            this.filterCardArr = arr;
        }

    }

    // функция для отработки фильтрации
    isTrueCard(elem: IToyCard, filterArr1: string[], filterArr2: string[], filterArr3: string[], favorit: boolean, lovest: boolean,
        fCountStart: number, fCountEnd: number, fYearStart: number, fYearEnd: number) {
        //проверка, имеет ли кейс совпаление
        let isShapeTrue = false;
        let isColorTrue = false;
        let isSizeTrue = false;
        let isFavoriteTrue = false;
        let isLovestTrue = false;
        let isCountTrue = false;
        let isYearTrue = false;
        if (!lovest || elem.lovest) {
            isLovestTrue = true
        }

        if (!favorit || elem.favorite) {
            isFavoriteTrue = true;
        }

        //если в фильтре нет условий, то любое условие правда
        if (filterArr1.length == 0) {
            isShapeTrue = true
        }
        //если в фильтре есть условия, проверяем есть ли они у карточки
        else {
            for (let i = 0; i < filterArr1.length; i++) {
                elem.shape == filterArr1[i] ? isShapeTrue = true : false
            }
        };
        if (filterArr2.length == 0) {
            isColorTrue = true
        }
        else {
            for (let i = 0; i < filterArr2.length; i++) {
                elem.color == filterArr2[i] ? isColorTrue = true : false
            }
        }
        if (filterArr3.length == 0) {
            isSizeTrue = true
        }
        else {
            for (let i = 0; i < filterArr3.length; i++) {
                elem.size == filterArr3[i] ? isSizeTrue = true : false
            }
        }

        let elemCount: number = +elem.count;
        if (elemCount >= fCountStart && elemCount <= fCountEnd) {
            isCountTrue = true;
        }
        let elemYear: number = +elem.year;
        if (elemYear >= fYearStart && elemYear <= fYearEnd) {
            isYearTrue = true;
        }

        if (isShapeTrue && isColorTrue && isSizeTrue && isFavoriteTrue && isLovestTrue && isCountTrue && isYearTrue) {
            return true;
        }
        else {
            return false;
        }
    }
}

export { ToyCardsFilter, IFilterShape, IFilterColor, IFilterSize };