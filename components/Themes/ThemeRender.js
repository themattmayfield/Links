import { themes } from "@/utils/themes";

let ThemeRender = {};

themes.map((theme) => {
  ThemeRender[theme.name] = require(`./${theme.name}`).default;
});

// ThemeRender['Component2'] = require('./Component2').default;
// ThemeRender['Component3'] = require('./Component3').default;

export default ThemeRender;
