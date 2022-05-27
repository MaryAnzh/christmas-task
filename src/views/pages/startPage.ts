import { PageRenderer } from './PageRenderer';
import { navToPage } from '../../index';


let StartPage: PageRenderer = {
    render: async () => {
        let view =  /*html*/`
        <div class="page main-page">
            <div class="ball ball1"></div>
            <div class="ball ball2"></div>
            <h1 class="start-page-title">
            Новогодняя игра
            <span>«Наряди ёлку»</span>
            </h1>
            <button id="start-button" class="switch-start-page" data-page="ToyPage">
                Начать
            </button>
        </div>
        `
        return view
    },
    after_render: async () => {
        const button: HTMLElement = document.getElementById('start-button');
        button.addEventListener('click', startButtonOnClick);

        const search = document.getElementById('search');
        search.style.opacity = '0';
    }

}

function startButtonOnClick(e: Event) {
    const elem = <HTMLElement>e.target;
    const pagename: string = elem.dataset.page;
    const ball1 = <HTMLElement>document.querySelector('.ball1');
    ball1.style.marginTop = '-100vh';
    ball1.style.transition = '.5s';
    const ball2 = <HTMLElement>document.querySelector('.ball2');
    ball2.style.marginTop = '-100vh';
    ball2.style.transition = '.5s';
    const heading = <HTMLElement>document.querySelector('.start-page-title');
    heading.style.opacity = '0';
    heading.style.transition = '.5s';
    const button: HTMLElement = document.getElementById('start-button');
    button.style.opacity = '0';
    button.style.transition = '.5s';
    setTimeout(navToPage, 500, pagename);
};

export { StartPage, startButtonOnClick };