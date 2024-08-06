export const hideOnEsc = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide }) {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        hide()
      }
    }

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown)
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown)
      },
    }
  },
}

export const getAppendTo = (appendTo) => {
  const appendToDefault = () => document.body
  if (typeof appendTo === 'string' && appendTo !== 'parent') {
    const el = document.getElementsByClassName(appendTo)?.[0]
    if (el) return el
  }

  return appendTo || appendToDefault
}

export const modifiers = ({ flipOption = { fallbackPlacements: [] } }) => {
  return [flip(flipOption), preventOverflow()]
}

export const preventOverflow = () => ({
  name: 'preventOverflow',
})

export const flip = ({ fallbackPlacements = [] }) => ({
  name: 'flip',
  options: {
    fallbackPlacements,
  },
})
