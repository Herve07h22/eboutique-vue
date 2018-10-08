<template>
    <img
        :data-src="lazySrc"
        :style="style"
        class="AppImage fade"
    >
</template>

<script>


export default {
    name: 'AppImage',
    
    props: {
        imageSrc : {
            type : Object,
            default: null,
        },
        imagePath : {
            type : Boolean,
            default: true,
        },
    },
    data() {
        return {
        loading: true,
        backgroundColor : '#efefef',
        height: this.imageSrc.height,
        width: this.imageSrc.width,
        observer : null
        };
    },
    computed: {
        lazySrc() {
            if (this.imagePath) {
                return this.imageSrc.path + "/" + this.imageSrc.name
            } else {
                return this.imageSrc.name
            }
        },
        aspectRatio() {
            // Calculate the aspect ratio of the image
            // if the width and the height are given.
            
            if (!this.width || !this.height) return null;

            return (this.height / this.width) * 100;
        },
        style() {
            // The background color is used as a
            // placeholder while loading the image.
            // You can use the dominant color of the
            // image to improve perceived performance.
            // See: https://manu.ninja/dominant-colors-for-lazy-loading-images/
            const style = { backgroundColor: this.backgroundColor };

            if (this.width) style.width = `${this.width}px`;

            // If the image is still loading and an
            // aspect ratio could be calculated, we
            // apply the calculated aspect ratio by
            // using padding top.
            const applyAspectRatio = this.loading && this.aspectRatio;
            if (applyAspectRatio) {
                // Prevent flash of unstyled image
                // after the image is loaded.
                style.height = 0;
                // Scale the image container according
                // to the aspect ratio.
                style.paddingTop = `${this.aspectRatio}%`;
            }

            return style;
        },
    },
    
    mounted() {

        // As soon as the <img> element triggers
        // the `load` event, the loading state is
        // set to `false`, which removes the apsect
        // ratio we've applied earlier.
        const setLoadingState = () => {
            this.loading = false;
        };
        this.$el.addEventListener('load', setLoadingState);


        // We remove the event listener as soon as
        // the component is destroyed to prevent
        // potential memory leaks.
        this.$once('hook:destroyed', () => {
            this.$el.removeEventListener('load', setLoadingState);
        });

        // We initialize Lozad.js on the root
        // element of our component.
        this.observer = window.lozad(this.$el);
        //const observer = window.lozad();
        this.observer.observe();
    },
};
</script>

<style lang="scss">
    // Responsive image styles.
    .AppImage {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    }

    .fade {
    animation-name: fade;
    animation-duration: 2s;
    }

    @keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
    }

</style>