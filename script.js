function generarEtiqueta() {
    const numero = document.getElementById('numero-input').value;
    const codigo = document.getElementById('codigo-input').value;
    const numero2 = document.getElementById('numero2-input').value;
    const codigo2 = document.getElementById('codigo2-input').value;

    const etiqueta = document.getElementById('etiqueta');
    const numeroEtiqueta = document.getElementById('numero-etiqueta');
    const qrCode = document.getElementById('qr-code');
    const numero2Etiqueta = document.getElementById('numero2-etiqueta');
    const qrCode2 = document.getElementById('qr-code2');

    if (numero && codigo && numero2 && codigo2) {
        numeroEtiqueta.textContent = numero;
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(codigo)}`;
        numero2Etiqueta.textContent = numero2;
        qrCode2.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(codigo2)}`;
        etiqueta.style.display = 'flex';
    }
}

function imprimirEtiqueta() {
    const cantidad = parseInt(document.getElementById('cantidad-input').value);
    if (!isNaN(cantidad) && cantidad > 0) {
        const etiqueta = document.getElementById('etiqueta').outerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Imprimir Etiqueta</title>
                <style>
                    @page {
                        size: 75mm 50mm;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .etiqueta {
                        width: 75mm;
                        height: 50mm;
                        display: flex;
                        flex-direction: column;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .etiqueta .sector {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 75mm;
                        height: 25mm;
                        padding: 5mm;
                        box-sizing: border-box;
                    }
                    .etiqueta img {
                        max-width: 20mm;
                        max-height: 20mm;
                    }
                </style>
            </head>
            <body>
                ${etiqueta}
            </body>
            </html>
        `);

        printWindow.document.close();
        
        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            }, 500);
        };
    }
}

function imprimirImagen(imagenSrc, inputId) {
    const cantidad = parseInt(document.getElementById(inputId).value);
    if (!isNaN(cantidad) && cantidad > 0) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Imprimir Imagen</title>');
        printWindow.document.write('<style>@media print { body { margin: 0; } .print-page { page-break-after: always; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; } img { max-width: 100%; max-height: 100%; object-fit: contain; } }</style>');
        printWindow.document.write('</head><body>');
        for (let i = 0; i < cantidad; i++) {
            printWindow.document.write('<div class="print-page">');
            printWindow.document.write(`<img src="${imagenSrc}" alt="Etiqueta">`);
            printWindow.document.write('</div>');
        }
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }
}
