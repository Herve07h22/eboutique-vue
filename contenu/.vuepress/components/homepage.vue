<template>
    <section class="my-8 container max-w-xl mx-auto">
        <ClientOnly>
            <agile :dots="true" :arrows="false" :infinite="true" :autoplay="true" :pauseOnHover="true" :speed="1000" :autoplaySpeed="3000">
                <div class="slide" v-for="picture in $page.frontmatter.carroussel">
                    <img :src="picture" alt=""/>
                </div>
            </agile>
        </ClientOnly>
        <div class="w-full text-grey-darker px-4 py-2">
            <Content/>
        </div>
        <div>
            {{ test_im }}
        </div>
    </section>
</template>

<script>
export default {
    data : function() {
        return {
        }
    },
    computed : {
        test_im() {
            return this.$lazyImages
        }
    }
    
}
</script>

<style>


</style>

