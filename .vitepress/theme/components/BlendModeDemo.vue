<template>
    <div class="layer" id="layer1">
        <div class="can-container">
            <img src="http://47.109.134.184:9000/myimages/can%202.png" class="can-img" />
            <img src="http://47.109.134.184:9000/myimages/Contents.png" alt="" class="can-wrapper">
        </div>
    </div>
</template>

<!-- 这里有个神秘bug，没法正常展示Contents.png -->

<!-- fix: 使用object-fit: cover; 来解决变形的问题 -->
<style scoped>
    .layer {
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    #layer1 {
        background: rgb(255, 239, 219);
        z-index: 2;
    }

    .can-container {
        width: 200px;
        position: relative;
        overflow: hidden;
    }

    .can-img {
        width: 100%;
    }

    .can-wrapper {
        mix-blend-mode: multiply;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -51%);
        height: 90%;
        width: 100%;
        object-fit: cover; 
    }
</style>