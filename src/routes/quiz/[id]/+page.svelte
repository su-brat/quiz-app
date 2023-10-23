<script lang="ts">
  import { goto } from "$app/navigation";
  import QuestionText from "./components/QuestionText.svelte";
  import QuestionOption from "./components/QuestionOption.svelte";
  import QuestionProgressView from "./components/QuestionProgressView.svelte";
  import {answers, type Answer} from "../../../store";
  import { onMount } from "svelte";
  export let data;
  const quizId = data.id;
  let markedAnswers: Answer[];
  answers.subscribe((answers) => markedAnswers = answers)
  onMount(() => {
    let answersValue = []
    for (let question of data.questions) {
      answersValue.push({
        id: question.id,
        isCorrect: null,
        optionSelected: null
      });
    }
    answers.set(answersValue);
  })
  let currentQuestionIndex = 0;
  let totalQuestions = data.questions.length;
  $: currentQuestionId = currentQuestionIndex + 1;
  $: currentQuestion = data.questions[currentQuestionIndex];
  $: currentOptions = currentQuestion.options;
  $: currentAnswer = currentQuestion.answer;
  $: optionSelected = markedAnswers.find((answer) => answer.id === currentQuestionId)?.optionSelected;
  const onOptionSelect = (label: string) => {
    answers.update((answersValue) => {
      let updatedAnswers = [];
      for (let answer of answersValue) {
        if (answer.id === currentQuestionId) {
          updatedAnswers.push({
            id: answer.id,
            isCorrect: currentAnswer === label,
            optionSelected: label
          })
        } else updatedAnswers.push(answer);
      }
      return updatedAnswers;
    });
  }
</script>

<div class="w-full p-4">
  <div class="flex justify-center">
    {#each markedAnswers as answer (answer.id) }
      <QuestionProgressView isCorrect={answer.isCorrect} />
    {/each}
  </div>
  <QuestionText text={currentQuestion.text} />
  {#each currentOptions as option (option.id)}
    <QuestionOption 
      text={option.text} 
      label={option.label} 
      onSelect={() => onOptionSelect(option.label)} 
      isCorrectAnswer={currentAnswer === option.label} 
      isSelected={optionSelected === option.label} 
      locked={optionSelected ? true : false}
    />
  {/each}
  <div class="text-center">
    <button 
      class="bg-gray-800 text-white px-4 py-2 my-4 hover:bg-gray-700 justify-center shadow"
      on:click={() => currentQuestionIndex = currentQuestionIndex === 0 ? totalQuestions - 1 : (currentQuestionIndex - 1) % totalQuestions}
    >
      ← Prev
    </button>
    <button 
      class="bg-gray-800 text-white px-4 py-2 my-4 hover:bg-gray-700 justify-center shadow"
      on:click={() => goto(`/quiz/${quizId}/result`)}
    >
      Finish
    </button>
    <button 
      class="bg-gray-800 text-white px-4 py-2 my-4 hover:bg-gray-700 justify-center shadow"
      on:click={() => currentQuestionIndex = (currentQuestionIndex + 1) % totalQuestions}
    >
      Next →
    </button>
  </div>
</div>
