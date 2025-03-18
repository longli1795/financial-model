<template>
  <div>
    <div class="logo-text">长虹格润</div>
  </div>
  <router-view />
</template>

<style scoped>
.logo-text {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(45deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: 'Microsoft YaHei', sans-serif;
  padding: 1.5em;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}
</style>
