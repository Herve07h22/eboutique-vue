<template>

    <div>
        <cart ref="cartManager" :isVisible="false" :gotoPage="'/boutique.html#panier'" /> 
        <section class="my-8 container max-w-xl mx-auto">
            <div class="flex flex-row flex-wrap">
                <div class="flex flex-col md:w-1/2 w-full p-2">
                    <div class="m-2">
                         <img :src="$withBase(displayedPicture)">
                    </div>
                    <div class="inline-flex content-start m-2">
                        <div class="w-24 p-2" v-for="picture in $page.frontmatter.pictures">
                            <img class="border hover:border-grey-dark rounded cursor-pointer" :src="$withBase(picture)" @click="displayedPicture=picture">
                        </div>
                    </div>
                </div>
                <div class="md:w-1/2 w-full">
                    <h1 class="my-4 px-4 mx-2">{{$page.frontmatter.title}}</h1>
                    <div class="m-2 px-4 text-grey-dark">
                        <Content/>
                    </div>
                    <div class="mt-8 mx-2 px-4 text-black text-sm">
                        <span>{{$page.frontmatter.product_shipping}}</span>
                    </div>
                    <div class="my-2 mx-2 px-4 text-black">
                        <span class="text-4xl font-semibold" >{{$page.frontmatter.price}}</span>
                        <span class="" >{{$page.frontmatter.currency}}</span>
                    </div>
                    <div class="mx-2 px-4 text-grey-dark text-sm">
                        <span>{{$page.frontmatter.price_explanation}}</span>
                    </div>
                    <ClientOnly v-if="$page.frontmatter.max_quantity">
                        <div  class="my-4 mx-2 text-center">
                            <button @click="addToCart($page.frontmatter.title, $page.frontmatter.max_quantity, $page.frontmatter.price, productPath($page.frontmatter.pictures[0]))" class="bg-red hover:bg-grey-darkest text-white hover:text-white py-3 px-6 rounded uppercase text-xs tracking-wide">Commander</button>
                        </div> 
                    </ClientOnly>
                    <div class="my-4 mx-2 text-center" v-else>
                        <button disabled class="bg-red-lighter text-white py-3 px-6 rounded uppercase text-xs tracking-wide">En rupture</button>
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
            displayedPicture : ""
        }
    }, 
    mounted : function() {
        this.displayedPicture = this.$page.frontmatter.pictures[0]
    },
    methods: {
        addToCart(title, max_quantity, price, picture) {
            this.$refs.cartManager.addToCart(
                title,
                max_quantity,
                price,
                picture
            ) 
        },
        productPath(name) {
            return "products/" + name
        }, 
    },
}
</script>

<style lang="css">


</style>

