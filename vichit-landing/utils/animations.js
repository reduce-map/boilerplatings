import gsap from './gsap'

export const slideOption = ({
  fromLeft = true,
  duration = 1,
  horizontal = true,
}) => {
  return {
    from: {
      opacity: 0,
      duration,
      [horizontal ? 'xPercent' : 'yPercent']: fromLeft ? -100 : 100,
    },
    to: {
      duration,
      opacity: 1,
      [horizontal ? 'xPercent' : 'yPercent']: 0,
    },
  }
}

const getStartEnd = ({ offsetHeight }, type) => {
  if (type === 'slide-in') {
    return {
      start: `top bottom`,
      end: `top bottom-=${100}`,
    }
  }
  return {
    start: `top bottom-=${offsetHeight}`,
    end: `bottom bottom-=${offsetHeight * 2}`,
  }
}

export const TOGGLE_ACTIONS = {
  PLAY: 'play',
  PAUSE: 'pause',
  RESUME: 'resume',
  RESET: 'reset',
  RESTART: 'restart',
  COMPLETE: 'complete',
  REVERSE: 'reverse',
  NONE: 'none',
}

export const DEFAULT_TOGGLE_ACTION = getToggleAction({
  onEnter: TOGGLE_ACTIONS.PLAY,
  onLeave: TOGGLE_ACTIONS.REVERSE,
  onEnterBack: TOGGLE_ACTIONS.PLAY,
  onLeaveBack: TOGGLE_ACTIONS.REVERSE,
})

export function getToggleAction(option = {}) {
  const { onEnter, onLeave, onEnterBack, onLeaveBack } = {
    onEnter: TOGGLE_ACTIONS.PLAY,
    onLeave: TOGGLE_ACTIONS.NONE,
    onEnterBack: TOGGLE_ACTIONS.NONE,
    onLeaveBack: TOGGLE_ACTIONS.NONE,
    ...option,
  }
  return `${onEnter} ${onLeave} ${onEnterBack} ${onLeaveBack}`
}

export function isElementInViewport(el, isSameViewport = true) {
  const localElement = isSameViewport ? el : el.parentElement
  const rect = localElement.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  )
}

export const getIndigo = (indigo, isSameViewport) => {
  indigo.classList.add('animate-indigo')
  const isScrub = !isElementInViewport(indigo, isSameViewport)
  const tl = gsap.timeline({
    duration: isScrub ? 0 : 1,
    scrollTrigger: {
      trigger: indigo,
      scrub: isScrub,
      markers: true,
      ...getStartEnd(indigo),
    },
  })

  const tl3 = gsap.timeline()
  tl3.to(indigo, {
    y: indigo.offsetHeight,
    opacity: 1,
  })

  tl3.to(indigo, {
    x: indigo.offsetHeight * 5,
    rotation: 360,
  })

  tl.add(tl3)

  return tl
}

export const getIndigo2 = (selector) => {
  const indigos = document.querySelectorAll(selector)
  return Array.from(indigos, (el) => getIndigo(el))
}

export const animateSlideIn = (selector, { isSameViewport = false } = {}) => {
  const elements = document.querySelectorAll(selector)
  return Array.from(elements, (el, i) => slideIn(el, isSameViewport))
}

function slideIn(element, isSameViewport) {
  element.classList.add('animate-slide-in')
  const isScrub = !isElementInViewport(element, isSameViewport)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      scrub: isScrub ? 2 : false,
      ...getStartEnd(element, 'slide-in'),
    },
  })
  const tl3 = gsap.timeline()
  tl3.to(element, {
    y: 0,
    opacity: 1,
    duration: 2,
  })
  tl.add(tl3)
  return tl
}

export const horizontalAnimate = (collection, horizontalOption = {}) => {
  const { from, to } = slideOption(horizontalOption)
  collection.forEach(({ trigger, target }) => {
    gsap
      .timeline({
        onComplete: horizontalOption.onComplete ?? (() => {}),
        scrollTrigger: {
          trigger,
          toggleActions: DEFAULT_TOGGLE_ACTION,
        },
      })
      .add(gsap.timeline().from(target, from).to(target, to))
  })
}
