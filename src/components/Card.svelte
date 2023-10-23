<script lang="ts">
  import imageUrls from "../images";
  import { goto } from "$app/navigation";
  export let quiz: {
    id: number;
    name: string;
    imageUrl: string;
    questions: {
      id: number;
      text: string;
      options: { id: number; label: string; text: string }[];
      answer: string;
    }[];
  };
</script>

<div
  class="quiz-card shadow w-[310px] rounded overflow-hidden cursor-pointer m-2 flex flex-col items-center"
  on:click={() => goto(`/quiz/${quiz.id}`)}
>
  <img src={imageUrls[quiz.imageUrl]} alt={quiz.name} class="h-44" />
  <div class="flex items-center justify-between p-3 w-full">
    <h1 class="font-bold">{quiz.name}</h1>
    <p>{quiz.questions.length} question(s)</p>
  </div>
</div>
