describe('ScreenShots', () => {
    const sizes = [
        {
            width: 1200,
            height: 720,
        },
        {
            width: 768,
            height: 720,
        },
        {
            width: 576,
            height: 720,
        },
    ]

    const screenShotMaker = ({ url, name }) => {
        sizes.forEach(({ width, height }) => {
            cy.visit(url)
            cy.viewport(width, height)
            cy.screenshot(`${name}_${width}_${height}`)
        })
    }

    it('main', () => {
        screenShotMaker({
            url: '/',
            name: 'main',
        })
    })

    it('subscription all', () => {
        screenShotMaker({
            url: '/subscription/all',
            name: 'subscription-all',
        })
    })

    it('subscription add', () => {
        screenShotMaker({
            url: '/subscription/add/subscription',
            name: 'subscription-add',
        })
    })
})
