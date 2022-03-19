import { NotificationToaster } from "./typings";

type StringToAny = {
    [key: string]: any;
}

export default class Toast implements NotificationToaster.Toast {
    id: number;
    element: HTMLElement;
    toaster: NotificationToaster.Toaster;
    options: NotificationToaster.ToasterOptions;
    color: string;
    visibleSince: number;
    _autoClose: number;
    _onClose: Function;
    _onShow: Function;
    _onMouseOver: Function;
    _onMouseLeave: Function;
    paused?: boolean;
    progressElem?: HTMLElement;
    progressInterval?: NodeJS.Timer;

    constructor(
        toaster: NotificationToaster.Toaster,
        options: NotificationToaster.ToasterOptions,
        color: string
    ) {
        this.toaster = toaster;
        this.element = document.createElement('div');
        this.element.classList.add('fbToast');
        this.visibleSince = new Date().valueOf();
        this.color = color;

        Object.entries(options).forEach(([key, value]) => {
            // @ts-ignore
            this[key] = value;
        });

        this.show();
    }

    set content(value: string) {
        this.element.textContent = value;
    }

    set autoClose(value: number) {
        this._autoClose = value;
    }

    set onClose(fct: Function) {
        this._onClose = fct;
        this.element.addEventListener('click', this.remove.bind(this));
    }

    set onMouseOver(fct: Function) {
        this._onMouseOver = fct;
    }

    set onMouseLeave(fct: Function) {
        this._onMouseLeave = fct;
    }

    set onShow(fct: Function) {
        this._onShow = fct;
    }

    private mouseOver() {
        this.paused = true;
        this._onMouseOver();
    }

    private mouseLeave() {
        this.paused = false;
        this._onMouseLeave();
    }

    private show() {
        this._onShow();
    }

    createProgress(): HTMLElement {
        this.paused = false;
        this.progressElem = document.createElement('div');
        this.progressElem.classList.add('fbToast-progress');

        this.element.addEventListener('mouseover', this.mouseOver.bind(this));
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this));

        let lastKnownTime: number = new Date().valueOf();
        let pauseSubtractor: number = 0;

        this.progressInterval = setInterval(() => {
            if (this.paused) {
                pauseSubtractor =
                    new Date().valueOf() - lastKnownTime.valueOf();
                return;
            }

            lastKnownTime = new Date().valueOf() - pauseSubtractor;
            const time = lastKnownTime - this.visibleSince.valueOf();
            const progress = 1 - time / this._autoClose;
            if (progress <= 0) this.remove();
            this.progressElem.style.setProperty(
                '--progress',
                progress.toString()
            );
        }, 10);

        this.setType();
        return this.progressElem;
    }

    private setType() {
        if (!this.progressElem) return;

        const type = document.createElement('div');
        type.classList.add('fbToast-type');
        this.element.appendChild(type);
        this.progressElem.style.backgroundColor = this.color;
        type.style.background = this.color;
    }

    remove() {
        this.toaster.deleteToast(this.id);
        this.element.style.height = this.element.clientHeight + 'px';
        this.element.classList.add('fbToasterConsume');

        setTimeout(() => {
            this.element.classList.add('fbToasterPrepareDelete');
            setTimeout(() => {
                this.element.remove();
            }, 500);
        }, 400);

        if (this.progressInterval) clearInterval(this.progressInterval);

        if (this._onClose) {
            this._onClose();
            this.element.removeEventListener('click', this.remove.bind(this));
        }

        if (this.progressElem) {
            this.element.removeEventListener(
                'mouseover',
                this.mouseOver.bind(this)
            );
            this.element.removeEventListener(
                'mouseleave',
                this.mouseLeave.bind(this)
            );
        }
    }
}