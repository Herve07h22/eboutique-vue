<template>
    <div>
        <section class="my-8 container max-w-xl mx-auto px-4 text-center">
            <app-image :image-src="$page.frontmatter.pictures[0]" :image-path="false" />
        </section>
        <section class="my-8 container max-w-xl mx-auto px-4">
            <h1 class="mt-4 mb-8">{{$page.frontmatter.title}}</h1>
            <Content/>
        </section>

    </div>

</template>

<script>
export default {
    
}
</script>

<style>


</style>

