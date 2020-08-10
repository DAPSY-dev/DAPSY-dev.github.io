function formsNeedsValidation(form) {
    'use strict'

    if (!(form instanceof HTMLElement)) {
        throw Error('HTML element expected as argument.')
    }

    form.addEventListener('submit', e => {
        if (!form.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
}

export default formsNeedsValidation
