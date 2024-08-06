import { extend } from 'vee-validate'
import {
    required,
    email,
    min,
    max,
    regex,
    length,
} from 'vee-validate/dist/rules'

// Add the required rule
extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('regex', regex)
extend('length', length)
