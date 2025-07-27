# Transparent Pixel Generator

A lightweight, dependency-free library to generate transparent pixel images on the client-side, ideal for creating dynamic backgrounds, placeholders, or tracking pixels without server requests.

## Installation

```bash
npm install transparent-pixel-generator
```

## Usage

```javascript
import { transparentPixelGenerator } from 'transparent-pixel-generator';

const pixel = transparentPixelGenerator({
  width: 100,
  height: 100,
  color: '#ff0000',
  alpha: 0.5
});

document.body.style.backgroundImage = `url(${pixel})`;
```

## API

### `transparentPixelGenerator(options)`

Generates a transparent pixel image.

**Options**

- `width` (number, optional): The width of the image in pixels. Defaults to `1`.
- `height` (number, optional): The height of the image in pixels. Defaults to `1`.
- `color` (string, optional): The color of the pixel in hex or rgb format. Defaults to `#ffffff`.
- `alpha` (number, optional): The alpha transparency of the pixel. Defaults to `0`.

**Returns**

A base64 encoded PNG image.

### `hexToRgb(hex)`

Converts a hex color to an RGB object.

**Parameters**

- `hex` (string): The hex color to convert.

**Returns**

An object with `r`, `g`, and `b` properties.

## License

MIT
