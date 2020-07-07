import React, { useState } from 'react';
import './App.css';
import Recipe from "./Recipe"

function App() {
  const api ={
    id : "16be93e9",
    key : "02d3995094d9eee6cd40cccdea90a76f",
    base : "https://api.edamam.com/"
  }
  //"https://api.edamam.com/search?q=chicken&app_id=${16be93e9}&app_key=${02d3995094d9eee6cd40cccdea90a76f}"

  const[query,setQuery]= useState('');
  const [recipes, setRecipes] = useState([]);

  function handleChange(event){
    const val = event.target.value;
    setQuery(val);
    
  }

   async function searchFood(event){
    event.preventDefault();
    // fetch(`${api.base}search?q=${query}&app_id=${api.id}&app_key=${api.key}`)
    //     .then(res => res.json())
    //     .then(result => {
    //       setRecipes(result.hits);
    //       setQuery('');
    //       console.log(result.hits);
    //     });

    const res = await fetch(`${api.base}search?q=${query}&app_id=${api.id}&app_key=${api.key}`);
    const data  = await res.json();
    setRecipes(data.hits);
    setQuery('');
    console.log(data.hits);

  }

  return (
    <div className="App">
    <form className="search-form" onSubmit = {searchFood}>
      <input onChange ={handleChange} className="search-bar" type = "text" value={query}/>
      <button className="search-button" type="submit">Search</button>
    </form>
    <div className="recipes">
        {recipes.map(item =>{
            return <Recipe key={item.recipe.label} title={item.recipe.label} calories={item.recipe.calories}
            image = {item.recipe.image} ingredients={item.recipe.ingredients} />
        })} 
    </div>
    </div>
  );
}

export default App;
