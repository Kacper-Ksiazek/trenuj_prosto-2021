<template>
    <section id="gallery">
        <h3>Galeria <b-icon icon="card-image"></b-icon></h3>
        <div class="gallery-items">
            <!--  -->
            <template v-for="(_, index) in gallery">
                <div class="single-gallery-item" :key="index">
                    <div class="img" :style="getGalleryImg(index)"></div>
                    <span @click="openGalleryModal(index)">Powiększ</span>
                </div>
            </template>
            <!--  -->
        </div>
        <template v-if="JSON.parse(offer.gallery).length > 3">
            <button @click="displayEntireGallery = !displayEntireGallery" class="display-control" v-text="displayEntireGallery ? 'Zwiń' : 'Rozwiń'">Rozwiń</button>
        </template>
        <!--  -->
        <b-modal id="img-preview-modal" :title="`Zdjęcie (${currentGalleryModalIndex + 1}/${gallery.length})`" hide-footer class="modal" ref="modal">
            <div class="modal-img" :style="getGalleryImg(currentGalleryModalIndex)"></div>
            <div class="buttons-wrap">
                <button @click="changeCurrentModalItem('prev')">Poprzednie</button>
                <span class="gallery-page" v-text="`(${currentGalleryModalIndex + 1}/${gallery.length})`"></span>
                <button @click="changeCurrentModalItem('next')">Następne</button>
            </div>
        </b-modal>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["offer"],
    computed: {
        ...mapState(["API_ADDRESS"]),
        gallery() {
            const gallery = JSON.parse(this.offer.gallery);
            if (this.displayEntireGallery) return gallery;
            else return gallery.slice(0, 3);
        }
    },
    data() {
        return {
            currentGalleryModalIndex: 0,
            displayEntireGallery: false
        };
    },
    methods: {
        getGalleryImg(index) {
            if (!this.gallery) return;
            const { API_ADDRESS, offer } = this;
            const { id } = offer;
            //
            const url = `${API_ADDRESS}/api/offer/single/${id}/gallery/${index}`;
            return `background-image: url(${url})`;
        },
        openGalleryModal(index) {
            this.currentGalleryModalIndex = index;
            this.$refs.modal.show();
        },
        changeCurrentModalItem(direction) {
            const { currentGalleryModalIndex: current, gallery } = this;
            const { length } = gallery;
            if (direction === "prev" && current > 0) {
                this.currentGalleryModalIndex--;
            } else if (direction === "next" && current < length - 1) {
                this.currentGalleryModalIndex++;
            }
        }
    }
};
</script>
