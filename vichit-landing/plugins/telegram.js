import jwt from 'jsonwebtoken'
const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NUXT_ENV_PRODUCTION_TELEGRAM_BOT
    : process.env.NUXT_ENV_LOCAL_TELEGRAM_BOT

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const telegram = $axios.create({
    baseURL,
    headers: {
      Authorization: jwt.sign({}, process.env.NUXT_ENV_JWT_BOT_KEY),
    },
  })
  // Inject to context as $telegram
  inject('telegram', telegram)
}
