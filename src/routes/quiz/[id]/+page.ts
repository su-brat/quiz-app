import { error } from "@sveltejs/kit";
import quizzes from "../../../data.json";

export function load({ params }) {
  const quiz = quizzes.find((quiz) => quiz.id === parseInt(params.id));
  if (quiz) return quiz;
  throw error(404, "Quiz not found");
}