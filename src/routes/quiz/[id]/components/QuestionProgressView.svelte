<script lang="ts">
  export let isCorrect: boolean | null;
</script>

<div class={`w-4 h-4 rounded-full m-3 ${isCorrect ? "bg-green-300" : (isCorrect == false ? "bg-red-300" : "bg-gray-300")}`}></div>