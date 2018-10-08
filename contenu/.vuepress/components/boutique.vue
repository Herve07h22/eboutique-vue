<template>
    <div>
        <section class="my-8 container max-w-xl mx-auto px-4">
            <Content/>
        </section>
       
       <span id="panier"></span>
        <cart ref="cartManager" :isVisible="true" :gotoPage="'/boutique.html#panier'" /> 
        
        <section class="my-8 container max-w-xl m-auto flex flex-wrap flex-row items-stretch justify-between">
            
                <div  v-for="product in products" class="w-full md:w-1/3 mt-8 ">
                    <div class="rounded-lg border-grey-darker shadow-md px-4 py-2 mx-2">
                        <app-image :image-src="product.frontmatter.pictures[0]"  />
                        <div class="p-6 flex flex-col justify-between ">
                            <h1 class="font-medium text-xl mb-4 leading-normal"> {{ product.frontmatter.title }} </h1>
                            <p class="font-medium text-grey-dark mb-4 leading-normal">{{ product.frontmatter.short_description }}</p>
                            <p class="font-bold mb-4 text-xl">{{ product.frontmatter.price}} <span class="font-medium mb-4 leading-normal text-xs">{{ product.frontmatter.currency}}</span></p>
                    
                            <div class="flex flex-row">
                                <ClientOnly>
                                    <button v-if="product.frontmatter.max_quantity" class="text-center bg-red hover:bg-grey-darkest text-white hover:text-white px-4 py-3 mx-2 rounded text-xs" @click="addToCart(product.frontmatter.title, product.frontmatter.max_quantity, product.frontmatter.price, productPath(product.frontmatter.pictures[0].name))">
                                        Commander
                                    </button>
                                    <button v-else disabled class="text-center bg-red-lighter text-white px-4 py-3 mx-2 rounded text-xs">
                                        En rupture
                                    </button>
                                </ClientOnly>
                                <router-link :to="product.path">
                                    <button class="text-center bg-white border border-grey hover:bg-grey-light mx-2 px-4 py-3 rounded text-xs">
                                    Détails
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </div>    
                </div>
            
        </section>

    </div>
</template>

<script>
export default {
    data: function () {
        return {
            newProductToaddToCart : {}
        }
    },
    computed: {
        products() {
            return this.$site.pages.filter(x => x.path.startsWith('/products/'));
        },
    },
    mounted : function () {
    },
    methods: { 
        productPath(name) {
            return "products/" + name
        },
        addToCart(title, max_quantity, price, picture) {
            this.$refs.cartManager.addToCart(
                title,
                max_quantity,
                price,
                picture
            )
        } 
    }
}
</script>

<style>



</style>

