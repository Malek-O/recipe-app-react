import './App.css';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";

function App() {



  const [recipe, setRecipe] = useState('');
  const [recipeData, setRecipeData] = useState('');
  const [exist, setExist] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      setRecipeData('')
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${recipe}&app_id=88e6467b&app_key=58e51c0a63aeb5ab1861ef0608738c88`)
      const data = await response.json();
      if (data.hits.length) {
        console.log(data);
        setRecipeData(data)
        setExist(true)
      } else {
        setExist(false);
      }
    }
    const myPromise = fetchData();
    toast.promise(myPromise, {
      loading: 'Preparing recipes',
      success: 'Recipies Ready',
      error: 'Error when fetching',
    });
  }




  /*   loading: "Preparing recipeis",
      success: "Recipies Ready",
   */

  return (
    <div className="Mycontainer">
      <Toaster />
      <h1>Recipe Finder</h1>
      <div className="container row py-5" >
        <form onSubmit={handleSubmit} className="d-flex align-items-center mb-3">
          <input className="form-control" type="search" placeholder="Search" aria-label="Search"
            onChange={(e) => setRecipe(e.target.value)} />
          <button className='btn btn-primary'>Search</button>
        </form>

        {recipeData ? recipeData.hits.map((items, index) => {
          const { recipe } = items;
          return (
            <div className="col-lg-4 my-2 text-center " key={index}>
              <div className="card" key={index}>
                <img src={recipe.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h3 className="card-title fw-bold ">{recipe.label}</h3>
                  <h5 className="fw-bold">ingreidents</h5>
                  {recipe.ingredients.map((ingredient, index) => {
                    const { text } = ingredient
                    return <h6 key={index}>{text}</h6>
                  })}
                </div>
              </div>
            </div>
          )
        }) : <h1 className='text-center'> {!exist ? `There is no recipe about that , enter another one` : null}</h1>}

      </div>


    </div>
  );
}

export default App;
