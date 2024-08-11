const codeReader = new ZXing.BrowserBarcodeReader();
const previewElem = document.getElementById('preview');
const startScanButton = document.getElementById('start-scan');
const saveRecordsButton = document.getElementById('save-records');
let records = [];

startScanButton.addEventListener('click', () => {
    codeReader.decodeFromVideoDevice(null, 'preview', (result, err) => {
        if (result) {
            alert(result.text);
            records.push(result.text);
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
        }
    });
});

saveRecordsButton.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'records.json';
    a.click();
    URL.revokeObjectURL(url);
});
