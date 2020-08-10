const easeInOutQuad = t => ((t < 0.5) ? (2 * t * t) : (-1 + (4 - 2 * t) * t))

function scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) {
    'use strict'

    const runtime = currentTime - startTime
    let progress = runtime / duration

    progress = Math.min(progress, 1)

    const ease = easeInOutQuad(progress)

    window.scroll(0, startScrollOffset + (scrollEndElemTop * ease))

    if (runtime < duration) {
        requestAnimationFrame(timestamp => {
            const currentTime = timestamp || new Date().getTime()

            scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset)
        })
    }
}

function smoothScroll(anchor, options) {
    'use strict'

    if (!(anchor instanceof HTMLElement)) {
        throw Error('HTML element expected as first argument.')
    }

    options = (typeof options !== 'undefined') ? options : {}

    if (!(options && typeof options === 'object' && options.constructor === Object)) {
        throw Error('Object expected as second argument.')
    }

    if (!('duration' in options)) options.duration = 500
    if (!('offset' in options)) options.offset = 0

    anchor.addEventListener('click', e => {
        e.preventDefault()

        const scrollElemId = e.target.href.split('#')[1]
        const scrollEndElem = document.getElementById(scrollElemId)

        requestAnimationFrame(timestamp => {
            const stamp = timestamp || new Date().getTime()
            const start = stamp
            const startScrollOffset = window.pageYOffset
            const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top - options.offset

            scrollToElem(start, stamp, options.duration, scrollEndElemTop, startScrollOffset)
        })

        setTimeout(() => {
            window.history.pushState({}, '', `#${ scrollElemId }`)
        }, 50);
    })
}

export default smoothScroll
