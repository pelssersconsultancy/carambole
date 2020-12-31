<style lang="scss">
    .grid-cell {
      @apply w-full flex justify-center items-center border-b-2 border-dashed border-gray-300 border-opacity-100;
  }
</style>

<div class="grid-cell">
  <slot></slot>
</div>