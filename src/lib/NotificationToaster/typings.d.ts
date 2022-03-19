export namespace NotificationToaster {
    interface TypeColors {
        [key: string]: string
    }

    interface ToasterOptions {
        /**
         * Time before the toast auto closes
         */
        autoClose?: number;

        /**
         * Type of the toast definig its color
         * Default info
         * Exisiting types: info | success | warn | error
         * 
         * You can set a custom type and color with the .
         */
        type?: string;

        /**
         * Callback that gets executed when the toast shows up
         */
        onShow?: Function;

        /**
         * Callback that gets executed when the toast auto closes
         */
        onClose?: Function;

        /**
         * Callback that gets executed when hovering the mouse on the toast
         */
        onMouseOver?: Function;

        /**
         * Callback that gets executed when the mouse exits the toast
         */
        onMouseLeave?: Function;

        id?: number;
    }

    type ToastIdObject = {
        id: number;
        toast: Toast;
    }

    interface Toaster {
        defaultOptions: ToasterOptions;
        _typeColors: TypeColors;
        containerElem: HTMLElement;
        toasts: ToastIdObject[];

        /**
         * Sets the possible colors for toasts.
         * Can also set custom types
         */
        setColors(colors: TypeColors): void;
        createToast(options?: ToasterOptions): void;
        deleteToast(id: number): void;
        clear(): void;
    }

    interface Toast {
        id: number;
        toaster: Toaster;
        options: ToasterOptions;
        element: HTMLElement;
        visibleSince: number;
        color: string;
        paused?: boolean;
        progressElem?: HTMLElement;
        progressInterval?: NodeJS.Timer;

        createProgress(): void;
        remove(): void;
    }
}