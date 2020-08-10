import bootstrap from 'bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

import '../scss/index.scss'

import smoothScroll from './components/smooth-scroll.js'
import formsNeedsValidation from './components/forms-needs-validation'

window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const smoothScrollEls = document.querySelectorAll('.smooth-scroll')

    if (smoothScrollEls.length) {
        let smoothScrollEl = null

        for (smoothScrollEl of smoothScrollEls) {
            smoothScroll(smoothScrollEl, { offset: 32 })
        }
    }

    const formsNeedsValidationEls = document.querySelectorAll('.needs-validation')

    if (formsNeedsValidationEls.length) {
        let formsNeedsValidationEl = null

        for (formsNeedsValidationEl of formsNeedsValidationEls) {
            formsNeedsValidation(formsNeedsValidationEl)
        }
    }
})
