import { fabric } from 'fabric';

export const initCenteringGuidelines = (canvas) => {

    const line9 = new fabric.Line([
        canvas.width / 2, 0,
        canvas.width / 2, canvas.width
    ], {
        strokeDashArray: [5, 5],
        stroke: 'red',
    })

    line9.selectable = false;
    line9.evented = false;

    const line10 = new fabric.Line([
        0, canvas.height / 2,
        canvas.width, canvas.height / 2

    ], {
        strokeDashArray: [5, 5],
        stroke: 'red',
        strokeWidth: 1,
    })

    line10.selectable = false;
    line10.evented = false;



    let snapZone = 15;

    canvas.on('object:moving', function (options) {
        let objectMiddleHorizontal = options.target.left + (options.target.width * options.target.scaleX) / 2;

        console.log("Left: " + options.target.left);
        console.log("Right: " + options.target.right);
        console.log("Width: " + options.target.width);

        if (objectMiddleHorizontal > canvas.width / 2 - snapZone &&
            objectMiddleHorizontal < canvas.width / 2 + snapZone) {
            options.target.set({
                left: canvas.width / 2 - (options.target.width * options.target.scaleX) / 2,
            }).setCoords();

            canvas.add(line9);

            document.addEventListener("mouseup", () => {
                canvas.remove(line9);
            });

        } else {
            canvas.remove(line9);
        }

        let objectMiddleVertical = options.target.top + (options.target.height * options.target.scaleY) / 2;

        if (objectMiddleVertical > canvas.height / 2 - snapZone &&
            objectMiddleVertical < canvas.height / 2 + snapZone) {
            options.target.set({
                top: canvas.height / 2 - (options.target.height * options.target.scaleY) / 2,
            }).setCoords();

            canvas.add(line10);

            document.addEventListener("mouseup", () => {
                canvas.remove(line10);
            });

        } else {
            canvas.remove(line10);
        }

    });
}
