<template>
    <section class="my-8 container max-w-xl mx-auto">
        <ClientOnly>
            <agile :dots="true" :arrows="false" :infinite="true" :autoplay="true" :pauseOnHover="true" :speed="1000" :autoplaySpeed="3000">
                <div class="slide" v-for="picture in $page.frontmatter.carroussel">
                    <img :src="picture.name" :height="picture.height" :width="picture.width" />
                </div>
            </agile>
        </ClientOnly>
        <div class="w-full text-grey-darker px-4 py-2">
            <Content/>
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
    }
    
}
</script>

<style>


</style>

