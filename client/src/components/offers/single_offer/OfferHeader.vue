<template>
    <header>
        <h1 v-text="offer.destination"></h1>
        <!--  -->
        <!--  -->
        <template v-if="dates.length">
            <div class="dates">
                <span>Dostępne terminy:</span>
                <ul>
                    <template v-for="(item, index) in dates">
                        <li class="date" :key="index" :class="{ soldOut: item.soldOut }">
                            <strong>
                                {{ datePart(item, "start") | fancyDate }}
                            </strong>
                            <span> - </span>
                            <strong>
                                {{ datePart(item, "end") | fancyDate }}
                            </strong>
                        </li>
                    </template>
                </ul>
            </div>
        </template>
        <!--  -->
        <div class="dates" v-else>
            <span>Aktualnie brak dostępnych terminów</span>
        </div>
    </header>
</template>

<script>
export default {
    props: ["offer"],
    methods: {
        datePart(item, part) {
            if (!this.offer) return;
            //
            return item[part].slice(0, 10);
        }
    },
    computed: {
        dates() {
            return JSON.parse(this.offer.dates);
        }
    }
};
</script>
