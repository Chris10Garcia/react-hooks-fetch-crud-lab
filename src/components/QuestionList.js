import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDelete, handleChange}) {
  const questionItemJSX = questions.map(question => {
    return (
      <QuestionItem key = {question.id} question={question} handleDelete = {handleDelete} handleChange={handleChange}/>
    )
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItemJSX}</ul>
    </section>
  );
}

export default QuestionList;
