<template>

<div>
    <section class="my-8 container max-w-xl mx-auto flex items-stretch sm:items-center">
    <div class="flex items-start items-stretch flex-wrap-reverse">
        <div class="flex flex-col items-start w-full lg:w-1/3 ">
            <div v-for="picture in $page.frontmatter.pictures" class="flex-1 px-4 py-2">
                <img :src="picture" alt=""/>
            </div>
        </div>
        <div class="w-full lg:w-2/3 text-grey-darker px-4 py-2">
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

.btn {
  @apply font-bold py-2 px-4 rounded;
}

.btn-blue {
  @apply bg-blue text-white;
}

.btn-blue:hover {
  @apply bg-blue-dark;
}

</style>

