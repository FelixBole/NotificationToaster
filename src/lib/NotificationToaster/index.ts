import "./style/toaster.scss";
import Toaster from "./Toaster";

declare global {
    interface Window {
        notificationToaster: Toaster;
    }
}

window.notificationToaster = new Toaster();

export default Toaster;