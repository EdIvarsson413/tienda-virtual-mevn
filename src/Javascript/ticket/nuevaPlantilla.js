// generarPlantilla.js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// Construccion de la fecha actual
const fecha = () => {
    const date = new Date()
    const dia = date.getDate();
    const mesa = date.getMonth() + 1;
    const año = date.getFullYear();
    return (`${dia}-${mesa}-${año}`)
}

const generarPDF = async (arregloRaw, cliente) => {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Cargar la fuente estándar Helvetica y Bold para cabeceras
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Crear una nueva página
    const page = pdfDoc.addPage();

    // Establecer el tamaño y la posición del encabezado
    page.drawText('Factura', {
        x: 50,
        y: page.getHeight() - 50,
        size: 24,
        font,
        color: rgb(0, 0, 0),
    });

    // Establecer fecha
    page.drawText("Fecha", {
        x: page.getWidth() - (100 - 3),
        y: page.getHeight() - 43,
        size: 13,
        font,
        color: rgb(0,0,0)
    })
    
    // Fecha actual y formateada
    page.drawText(fecha(), {
        x: page.getWidth() - (107 - 3),
        y: page.getHeight() - 55,
        size: 11,
        font: fontBold,
        color: rgb(0,0,0)
    })

    // CLiente
    page.drawText("Cliente", {
        x: 75,
        y: page.getHeight() - 100,
        size: 14,
        font,
        color: rgb(0,0,0)
    })

    page.drawText(cliente, {
        x: (77 + 55)/2,
        y: page.getHeight() - 113,
        size: 10,
        font: fontBold,
        color: rgb(0,0,0)
    })


    // Remitente
    page.drawText("Remitente", {
        x: page.getWidth() - (102 + 37),
        y: page.getHeight() - 100,
        size: 14,
        font,
        color: rgb(0,0,0)
    })

    page.drawText("Librerias Castor", {
        x: page.getWidth() - (105 + 37),
        y: page.getHeight() - 113,
        size: 10,
        font: fontBold,
        color: rgb(0,0,0)
    })

    // Establecer el tamaño y la posición de la tabla de productos
    const tablaX = 50;
    const tablaY = page.getHeight() - 160;
    const tablaWidth = page.getWidth() - 100;

    // Función para dibujar una celda en la tabla
    const dibujarCelda = (text, x, y, width, height, bold = '', total = 0)  => {
        page.drawText(text, {
            x: total === 0 ? (x + 5) : (x + 5 + total),
            y: y + 5,
            size: 12,
            font: bold === '' ? font: fontBold,
            color: rgb(0, 0, 0),
        });
        page.drawRectangle({
            x,
            y,
            width,
            height,
            borderWidth: 0.5,
            borderColor: rgb(0.6, 0.6, 0.6),
        });
    };

    // Dibujar encabezados de columna en la tabla
    dibujarCelda('Descripción', tablaX, tablaY, tablaWidth * 0.4, 20, 'bold');
    dibujarCelda('Cantidad', tablaX + tablaWidth * 0.4, tablaY, tablaWidth * 0.15, 20, 'bold');
    dibujarCelda('Precio unitario', tablaX + tablaWidth * 0.55, tablaY, tablaWidth * 0.2, 20, 'bold');
    dibujarCelda('Subtotal', tablaX + tablaWidth * 0.75, tablaY, tablaWidth * 0.25, 20, 'bold');

    // Establecer la posición inicial de los datos de productos
    let datosY = tablaY; let calcularTotal = 0;

    // Dibujar los datos de productos en la tabla
    for (const producto of arregloRaw) {
        datosY -= 20;
        dibujarCelda(producto.nombre, tablaX, datosY, tablaWidth * 0.4, 20);
        dibujarCelda(producto.unidades.toString(), tablaX + tablaWidth * 0.4, datosY, tablaWidth * 0.15, 20);
        dibujarCelda("$"+producto.precio.toString(), tablaX + tablaWidth * 0.55, datosY, tablaWidth * 0.2, 20);
        dibujarCelda(("$"+producto.unidades * producto.precio).toString(), tablaX + tablaWidth * 0.75, datosY, tablaWidth * 0.25, 20);
        calcularTotal += (producto.unidades * producto.precio);
    }

    // Celda de total
    dibujarCelda(' ', tablaX, datosY -= 20, tablaWidth * 0.4, 20);
    dibujarCelda(' ', tablaX + tablaWidth * 0.4, datosY, tablaWidth * 0.15, 20);
    dibujarCelda('Total', tablaX + tablaWidth * 0.55, datosY, tablaWidth * 0.2, 20, 'bold', 60);
    dibujarCelda("$"+calcularTotal.toString(), tablaX + tablaWidth * 0.75, datosY , tablaWidth * 0.25, 20,);

    // Agradecimiento
    page.drawText("Gracias, vuelva pronto :3", {
        x: tablaWidth/2 - 30,
        y: datosY - 50,
        font,
        size: 12,
        color: rgb(0,0,0)
    })

    // Guardar el documento PDF en un buffer
    const pdfBytes = await pdfDoc.save();

    // Crear un objeto Blob a partir de los bytes del PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Crear un enlace y simular un clic para descargar el archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'factura.pdf';
    link.click();
};

export { generarPDF };
