const createTheme = (obj) => {
  return Object.keys(obj.palette).reduce((prev, key) => {
    const cssVarName = key
      .split(/(?=[A-Z])/)
      .map((key) => key.toLowerCase())
      .join('-')
    return {
      ...prev,
      [`--${cssVarName}`]: obj.palette[key],
    }
  }, {})
}

const myTheme = createTheme({
  palette: {
    themePrimary: '#0e7490',
    themeLighterAlt: '#f1f9fb',
    themeLighter: '#cbe6ed',
    themeLight: '#a2d0dd',
    themeTertiary: '#56a6bc',
    themeSecondary: '#21819c',
    themeDarkAlt: '#0d6781',
    themeDark: '#0b576d',
    themeDarker: '#084050',
    neutralLighterAlt: '#f3f3f3',
    neutralLighter: '#efefef',
    neutralLight: '#e5e5e5',
    neutralQuaternaryAlt: '#d6d6d6',
    neutralQuaternary: '#cccccc',
    neutralTertiaryAlt: '#c4c4c4',
    neutralTertiary: '#595959',
    neutralSecondary: '#373737',
    neutralPrimaryAlt: '#2f2f2f',
    neutralPrimary: '#000000',
    neutralDark: '#151515',
    black: '#0b0b0b',
    white: '#fafafa',
  },
})

const colorsString = Object.keys(myTheme)
  .reduce((prev, key) => {
    return [...prev, `${key}: ${myTheme[key]};\n`]
  }, [])
  .join('')

export default colorsString
