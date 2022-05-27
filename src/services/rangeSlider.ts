class RangeSlider extends HTMLElement {
    private startOutput: HTMLElement;
    private endOutput: HTMLElement;
    private startRunner: HTMLElement
    private endRunner: HTMLElement;
    private startLine: HTMLElement;
    private endLine: HTMLElement;
    private startValueChanged: Event;
    private endValueChanged: Event;

    private rendered = false;
    // private leftRunerPosition: number;
    // private rightRunerPosition: number;
    // private leftLineWidth: number;
    // private rightLineWidth: number;

    private position: {
        x: number,
        y: number,
        startValue: number,
        endValue: number,
        runner: HTMLElement
    };

    get lineWidth(): number {
        return +this.getAttribute('linewidth');
    }

    set lineWidth(value: number) {
        this.setAttribute('linewidth', value.toString());
    }

    get runnerSize(): number {
        return +this.getAttribute('runersize');
    }

    set runnerSize(value: number) {
        this.setAttribute('runersize', value.toString());
    }

    get step(): number {
        return +this.getAttribute('step');
    }

    set step(value: number) {
        this.setAttribute('step', value.toString());
    }

    get minValue(): number {
        return +this.getAttribute('minvalue');
    }

    set minValue(value: number) {
        if (value > this.maxValue) {
            value = this.maxValue;
        }
        this.setAttribute('minvalue', value.toString());
    }

    get maxValue(): number {
        return +this.getAttribute('maxvalue');
    }

    set maxValue(value: number) {
        if (value < this.minValue) {
            value = this.minValue;
        }
        this.setAttribute('maxvalue', value.toString());
    }

    get startValue(): number {
        return +this.getAttribute('startvalue');
    }

    set startValue(value: number) {
        if (value < this.minValue) {
            value = this.minValue;
        }
        if (value > this.endValue) {
            value = this.endValue;
        }
        this.setAttribute('startvalue', value.toString());
    }

    get endValue(): number {
        return +this.getAttribute('endvalue');
    }

    set endValue(value: number) {
        if (value > this.maxValue) {
            value = this.maxValue;
        }
        if (value < this.startValue) {
            value = this.startValue;
        }
        this.setAttribute('endvalue', value.toString());
    }

    static observedAttributes = [
        'linewidth',
        'runersize',
        'step',
        'minvalue',
        'maxvalue',
        'startvalue',
        'endvalue'
    ];


    constructor() {
        super();
        this.startValueChanged = new Event('startValueChanged');
        this.endValueChanged = new Event('endValueChanged');
    }

    connectedCallback() {
        this.startOutput = document.createElement('output');
        this.endOutput = document.createElement('output');
        this.startRunner = document.createElement('div');
        this.endRunner = document.createElement('div');
        this.startLine = document.createElement('div');
        this.endLine = document.createElement('div');

        const sliderContaner = document.createElement('div');
        sliderContaner.className = 'range-slider-contaner';
        this.append(sliderContaner)

        const rangeSliderLines = document.createElement('div');

        this.startOutput.className = 'range-slider__output';
        this.startOutput.textContent = this.minValue.toString();
        rangeSliderLines.className = 'range-slider__range-line';
        this.endOutput.className = 'range-slider__output';
        this.endOutput.textContent = this.maxValue.toString();
        sliderContaner.append(this.startOutput, rangeSliderLines, this.endOutput);

        const linesContaner = document.createElement('div');
        linesContaner.className = 'range-slider__range-line-cuntaner';
        linesContaner.style.width = `${this.lineWidth}px`

        this.startRunner.className = 'range-slider__runer-left';
        this.startRunner.style.width = `${this.runnerSize}px`;
        this.startRunner.style.height = `${this.runnerSize}px`;
        this.startRunner.style.cursor = 'grab';
        this.startRunner.addEventListener('mousedown', this.runnerOnMouseDown);

        this.endRunner.className = 'range-slider__runer-right';
        this.endRunner.style.width = `${this.runnerSize}px`;
        this.endRunner.style.height = `${this.runnerSize}px`;
        this.endRunner.style.cursor = 'grab';
        this.endRunner.addEventListener('mousedown', this.runnerOnMouseDown);

        rangeSliderLines.append(linesContaner, this.startRunner, this.endRunner);

        this.startLine.className = 'range-slider__line';
        this.endLine.className = 'range-slider__line';
        linesContaner.append(this.startLine, this.endLine);

        this.rendered = true;
        this.update();
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!this.rendered) {
            return;
        }
        switch (name) {
            case 'linewidth': {
                this.onLineWidthChanged(+oldValue, +newValue);
                break;
            }
            case 'runersize': {
                this.onRunerSizeChanged(+oldValue, +newValue);
                break;
            }
            case 'minvalue': {
                this.onMinValueChanged(+oldValue, +newValue);
                break;
            }
            case 'maxvalue': {
                this.onMaxValueChanged(+oldValue, +newValue);
                break;
            }
            case 'startvalue': {
                this.onStartValueChanged(+oldValue, +newValue);
                break;
            }
            case 'endvalue': {
                this.onEndValueChanged(+oldValue, +newValue);
                break;
            }
        }
    }

    private onLineWidthChanged(oldValue: number, newValue: number) {
        this.update();
    }

    private onRunerSizeChanged(oldValue: number, newValue: number) {
        this.update();
    }

    private onMinValueChanged(oldValue: number, newValue: number) {
        this.update();
    }

    private onMaxValueChanged(oldValue: number, newValue: number) {
        this.update();
    }

    private onStartValueChanged(oldValue: number, newValue: number) {
        this.update();
    }

    private onEndValueChanged(oldValue: number, newValue: number) {
        this.update();
    }

    private update() {

        const delta = this.maxValue - this.minValue;
        const startDx = this.startValue - this.minValue;
        const endDx = this.endValue - this.minValue;

        const leftCenter = this.lineWidth * (startDx / delta);
        const rightCenter = this.lineWidth * (endDx / delta)

        const leftRunnerMargin = leftCenter - this.runnerSize / 2;
        
        const rightRunnerMargin = rightCenter - this.runnerSize / 2;
        const leftLineWidth = leftCenter + this.runnerSize/2;
        const rightLineWidth = this.lineWidth - (rightCenter - this.runnerSize / 2);

        this.startRunner.style.marginLeft = `${leftRunnerMargin}px`;
        this.endRunner.style.marginLeft = `${rightRunnerMargin}px`;
        this.startLine.style.width = `${leftLineWidth}px`;
        this.endLine.style.width = `${rightLineWidth}px`;
        if (leftRunnerMargin == 0 || leftRunnerMargin < this.runnerSize) {
            this.startRunner.style.zIndex = '5';
            this.endRunner.style.zIndex = '6';
        }
        if (rightRunnerMargin > (this.lineWidth - this.runnerSize)) {
            this.startRunner.style.zIndex = '6';
            this.endRunner.style.zIndex = '5';
        }


        if (this.step == undefined || this.step < 1) {
            this.startOutput.textContent = Math.round(this.startValue).toString();
            this.endOutput.textContent = Math.round(this.endValue).toString();
        }
        else {
            this.startOutput.textContent = (Math.round(this.startValue / this.step) * this.step).toString();
            this.endOutput.textContent = (Math.round(this.endValue / this.step) * this.step).toString();
        };


    }


    private runnerOnMouseDown = (e: MouseEvent) => {
        const runer = <HTMLElement>e.target;
        runer.scrollTop = 100;
        runer.scrollLeft = 150;

        this.position = {
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
            startValue: this.startValue,
            endValue: this.endValue,
            runner: runer
        };

        document.addEventListener('mousemove', this.runnerOnMouseMove);
        document.addEventListener('mouseup', this.runnerOnMouseUp);

        runer.style.cursor = 'grabbing';

        runer.ondragstart = () => false;
    }

    private runnerOnMouseMove = (e: MouseEvent) => {
        const runer = this.position.runner;
        const dx = e.clientX - this.position.x;
        let dv = (this.maxValue - this.minValue) * (dx / this.lineWidth);
        if (this.step > 0) {
            dv = Math.round(dv / this.step) * this.step;
        }
        if (runer == this.startRunner) {
            this.startValue = this.position.startValue + dv;
        }
        else if (runer == this.endRunner) {
            this.endValue = this.position.endValue + dv;
        }

        // let startValue: number = +this.startValue;
        // let currentRunnerPos = startValue + dx - 10;
        // currentRunnerPos < -10 ? currentRunnerPos = -10 : currentRunnerPos;
        // currentRunnerPos > 290 ? currentRunnerPos = 290 : currentRunnerPos;
        // this.startRunner.style.marginLeft = `${currentRunnerPos}px`;
    }

    private runnerOnMouseUp = (e: MouseEvent) => {
        const runer = this.position.runner;
        
        document.removeEventListener('mousemove', this.runnerOnMouseMove);
        document.removeEventListener('mouseup', this.runnerOnMouseUp);

        runer.style.cursor = 'grab';
        runer.style.removeProperty('user-select');
        if (runer == this.startRunner) {
            this.dispatchEvent(this.startValueChanged);
        }
        else if (runer == this.endRunner) {
            this.dispatchEvent(this.endValueChanged);
        }
    };

    adoptedCallback() {
        // вызывается, когда элемент перемещается в новый документ
        // (происходит в document.adoptNode, используется очень редко)
    }


};


// (Math.random() * Number.MAX_SAFE_INTEGER).toFixed().toString();
export { RangeSlider };