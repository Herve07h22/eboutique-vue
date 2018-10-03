<template>
    <div>
        <section class="my-8 container max-w-xl mx-auto px-4">
            <Content/>
        </section>

        <section v-for="creation in creations" class="my-8 container max-w-xl m-auto">
            <div class="mt-16">
                <h1>{{creation.frontmatter.title}}</h1>
                <hr>
                <p class="text-grey-darker px-4 py-2">
                        <span v-html="creation.excerpt"></span>
                </p>
            </div>
            <div class="flex flex-row flex-wrap px-4 py-2">
                <div class="flex1 w-1/2" v-for="picture in creation.frontmatter.pictures">
                     <img :src="creationPath(picture)">
                </div>
            </div>
        </section>

    </div>


</template>

<script>
export default {
    computed: {
        creations() {
            return this.$site.pages.filter(x => x.path.startsWith('/creations/'));
        }
    },
    methods: { 
        creationPath(name) {
            return "creations/" + name
        }
    }
    
}
</script>

<style>


</style>

