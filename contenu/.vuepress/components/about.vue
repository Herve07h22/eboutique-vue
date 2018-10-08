<template>

<div>
    <section class="my-8 container max-w-xl mx-auto flex items-stretch sm:items-center">
    <div class="flex items-start items-stretch flex-wrap-reverse">
        <div class="flex flex-col items-start w-full lg:w-1/3 ">
            <div v-for="picture in $page.frontmatter.pictures" class="flex-1 px-4 py-2">
                <app-image :image-src="picture" />
            </div>
        </div>
        <div class="w-full lg:w-2/3 px-4 py-2">
            <Content/>
        </div>
    </div>
    </section>

</div>


</template>

<script>
export default {
    
}
</script>

<style lang="css">


</style>

