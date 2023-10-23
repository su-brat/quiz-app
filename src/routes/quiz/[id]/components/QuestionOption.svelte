<script lang="ts">
  export let text: string;
  export let label: string;
  export let onSelect: any;
  export let isCorrectAnswer: boolean;
  export let isSelected: boolean;
  export let locked: boolean;
</script>

<button class={`shadow w-full m-2 flex justify-center ${locked ? (isCorrectAnswer ? "bg-green-700": (isSelected ? "bg-yellow-600" : "bg-red-700")) : "hover:bg-gray-100"}`} on:click={locked ? null : onSelect}>
  <span class="border text-center w-[10%] p-3">{label}</span>
  <span class="border text-left w-[90%] p-3">{text}</span>
</button>
