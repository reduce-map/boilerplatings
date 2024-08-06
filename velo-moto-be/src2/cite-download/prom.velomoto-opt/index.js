const { promGetProducts } = require('./prom-get-products.js')

promGetProducts({
    promCiteName: 'velo-moto',
    promCiteUrl: 'https://velomoto-opt.kharkov.ua/product_list',
    config: {
        // test: true,
        hasSubCategories: true,
        class_title_link: '.b-product-groups-gallery__title',
        class_gallery_item: '.b-product-gallery__item',
        class_gallery__title: '.b-product-gallery__title',
        class_price: '.b-product-gallery__prices span',
        class_code: '.b-product-gallery__sku span',
        class_state: '.b-product-gallery__state-wrap .b-product-gallery__state'
    }
})
