import { addToFavoriteOnClick } from './toyPage';

interface IToyCard {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
    lovest: boolean;
};

class ToyCard {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: boolean;
    lovest: boolean;
    
    constructor(num: string, name: string, count: string, year: string, shape: string, color: string, size: string, favorite: boolean, lovest: boolean) {
        this.num = num;
        this.name = name;
        this.count = count;
        this.year = year;
        this.shape = shape;
        this.color = color;
        this.size = size;
        this.favorite = favorite;
        this.lovest = lovest;
    }

    createCard() {
        const perant = document.querySelector('.toy-card-container');
        const card = document.createElement('div');
        this.lovest ? card.classList.add('toy-card', 'toy-card-lovest') : card.classList.add('toy-card');
        card.dataset.num = this.num;
        card.style.opacity = '0';
        //this.favorite ? card.style.backgroundColor = 'rgba(31, 112, 127, .6)' : this.favorite = false;
        

        const heading = document.createElement('h2');
        heading.classList.add('toy-card-title');
        heading.textContent = this.name;
        
        const cardImg = document.createElement('img');
        cardImg.classList.add('toy-card-img');
        cardImg.src = `toys/${this.num}.png`;
        cardImg.alt = this.name;
        cardImg.dataset.number = this.num;
        cardImg.onclick = addToFavoriteOnClick;

        const cardDescription = document.createElement('div');
        cardDescription.classList.add('toy-card-description');
            
        const count = this.addDescriptionP('count', 'Количество:', this.count);
        const year = this.addDescriptionP('year', 'Год покупки:', this.year);
        const shape = this.addDescriptionP('shape', 'Форма:', this.shape);
        const color = this.addDescriptionP('color', 'Цвет:', this.color);
        const size = this.addDescriptionP('size', 'Размер:', this.size);
        const isLovest: boolean = this.lovest;
        let isLovestString: string = '';
        isLovest === true ? isLovestString = 'да' : isLovestString = 'нет';
        const lovest = this.addDescriptionP('favorite', 'Любимая:', isLovestString);
        lovest.id = `lovest${this.num}`;

        cardDescription.append(count, year, shape, color, size, lovest);

        const ribbon = document.createElement('div');
        ribbon.id = `ribbon${this.num}`
        this.favorite ? ribbon.classList.add('ribbon-favorite') : ribbon.classList.add('ribbon');
        const favoriteBall = document.createElement('div');
        favoriteBall.classList.add('ribbon-favorite-ball');
        this.favorite ? ribbon.append(favoriteBall) : this.favorite = false;

        card.append(heading, cardImg, cardDescription, ribbon);
        perant.append(card);
    }

    addDescriptionP(className: string, content: string, value: string) {
        const elem = document.createElement('p');
        elem.classList.add(`${className}`);
        elem.textContent = content;
        const span = document.createElement('span');
        elem.append(span);
        span.textContent = value;
        return elem;
    }
};

export { ToyCard, IToyCard };