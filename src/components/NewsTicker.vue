<script>
    import { newsMessages } from "@/game/news";

    export default {
        name: "NewsTicker",
        data(){
            return {
                newsText: "",
                lastEntries: [],
                speed: player.options.newsTicker.speed,
                animationDuration: "",
                animationKey: 0
            };
        },
        mounted(){
            this.updateNews(); 
            const news = this.$refs.news;
        },
        methods: {
            update(){
                this.speed = player.options.newsTicker.speed;
            },
            updateNews(){
                let newsText = this.pickNewsText();
                while(this.lastEntries.includes(newsText)){
                    newsText = this.pickNewsText();
                }
                this.newsText = newsText;
                this.lastEntries.push(newsText);
                if(this.lastEntries.length > 10) this.lastEntries.shift();
                this.animationKey++;
                this.$nextTick(this.calcAnimationDuration);
            },
            calcAnimationDuration(){
                const news = this.$refs.news;
                const totalVWDist = (news.scrollWidth / window.innerWidth) * 100 + 100;
                
                const duration = totalVWDist / this.speed;
                this.animationDuration = `${duration}s`
            },
            pickNewsText(){
                return newsMessages[Math.floor(Math.random()*newsMessages.length)];
            }
        }
    };
</script>

<template>
    <div id="news-ticker">
        <div id="scroll-text" ref="news" :style="{animationDuration: animationDuration}" 
            :key="animationKey" @animationend="updateNews">
            {{ newsText }}
        </div>
    </div>
</template>

<style scoped>
    #news-ticker {
        border: 2px solid;
        width: 100%;
        padding: 5px 0;
        overflow: hidden;
        position: relative;
    }

    #scroll-text {
        position: relative;
        display: inline-block;
        white-space: nowrap;
        animation: scroll linear;
    }

    @keyframes scroll {
        from {
            transform: translateX(100vw);
        }
        to {
            transform: translateX(-100%);
        }
    }
</style>
