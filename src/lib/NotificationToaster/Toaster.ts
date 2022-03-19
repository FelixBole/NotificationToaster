import Toast from './Toast';
import { NotificationToaster } from './typings';

export default class Toaster implements NotificationToaster.Toaster {
    _typeColors: NotificationToaster.TypeColors = {
        error: '#f14668',
        warn: '#FFC800',
        success: '#48c78e',
        info: '#3e8ed0',
    };

    defaultOptions: NotificationToaster.ToasterOptions = {
        autoClose: 10000,
        type: 'info',
        onShow: () => {},
        onClose: () => {},
        onMouseOver: () => {},
        onMouseLeave: () => {},
    };

    containerElem: HTMLElement;
    toasts: NotificationToaster.ToastIdObject[];
    currentToastId: number;

    constructor(containerId: string = null) {
        this.containerElem = containerId
            ? document.getElementById(containerId)
            : document.createElement('div');
        this.containerElem.classList.add('fbToaster');
        document.body.append(this.containerElem);

        this.toasts = [];
        this.currentToastId = 0;
    }

    setColors(colors: NotificationToaster.TypeColors) {
        for (const key in colors) {
            this._typeColors[key] = colors[key]
        }
    }

    createToast(options: NotificationToaster.ToasterOptions = {}) {
        options.id = this.currentToastId;
        options = { ...this.defaultOptions, ...options };
        const color = this._typeColors[options.type];
        const toast = new Toast(this, options, color);
        this.toasts.push({ id: options.id, toast });
        this.currentToastId++;
        this.containerElem.append(toast.element);
        const progress = toast.createProgress();
        toast.element.appendChild(progress);
    }

    deleteToast(id: number) {
        const index = this.toasts.findIndex((o) => o.id === id);
        if (index > -1) this.toasts.splice(index, 1);
    }

    clear() {
        for (const element of this.toasts) {
            element.toast.remove();
        }
    }
}
