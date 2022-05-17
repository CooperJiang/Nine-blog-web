<template>
  <div :id="id" :style="{ width: width || '' }" class="rotating-text">
    <p
      v-for="(word, i) in words"
      :key="`${word}-${i}`"
      class="rotating-text-word"
    >
      <span
        v-for="(letter, j) in word.label || word"
        :key="`${letter}-${j}`"
        :style="{ color: word.color || '' }"
        class="rotating-text-letter"
        >{{ letter }}</span
      >
    </p>
  </div>
</template>

<script>
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
export default {
  name: 'RotatingText',
  props: {
    words: {
      type: Array,
      default() {
        return []
      }
    },
    interval: {
      type: Number,
      default: 4000
    },
    width: {
      type: String,
      default: '2em'
    },
    color: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      id: guid(),
      currentWordIndex: 0
    }
  },
  mounted() {
    const _this = this
    this.maxWordIndex = this.words.length - 1
    this.wordsDom = document
      .getElementById(_this.id)
      .querySelectorAll('.rotating-text-word')
    this.start()
    this.rotateText()
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer)
  },

  methods: {
    start() {
      const _this = this
      this.timer = setTimeout(function () {
        _this.rotateText()
        _this.start()
      }, this.interval)
    },
    rotateText() {
      const currentWord = this.wordsDom[this.currentWordIndex]
      const nextWord =
        this.currentWordIndex === this.maxWordIndex
          ? this.wordsDom[0]
          : this.wordsDom[this.currentWordIndex + 1]
      // rotate out letters of current word
      Array.from(currentWord.children).forEach(function (letter, i) {
        setTimeout(function () {
          letter.className = 'rotating-text-letter out'
        }, i * 80)
      })
      // reveal and rotate in letters of next word
      nextWord.style.opacity = '1'
      Array.from(nextWord.children).forEach(function (letter, i) {
        letter.className = 'rotating-text-letter behind'
        setTimeout(function () {
          letter.className = 'rotating-text-letter in'
        }, 340 + i * 80)
      })
      this.currentWordIndex =
        this.currentWordIndex === this.maxWordIndex
          ? 0
          : this.currentWordIndex + 1
    }
  }
}
</script>

<style lang="less">
.rotating-text {
  display: inline-flex;
  margin: 0;
  vertical-align: top;
  justify-content: center;
  &-word {
    position: absolute;
    display: flex;
    opacity: 0;
  }
  &-letter {
    // transform-origin: center center 25px;
    font-weight: bold;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }
  &-letter.out {
    transform: rotateX(90deg);
    transition: 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
  }
  &-letter.in {
    transition: 0.38s ease;
  }
  &-letter.behind {
    transform: rotateX(-90deg);
  }
}
</style>
