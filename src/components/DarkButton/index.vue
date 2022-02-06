<template>
  <div class="btn-container">
    <button
        class="dark-button"
        aria-pressed="false"
        @click="buttonClick($event)"
    >
      <svg class="button-svg" focusable="false">
        <use class="svg_mode-dark" xlink:href="#icon-mode-dark"/>
        <use class="svg_mode-light" xlink:href="#icon-mode-light"/>
      </svg>
    </button>
    <!-- Icon Definitions -->
    <svg class="visually-hidden" v-show="false">
      <defs>
        <symbol viewBox="0 0 960 960" id="icon-mode-dark">
          <path
              d="M340 41C47 129-112 544 147 798c207 204 515 205 713-62-166 6-347-43-455-189-109-147-80-372-65-506z"
          />
          <path
              d="M870 331l-12 102 93 43-101 20-12 102-50-90-101 20 70-75-50-90 93 43 70-75zM522 300l23 57 62-5-47 40 23 57-52-32-48 40 15-60-52-33 61-4 15-60zM744 16l12 89 89 16-81 39 12 90-62-65-81 39 42-80-62-65 89 16 42-79z"
          />
        </symbol>
        <symbol viewBox="0 0 960 960" id="icon-mode-light">
          <circle cx="479.5" cy="480.5" r="242"/>
          <path
              d="M480 800c22 0 40 18 40 40v80a40 40 0 01-80 0v-80c0-22 18-40 40-40zm480-320c0 22-18 40-40 40h-80a40 40 0 010-80h80c22 0 40 18 40 40zM706 763l57 56a40 40 0 1056-56l-56-57a40 40 0 10-57 57zm-509 56l57-56a40 40 0 10-57-57l-56 57a40 40 0 1056 56zm-77-379a40 40 0 010 80H40a40 40 0 010-80h80zm21-243l56 57a40 40 0 1057-57l-57-56a40 40 0 10-56 56zm622 57l56-57a40 40 0 10-56-56l-57 56a40 40 0 1057 57zM440 40v80a40 40 0 0080 0V40a40 40 0 00-80 0z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>
<script>
export default {
  name: "DarkButton",
  components: {},
  data: function () {
    return {
      count: 0,
      info: null,
      scrollTop: 0,
      clickedClass: "button-clicked",
    };
  },
  watch: {
    //如果滚动了页面,则取消按钮的选中状态
    scrollTop: function () {
      let btn = document.querySelector(".dark-button");
      btn.blur();
    },
  },
  methods: {
    animEnd: function (e) {
      e.target.classList.remove(this.clickedClass);
      e.target.removeEventListener("animationend", this.animEnd);
    },
    buttonClick: function (e) {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      e.target.classList.add(this.clickedClass);
      e.target.addEventListener("animationend", this.animEnd, false);

      let attr = e.target.getAttribute("aria-pressed");
      let pressed = attr === "true" ? "false" : "true";
      e.target.setAttribute("aria-pressed", pressed);
    },
    // 保存滚动值，这是兼容的写法
    handleScroll() {
      this.scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style lang="scss">
$btn-fg: #503660;
$btn-bg: #FFFFFF;
$btn-fg-hover: #1976D2;
$btn-bg-hover: #FFFFFF;

.dark-button {
  box-sizing: content-box;
  display: block;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0.25rem;
  color: $btn-fg;
  background-color: $btn-bg;
  border: 0.125rem solid transparent;
  border-radius: 50%;
  text-decoration: none;
  outline: 0 solid;
  transition: all 0.3s ease-out;

  &:hover,
  &:focus {
    color: $btn-fg-hover;
    background-color: $btn-bg-hover;
    border-color: $btn-fg-hover;
    transform: scale(1.2);
    box-shadow: 0 0.5em 0.5em rgba(0, 0, 0, 0.4);
  }
}

.button-svg {
  width: 1.75rem;
  height: 1.75rem;
  fill: currentColor;
  stroke: currentColor;
  border-radius: 100%;
  overflow: hidden;
  pointer-events: none;
  transition: transform 0.5s ease-out;
}

/* Light / dark mode button specifically */
.dark-button[aria-pressed="false"] .svg_mode-dark,
.dark-button[aria-pressed="true"] .svg_mode-light {
  display: none;
}

.dark-button[aria-pressed="false"] .svg_mode-light,
.dark-button[aria-pressed="true"] .svg_mode-dark {
  display: block;
}

/* Button click animation */
.dark-button.button-clicked {
  animation: btn-clicked 0.3s ease-out forwards;
}

@keyframes btn-clicked {
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>