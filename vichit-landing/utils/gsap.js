import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js'
export { ScrollTrigger } from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

gsap.registerEffect({
  name: 'fadeIn',
  effect: (targets, config) => {
    return gsap.to(targets, {
      duration: config.duration,
      onComplete: config.onComplete,
      opacity: 0,
    })
  },
  defaults: { duration: 0.1 },
  extendTimeline: true,
})

gsap.registerEffect({
  name: 'fadeOut',
  effect: (targets, config) => {
    return gsap.to(targets, {
      duration: config.duration,
      onComplete: config.onComplete,
      opacity: 1,
    })
  },
  defaults: { duration: 0.1 },
  extendTimeline: true,
})

export default gsap
