class Helpers{
    static prepareProduct(product){
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            images: [...product.all_media_urls],
            description: product.description,
            thumbnail: product.thumbnail_url,
        }
    }

    static prepareCategory(category){
        return {
            id: category.id,
            name: category.name,
            description: category.description
        }
    }

    static displayAsPrice(price){
        return (Math.round(price) / 100).toFixed(2);
    }
}

export default Helpers;