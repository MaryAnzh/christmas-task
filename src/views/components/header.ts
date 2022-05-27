import { PageRenderer } from './../pages/PageRenderer'
import { data } from './../../toyData';
import { navToPage, currentPage } from '../../index';
import { startButtonOnClick } from './../pages/startPage';
import { resetSetting } from './../pages/treePage';

let Header: PageRenderer = {
    render: async () => {
        let view =  /*html*/`
         <div class="header-wrap">
            <nav class="nav-bar">
                <a class="logo" id="logo" data-page="StartPage"></a>
                <a class="toy" id="toy" data-page="ToyPage">Игрушки</a>
                <a class="fir-tree" id="fir-tree" data-page="TreePage">Ёлка</a>
            </nav>
            <div class="header-controls">
            <input type="search" id="search" class="search" autocomplete="off" autofocus placeholder="Введите запрос">
            <div class="select">
                <span id="favorite-toy-count"></span>
            </div>
            </div>
         </div>
        `
        return view
    },
    after_render: async () => {
        let favoriteCount: number = 0;
        for (let i = 0; i < data.length; i++) {
            data[i].favorite ? favoriteCount++ : false;
        };
        const favoriteCountELem = <HTMLLIElement>document.getElementById('favorite-toy-count');
        favoriteCountELem.textContent = favoriteCount.toString();

        const logo = document.getElementById('logo');
        logo.addEventListener('click', navToPageOnClick);
        const toy = document.getElementById('toy');
        toy.addEventListener('click', navToPageOnClick);
        const firTree = document.getElementById('fir-tree');
        firTree.addEventListener('click', navToPageOnClick);
    }

}

function navToPageOnClick(e: Event) {
    const elem = <HTMLElement>e.target;
    const page = elem.dataset.page;
    switch (currentPage) {
        case 'StartPage':
            startButtonOnClick(e);
            break;
        case 'TreePage':
            resetSetting();
            const blur2 = <HTMLElement>document.querySelector('.blur');
            blur2.style.opacity = '0';
            blur2.style.transition = '.5s';
            setTimeout(navToPage, 500, page);
            break;
        case 'ToyPage':
            const blur = <HTMLElement>document.querySelector('.blur');
            blur.style.opacity = '0';
            blur.style.transition = '.5s';
            setTimeout(navToPage, 500, page);
            break;
    };
};

export { Header };