import { IToyCard } from "../views/pages/ToyCard";

class ToyCardsSort  {
    cardArray: IToyCard[];
    constructor(cardArray: IToyCard[]) {
        this.cardArray = cardArray;
    }

    sortAtoZ() {
        this.cardArray.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        });
    }
    sortZtoA() {
        this.cardArray.sort((a, b) => {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            // a должно быть равным b
            return 0;
        });
    }

    sortYearMax() {
        this.cardArray.sort((a, b) => {
            return +a.year - +b.year;
        });
    }

    sortYearMin() {
        this.cardArray.sort((a, b) => {
            return +b.year - +a.year;
        });
    }

    // whatSort(value: string) {
    //     value == 'sort-name-min' ? this.sortZtoA() :
    //         value == 'sort-name-max' ? this.sortZtoA() :
    //             value == 'sort-year-max' ? this.sortYearMax() :
    //                 value == 'sort-year-min' ? this.sortYearMin() : false;
    // }     
    
};

export { ToyCardsSort }