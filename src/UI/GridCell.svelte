
<script lang="ts">
  export let borderSize = 2;
  export let borderStyle: 'dashed' | 'solid' | 'dotted' | 'double' | 'none' = 'none';
  export let borderColor = 'gray-300';

  const bSize = `border-b-${borderSize}`;
  const bStyle = `border-${borderStyle}`;
  const bColor = `border-${borderColor}`;

</script>

<div class="{`w-full flex justify-center items-center ${bSize} ${bStyle} ${bColor} border-opacity-100;`}">
  <slot></slot>
</div>