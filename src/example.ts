import './example.scss';

const getRandomFromArray: any = (arr: any[]) => {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
};
const possibleDurations: number[] = [3000, 4000, 5000, 6000, 7000, 8000]
const possibleToastOptions = [
    {
        content: 'Successful Operation !',
        type: 'success',
        autoClose: getRandomFromArray(possibleDurations),
    },
    {
        content: 'Something went wrong.',
        type: 'error',
        autoClose: getRandomFromArray(possibleDurations),
    },
    {
        content: 'What a great toaster this is !',
        type: 'info',
        autoClose: getRandomFromArray(possibleDurations),
    },
    {
        content: 'Careful now, that\'s not allowed.',
        type: 'warn',
        autoClose: getRandomFromArray(possibleDurations),
    },
    {
        content: 'Custom color',
        type: 'customGreen',
        autoClose: 10000
    }
];

const toaster = window.notificationToaster;
toaster.setColors({customGreen: "lightGreen"})

const makeDummyToast = (e: KeyboardEvent) => {
    if (e.key == 't') toaster.createToast(getRandomFromArray(possibleToastOptions));
};

document.addEventListener('keypress', makeDummyToast);

const btnInfo = document.getElementById('info');
const btnSuccess = document.getElementById('success');
const btnWarn = document.getElementById('warn');
const btnError = document.getElementById('error');

const btns = [btnInfo, btnSuccess, btnWarn, btnError];

btns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e: Event) => {
        const type = (e.target as HTMLButtonElement).id;
        const index = possibleToastOptions.findIndex(o => o.type === type);
        if (index == -1) return;
        toaster.createToast(possibleToastOptions[index]);
    })
})

document.getElementById('customType');
document.getElementById('customColor');

document.getElementById('tryCustom').addEventListener('click', (e) => {
    toaster.setColors({
        // @ts-ignore
        type: document.getElementById('customType').value,
        // @ts-ignore
        color: document.getElementById('customColor').value
    })
    toaster.createToast({
        // @ts-ignore
        type: document.getElementById('customType').value,
        // @ts-ignore
        content: "Custom color"
    });
})