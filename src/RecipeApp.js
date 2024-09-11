import { useEffect, useState } from "react";
import axios from "axios";

import Banner from "./Recipe_components/Banner";
import List from "./Recipe_components/List";
import Footer from "./Recipe_components/Footer";
import SaveAs from "./Recipe_components/SaveAs";
import Nav from "./Recipe_components/Nav";



const RecipeApp = () =>{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [Frecipe, setFrecipe] = useState([]);

    

    useEffect(() => {
        makeApiCall();
    }, [])
    const handleFilter= () => {
        const filtered_recipes = recipes.filter((recipe)=>{
            return recipe.name.toLowerCase().includes(keyword.toLowerCase())

        })
        setFrecipe(filtered_recipes);
    }

    function makeApiCall(){
        axios.get("https://dummyjson.com/recipes")
            .then(function(resp){
                console.log(resp.data.recipes)
                setLoading(false)
                setRecipes(resp.data.recipes)

            })
            .catch(function(err){
                console.log(err)
                setLoading(false)
                setError(true)
                
            })
        

    }
   
    return(

        <div className="container-fluid">
        <Nav/>
        <Banner setKeyword={setKeyword} keyword={keyword} handleFilter={handleFilter}/>
        <List loading={loading} error ={error} recipes= {recipes} Frecipe={Frecipe} keyword={keyword}/>
        <Footer/>
       
        <SaveAs/>
        </div>
              
    )
}

export default RecipeApp;