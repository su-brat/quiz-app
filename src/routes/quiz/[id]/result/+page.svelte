<script lang="ts">
  import { answers, type Answer } from "../../../../store";
  let markedAnswers: Answer[];
  answers.subscribe((value) => markedAnswers = value);
  $: totalCount = markedAnswers.length;
  $: correctCount = markedAnswers.filter((answer) => answer.isCorrect).length;
  $: incorrectCount = markedAnswers.filter((answer) => answer.isCorrect === false).length;
</script>
<h1>Result (Correct / Total / Incorrect): <strong><span class="text-green-700">{correctCount}</span> / {totalCount} / <span class="text-red-700">{incorrectCount}</span></strong></h1>