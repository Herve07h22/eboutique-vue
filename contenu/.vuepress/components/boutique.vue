<template>
    <div>
        <section class="my-8 container max-w-xl mx-auto">
            <Content/>
        </section>

        <section class="my-8 container max-w-xl m-auto flex flex-wrap flex-row items-stretch justify-between">
            
                <div  v-for="product in products" class="w-full md:w-1/4 rounded-lg border-grey-darker shadow px-4 py-2">
                    <img :src="productPath(product.frontmatter.pictures[0])" :alt="product.frontmatter.short_description">
                    <div class="p-6 flex flex-col justify-between ">
                        <h1 class="font-medium text-xl mb-4 leading-normal"> {{ product.frontmatter.title }} </h1>
                        <p class="font-medium text-grey-dark mb-4 leading-normal">{{ product.frontmatter.short_description }}</p>
                        <p class="font-medium mb-4 leading-normal">{{ product.frontmatter.price}} {{ product.frontmatter.currency}}</p>
                
                        <div class="flex flex-row content-between">
                            <div class="text-sm flex-1 hover:bg-grey-light rounded text-center mx-2 p-1">
                                <router-link  :to="product.path">Acheter</router-link>
                            </div>
                            <div class="text-sm flex-1 hover:bg-grey-light rounded text-center mx-2 p-1">
                                <router-link :to="product.path">Détail</router-link>
                            </div>
                        </div>
                    </div>    
                </div>
            
        </section>

    </div>


</template>

<script>
export default {
    computed: {
        products() {
            return this.$site.pages.filter(x => x.path.startsWith('/products/'));
        }
    },
    methods: { 
        productPath(name) {
            return "products/" + name
        }
    }
    
}
</script>

<style>


</style>

