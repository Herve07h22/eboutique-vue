<template>
    <div>
        <ClientOnly>
            <div>
                <section v-if="(isVisible && cart.length) || somethingWrong || thankYou" class="my-8 container max-w-xl mx-auto px-4">
                    <h1 class="font-medium text-2xl mb-4 leading-normal" id="votre-panier">Votre panier</h1>
                    <hr>
                    <div v-if="somethingWrong" class="bg-red-lightest border border-red-light text-red-dark px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Mince !</strong>
                        <span class="block sm:inline">{{informationMessage}}</span>
                        <span class="absolute pin-t pin-b pin-r px-4 py-3">
                            <svg class="fill-current h-6 w-6 text-red" role="button" @click="somethingWrong=false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>

                    <div v-if="thankYou" class="bg-green-lightest border border-green-light text-green-dark px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Parfait !</strong>
                        <span class="block sm:inline">{{informationMessage}}</span>
                        <span class="absolute pin-t pin-b pin-r px-4 py-3">
                            <svg class="fill-current h-6 w-6 text-green" role="button" @click="thankYou=false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>

                    <div class="flex flex-col"> 
                        <div class="flex flex-row my-2 p-2 flex-wrap border border-gray rounded justify-between text-xl" v-for="p in cart">
                            <div class="flex1 mx-8 my-2 p-2 w-16"><img :src="p.pict"></div>
                            <div class="self-center w-1/2 md:w-1/4 my-2 p-2">{{p.productName}}</div>
                            <div class="self-center text-center my-2 w-1/2 md:w-1/6">
                                <svg @click="addQuantity(p.productName,-1)" aria-hidden="true" class="fill-current pt-2 h-6 w-6 text-grey hover:text-black" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"></path>
                                </svg>
                                <span class="pb-2">{{p.quantity}}</span>
                                <svg @click="addQuantity(p.productName,1)" aria-hidden="true" class="fill-current pt-2 h-6 w-6 text-grey hover:text-black" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                                </svg>

                            </div>
                            <div class="self-center text-center md:text-left w-1/2 md:w-1/6 my-2 p-2">{{p.price}} €</div>
                            <div class="self-center text-center md:text-left w-full md:w-1/6 my-2 p-2 font-bold">{{p.price * p.quantity}} €</div>
                            
                        </div>
                    </div>
                    <div class="text-center m-4">
                        <button v-if="!waitButton && !processingOrder && cart.length" @click="checkout" class="bg-red hover:bg-grey-darkest text-white hover:text-white py-3 px-6 rounded uppercase text-xs tracking-wide">
                            Payer
                        </button>
                        <button v-if="waitButton || processingOrder" disabled class="bg-red-lighter text-white py-3 px-6 rounded uppercase text-xs tracking-wide">
                            Paiement en cours...
                        </button>
                    </div>
                </section>
            </div>
        </ClientOnly>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            cart: [],
            thankYou : false,
            somethingWrong: false,
            informationMessage: "",
            waitButton: false,
            processingOrder: false
        }
    },
    props: {
        isVisible: Boolean,
        gotoPage : String,
    },
    mounted : function () {
        this.cart = localStorage.cart && JSON.parse(localStorage.cart) || [];
        //console.log("Mounting stripe checkout")
        //const script = document.createElement('script');
        //script.src = 'https://checkout.stripe.com/checkout.js';
        //document.getElementsByTagName('head')[0].appendChild(script);
    },
    methods: {
        checkout() {
            
            const options = {
                key: 'pk_test_m9CdtooEtrGFF5NEru2IySxv',
                locale: 'auto',
                currency: 'EUR',
                billingAddress: true,
                panelLabel: 'Payer {{amount}}',
            }
            console.log("Configuring the options");
            if (window.StripeCheckout) {
                var checkout = window.StripeCheckout.configure(options);
            } else {
                this.somethingWrong = true
                this.informationMessage = "Le système de paiement en ligne n'est pas disponible. Etes-vous bien connectés ? Sinon, fermez votre navigateur et ré-essayez."
                return;
            }

            if (this.cart) {
                var totalAmount = this.cart.reduce( (somme, p) => somme+(p.quantity*p.price),0) * 100
                var self = this
                const successfullOrder = () => {
                    self.thankYou = true
                    self.somethingWrong = false
                    self.processingOrder = false
                    self.informationMessage = "Votre commande est enregistrée ! Vous allez recevoir un mail de confirmation."
                    self.cart = []
                    self.saveCart()
                    return true;    
                }

                const errorOrder = () => {
                    self.thankYou = false
                    self.somethingWrong = true
                    self.processingOrder = false
                    self.informationMessage = "Une erreur est survenue pendant le traitement de votre commande. Il s'agit probablement d'une erreur lors de la saisie des informations de votre CB. Rien ne sera débité."
                    return false;    
                }
    
                this.waitButton = true
                checkout.open({
                    name: 'Jon Jon',
                    currency: 'EUR',
                    amount: totalAmount,
                    closed: function () {
                        self.waitButton = false
                    },
                    token: (token) => {
                        self.processingOrder = true
                        // on appelle l'API
                        var json_upload = JSON.stringify({
                             amount:totalAmount,
                             currency:'eur', 
                             description:'Jon Jon', 
                             source:token.id,
                             email:token.email,
                             cart:this.cart
                        });
                        console.log("Retour de Stripe - envoi de la requète à AWS")
                        
                        var xmlhttp = new XMLHttpRequest();  
                        xmlhttp.open("POST", "https://efdct405r4.execute-api.eu-west-3.amazonaws.com/api/pay/jonjon");
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send(json_upload);
                        xmlhttp.onreadystatechange = function() {
                            if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200) {
                                var response = JSON.parse(xmlhttp.response);
                                successfullOrder();
                            } else {
                                errorOrder();
                            }
                        }
                    } 
                })
            }
        },
        addToCart(productName, maxQuantity, price, pict) {
            if (this.cart) {
                var product = this.cart.filter( (p) => (p.productName == productName));
                if (!product.length) {
                    this.cart.push( { productName:productName, quantity:1, maxQuantity : maxQuantity, price:price, pict:pict } );
                }
            } else {
                this.cart = [ { productName:productName, quantity:1, maxQuantity : maxQuantity, price:price, pict:pict } ] ;
            }
            this.saveCart();
            //go to cart
            if (this.gotoPage) {
                this.$router.push(this.gotoPage)
            }
        },
        saveCart() {
            // Save the cart
            localStorage.cart = JSON.stringify(this.cart);
        },
        addQuantity(productName, n) {
            var product = this.cart.filter( (p) => (p.productName == productName));
            if (product.length) {
                product[0].quantity = Math.min( product[0].quantity +n, product[0].maxQuantity);
                if (product[0].quantity <1 ) {
                    // remove from the cart
                    this.cart = this.cart.filter( (p) => (p.productName != productName));
                }
            }
            this.saveCart()
        },    
    }
    
}
</script>

<style>


</style>

