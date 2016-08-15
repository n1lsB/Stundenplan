// A Simple Funktion Libary, nothing to do with Angular or even jQuery :-)

/*
    Transferes a HEX Color Code (like #00FFFF) to an RGB object.
      Hex: HEX Color Code
*/
let hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 255, g: 255, b: 255};
}
