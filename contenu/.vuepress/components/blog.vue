<template>
    <div>
        <section class="my-8 container max-w-xl mx-auto px-4">
            <Content/>
        </section>

        <section class="my-8 container max-w-xl m-auto flex flex-wrap flex-row items-stretch content-start">
            <div class="flex1 w-full md:w-1/2 p-4" v-for="art in articles">
                <div class="flex flex-col border shadow rounded w-full h-full p-2 justify-between">
                    <div class="flex1">
                        <router-link :to="art.path">
                            <h2 class="text-grey-darker mx-4 my-8">{{art.frontmatter.title}}</h2>
                            <img class="py-2" :src="articlePath(art.frontmatter.pictures[0])"/>
                        </router-link>
                    </div>
                    <div class="flex1">
                        <router-link :to="art.path">
                            <div class="text-xl border border-grey hover:text-white hover:bg-red rounded text-center mx-2 p-2">
                                Lire l'article
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

        </section>
    </div>

</template>

<script>
export default {
    computed: {
        articles() {
            return this.$site.pages.filter(x => x.path.startsWith('/blog/'));
        }
    },
    methods: { 
        articlePath(name) {
            return "blog/" + name
        }
    }
    
}
</script>

<style>


</style>

