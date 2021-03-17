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
}

export default Helpers;