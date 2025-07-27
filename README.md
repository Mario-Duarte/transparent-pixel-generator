# Transparent Pixel Generator

A lightweight, __dependency-free__ library to generate base64 transparent pixel PNGs on the client-side, ideal for creating dynamic backgrounds and placeholders without server requests.

## Why would you need this?

This function is useful to create transparent semi-transparent background as CSS opacity attribute applies to the whole element and child elements, while this pixel can be used as a background image with specific opacity.

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