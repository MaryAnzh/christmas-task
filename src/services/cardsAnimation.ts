
function cardAnimationOf() {
    const currentCards = document.querySelectorAll('.toy-card');
    let windowWidth = document.body.clientWidth;
    for (let i = 0; i < currentCards.length; i++) {
        const card = <HTMLElement>currentCards[i];
        card.style.animationName = 'hlop';
        setTimeout(() => {
            card.style.opacity = '0';
        }, 900);
    };
};

function cardAnimationOn() {
    const currentCards = document.querySelectorAll('.toy-card');
    let windowWidth = document.body.clientWidth;
    for (let i = 0; i < currentCards.length; i++) {
        const card = <HTMLElement>currentCards[i];
        card.style.animationName = 'hlopOn';
        setTimeout(() => { card.style.opacity = '1' }, 100);
    };
};

export { cardAnimationOf, cardAnimationOn };