import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect( () => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => setQuestions(data))

  }, [])

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })
    .then(()=> deleteItem(id))
  }

  function deleteItem(id){
    const newList = questions.filter(question => question.id !== id )

    setQuestions(newList)
  }

  function handleChange(e, id){
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({correctIndex: e.target.value})
    })
    .then(r=> r.json())
    .then(data => updateQuestion(data))
  }

  function updateQuestion(updatedQuestion){
    const newList = questions.map(question => {
      return question.id === updatedQuestion.id ? updatedQuestion : question } )

    setQuestions(newList)
  }

  function handleAddQuestion(formData){
    const submitData = {
      prompt : formData.prompt,
      answers : [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex : formData.correctIndex
    }

    fetch('http://localhost:4000/questions', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData)
    })
    .then(r => r.json())
    .then(d => setQuestions([...questions, d]))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleAddQuestion = {handleAddQuestion}/> : <QuestionList questions={questions} handleDelete={handleDelete} handleChange={handleChange}/>}
    </main>
  );
}

export default App;
