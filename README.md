# Slider-gallery

A new gallery for your pages!
Made with love from [Acamp](https://acamp.com/)

![Demo](/assets/example.png)

Try out a demo [here](https://judithsirera.github.io/slider-gallery/)

## Install

```js
npm i @judsirera/slider-gallery
```

## Props

| Prop            | type                  | Description                                                                                                             | Default Value                                                  |
| --------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `images`        | `Array`               | Array of image URL                                                                                                      | `[]`                                                           |
| `initialImage`  | `Number`              | The index of the active image on mount                                                                                  | `0`                                                            |
| `height`        | `Number`              | The height of the wrapper component (in px)                                                                             | `460`                                                          |
| `columnGutter`  | `Number`              | The margin between slides (in px)                                                                                       | `20`                                                           |
| `columnWidth`   | `Number`              | The width of the non-active slides (in px)                                                                              | `75`                                                           |
| `sideColumns`   | `Number`              | The number of side columns considering only one side.                                                                   | `2`                                                            |
| `containImage`  | `String`              | Whether the gallery should render the image with full height. Possible values: `"contain"`, `"contain_active"`, `"off"` | `"off"`                                                        |
| `activeOnHover` | `Boolean`             | Set to true if you want to active an image on hover                                                                     | `false`                                                        |
| `navigation`    | `Boolean` or `Object` | Sets the properties for navigation. Accepts `true`, `false` or `{ className: '', showWhenOneImageOrLess: ''}`           | `true`. When there's less than one image, navigation is hidden |
