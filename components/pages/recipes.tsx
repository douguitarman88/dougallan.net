import React from 'react';
import Link from 'next/link';

const Recipes = () => {
  return (
    <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="recipes">
    <div className="my-auto">
        <h2 className="mb-5">Recipes</h2>

            <h3>Smoothies</h3>
                <p>- <Link href="/preworkoutsmoothie">EASY PRE WORKOUT SMOOTHIE</Link></p>
                <p>- <a href="/spinachavocadosmoothie">Spinach-Avocado Smoothie</a></p>
            <h3>Lunch/Dinner</h3>
                <p>- <Link href="/chickenwings">TRULY CRISPY OVEN BAKED BUFFALO WINGS</Link></p>
            <h3>Lunch</h3>
                <p>- <a href="/Juicing/GetRecipe/6">Placeholder for Lunch</a></p>
                <p>- <a href="/Juicing/GetRecipe/7">SPINACH DIP</a></p>
            <h3>Dinner</h3>
                <p>- <a href="/Juicing/GetRecipe/5">CREAMY TUSCAN CHICKEN PASTA</a></p>
                <p>- <a href="/Juicing/GetRecipe/9">Neapolitan/New York Style Pizza</a></p>

        

        

        <p>
            Not added to DB yet:
            <br />
            <a href="/Recipes/CrispyHoneyGarlicChickenWings/">Crispy Honey Garlic Chicken Wings</a>
             {/* <a href="~/Recipes/BreakfastSandwich/">Breakfast Sandwich</a>
             <br />
             <a href="~/Recipes/HotSpinachDip/">Hot Spinach Dip</a> */}
        </p>
        
    </div>
</section>
  )
}

export default Recipes