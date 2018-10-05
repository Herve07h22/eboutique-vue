<template>
    <div>
        <section class="my-8 container max-w-xl mx-auto px-4">
            <Content/>
        </section>
        <ClientOnly>
            <section class="my-8 container max-w-xl mx-auto px-4" v-if="cart.length">
                <h1 class="font-medium text-2xl mb-4 leading-normal" id="votre-panier">Votre panier</h1>
                <hr>
                <div class="flex flex-col"> 
                    <div class="flex flex-row my-2 p-2 flex-wrap border border-gray rounded justify-between text-xl" v-for="p in cart">
                        <div class="flex1 mx-8 my-2 p-2 w-16"><img :src="p.pict"></div>
                        <div class="self-center w-1/4 my-2 p-2">{{p.productName}}</div>
                        <div class="self-center my-2 w-1/6">
                            <svg @click="addQuantity(p.productName,-1)" aria-hidden="true" class="fill-current pt-2 h-6 w-6 text-grey hover:text-black" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"></path>
                            </svg>
                            <span class="pb-2">{{p.quantity}}</span>
                            <svg @click="addQuantity(p.productName,1)" aria-hidden="true" class="fill-current pt-2 h-6 w-6 text-grey hover:text-black" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                            </svg>

                        </div>
                        <div class="self-center w-1/6 my-2 p-2">{{p.price}} €</div>
                        <div class="self-center w-1/6 my-2 p-2 font-semibold">{{p.price * p.quantity}} €</div>
                        
                    </div>
                </div>
                <div class="text-center m-4">
                    <button class="bg-red hover:bg-grey-darkest text-white hover:text-white py-3 px-6 rounded uppercase text-xs tracking-wide">Payer</button>
                </div>
            </section>
        </ClientOnly>
        <section class="my-8 container max-w-xl m-auto flex flex-wrap flex-row items-stretch justify-between">
            
                <div  v-for="product in products" class="w-full md:w-1/3 mt-8 ">
                    <div class="rounded-lg border-grey-darker shadow-md px-4 py-2 mx-2">
                        <img :src="productPath(product.frontmatter.pictures[0])" :alt="product.frontmatter.short_description">
                        <div class="p-6 flex flex-col justify-between ">
                            <h1 class="font-medium text-xl mb-4 leading-normal"> {{ product.frontmatter.title }} </h1>
                            <p class="font-medium text-grey-dark mb-4 leading-normal">{{ product.frontmatter.short_description }}</p>
                            <p class="font-bold mb-4 text-xl">{{ product.frontmatter.price}} <span class="font-medium mb-4 leading-normal text-xs">{{ product.frontmatter.currency}}</span></p>
                    
                            <div class="flex flex-row">
                                <ClientOnly>
                                    <div class="flex-1 text-center bg-red hover:bg-grey-darkest text-white hover:text-white py-3 px-3 mx-2 rounded text-xs tracking-wide" @click="addToCart(product.frontmatter.title, 1, product.frontmatter.price, productPath(product.frontmatter.pictures[0]))">
                                        Commander
                                    </div>
                                </ClientOnly>
                                <div class="flex-1 text-center bg-white border border-grey hover:bg-grey-light hover:text-white mx-2 py-3 px-3 rounded text-xs">
                                    <router-link :to="product.path">Détails</router-link>
                                </div>
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
            cart: (localStorage.cart && JSON.parse(localStorage.cart)) || []
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
        addToCart(productName, quantity, price, pict) {
            if (this.cart) {
                var product = this.cart.filter( (p) => (p.productName == productName));
                if (!product.length) {
                    this.cart.push( { productName:productName, quantity:quantity, price:price, pict:pict } );
                }
            } else {
                this.cart = [ { productName:productName, quantity:quantity, price:price, pict:pict } ] ;
            }
            this.saveCart();
            //go to cart
            this.$router.push('/boutique.html#votre-panier')
        },
        saveCart() {
            // Save the cart
            localStorage.cart = JSON.stringify(this.cart);
        },
        addQuantity(productName, n) {
            var product = this.cart.filter( (p) => (p.productName == productName));
            if (product.length) {
                product[0].quantity = product[0].quantity +n;
                if (product[0].quantity <1 ) {
                    // remove from the cart
                    this.cart = this.cart.filter( (p) => (p.productName != productName));
                }
            }
            this.saveCart()
        }
    }
}
</script>

<style>


</style>

