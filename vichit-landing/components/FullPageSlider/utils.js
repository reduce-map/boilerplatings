import anime from 'animejs'
import gsap from '@/utils/gsap'
const SCROLL_DURATION = 0.3

export const moveToHideSlide = (dir, targets, { height }, complete) => {
  anime({
    targets,
    duration: 50,
    easing: 'easeOutQuint',
    translateY: dir === 'next' ? -1 * height : height,
    complete,
  })
}

export const moveToShowSlide = (dir, targets, { height }) => {
  anime({
    targets,
    duration: 150,
    easing: 'easeOutQuint',
    translateY: [dir === 'next' ? height : -1 * height, 0],
  })
}

export const getCurrentSlide = (dir, current, { length }) => {
  if (dir === 'next') return current < length - 1 ? current + 1 : 0

  return current > 0 ? current - 1 : length - 1
}

export const calculatePath = (boundingClientRect, frameSize, pathType) => {
  const { height, width } = boundingClientRect
  if (pathType === 'initial') {
    return `M 0,0 0,${height} ${width},${height} ${width},0 0,0 Z M 0,0 ${width},0 ${width},${height} 0,${height} Z`
  }

  return {
    step1: `M 0,0 0,${height} ${width},${height} ${width},0 0,0 Z M ${frameSize},${frameSize} ${width},0 ${width},${height} 0,${height} Z`,
    step2: `M 0,0 0,${height} ${width},${height} ${width},0 0,0 Z M ${frameSize},${frameSize} ${
      width - frameSize
    },${frameSize} ${width},${height} 0,${height} Z`,
    step3: `M 0,0 0,${height} ${width},${height} ${width},0 0,0 Z M ${frameSize},${frameSize} ${
      width - frameSize
    },${frameSize} ${width - frameSize},${height - frameSize} 0,${height} Z`,
    step4: `M 0,0 0,${height} ${width},${height} ${width},0 0,0 Z M ${frameSize},${frameSize} ${
      width - frameSize
    },${frameSize} ${width - frameSize},${height - frameSize} ${frameSize},${
      height - frameSize
    } Z`,
  }
}

const offset = `-=${100 * 0.3}`

export const animateShapeOut = (targets, { initial, final }, onCompleat) => {
  const animateShapeOutTimeline = anime.timeline({
    duration: 100,
    easing: 'easeOutQuad',
  })

  animateShapeOutTimeline
    .add({
      targets,
      d: final.step3,
    })
    .add({
      targets,
      d: final.step2,
      offset,
    })
    .add({
      targets,
      d: final.step1,
      offset,
    })
    .add({
      targets,
      d: initial,
      offset,
      complete: onCompleat,
    })

  return animateShapeOutTimeline.finished
}

export const animateShapeIn = (targets, { final }) => {
  const animateShapeInTimeline = anime.timeline({
    duration: 100,
    easing: 'easeOutQuad',
  })
  animateShapeInTimeline
    .add({
      targets,
      d: final.step1,
    })
    .add({
      targets,
      d: final.step2,
      offset,
    })
    .add({
      targets,
      d: final.step3,
      offset,
    })
    .add({
      targets,
      d: final.step4,
      offset,
    })

  return animateShapeInTimeline.finished
}

export const debounce = (fn, wait) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }, wait)
  }
}

export function animateSlideTo({ el, onComplete }) {
  const tl = gsap.timeline()
  tl.to(window, {
    duration: SCROLL_DURATION,
    scrollTo: el,
    onComplete,
  })
}

export const getIntersectionOption = (entries) =>
  entries.reduce(
    (slides, entry) => ({
      ...slides,
      [entry.target.dataset.slide]: {
        intersectionRatio: entry.intersectionRatio,
        isIntersecting: entry.isIntersecting,
        id: Number(entry.target.dataset.slide),
      },
    }),
    {}
  )

export const getIntersectionObserver = (callback) => {
  return new IntersectionObserver(
    (entries) => {
      callback(getIntersectionOption(entries))
    },
    {
      threshold: Array.from({ length: 10 }, (_, i) => (i + 1) / 10),
    }
  )
}

export const getSlideId = (intersections, current) => {
  return Object.entries(intersections).reduce((acc, [key, value]) => {
    if (Number(key) === current || !value.isIntersecting) return acc
    if (Object.keys(acc).length === 0) return value
    if (acc.intersectionRatio <= value.intersectionRatio) return value
    return acc
  }, {}).id
}
