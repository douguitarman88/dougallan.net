import React from 'react'
import { 
    title, 
    headerImage, 
    headerImageAlt,
    servingSize,
    prepTime,
    cookTime,
    totalTime,
    shortDesc 
} from '@/data/preWorkoutSmoothie';

const PreWorkoutSmoothie = () => {
  return (
    <section className="resume-section p-3 p-lg-5 d-flex d-column">
    <div>
        
        <h2>{title}</h2>
        <section id="mv-creation-146" className="mv-create-card mv-create-card-146 mv-recipe-card mv-create-card-style-centered-dark js mv-create-aggressive-buttons mv-create-center-cards mv-create-has-uppercase mv-create-has-image mv-create-xl">
            <div className="mv-create-wrapper">
                <header className="mv-create-header">
                    <img width="720" height="720" src={headerImage} className="mv-create-image no_pin ggnoads entered lazyloaded" data-pin-nopin="true" alt={headerImageAlt} />
                    
                    <h2 className="mv-create-title mv-create-title-primary">{title}</h2>

                    <div className="mv-create-times mv-create-times-2 mv-create-times-xl">

                        <div className="mv-create-time mv-create-time-yield">
                            <em className="mv-create-time-label mv-create-lowercase mv-create-strong">Serving Size: </em>
                            <span className="mv-create-time-format mv-create-uppercase">{servingSize}</span>
                        </div>

                        <div className="mv-create-time mv-create-time-prep">
                            <em className="mv-create-time-label mv-create-lowercase mv-create-strong">Prep Time: </em>
                            <span className="mv-create-time-format mv-create-uppercase">
                                <span className="mv-time-part mv-time-minutes">{prepTime}</span>
                            </span>
                        </div>
                        <div className="mv-create-time mv-create-time-total">
                            <em className="mv-create-time-label mv-create-lowercase mv-create-strong">Cook Time: </em>
                            <span className="mv-create-time-format mv-create-uppercase">
                                <span className="mv-time-part mv-time-minutes">{cookTime}</span>
                            </span>
                        </div>
                        <div className="mv-create-time mv-create-time-total">
                            <em className="mv-create-time-label mv-create-lowercase mv-create-strong">Total Time: </em>
                            <span className="mv-create-time-format mv-create-uppercase">
                                <span className="mv-time-part mv-time-minutes">{totalTime}</span> 
                            </span>
                        </div>

                    </div>
                    <div className="mv-create-description">
                        <p>{shortDesc}</p>
                    </div>
                    <div id="mv-create-146" className="mv-create-reviews" data-mv-create-id="146" data-mv-create-rating="5" data-mv-create-total-ratings="12" data-mv-rest-url="https://nutritioninthekitch.com/wp-json/">

                        <div className="mv-reviews"><div><div className="mv-reviews-stars "><div className="mv-stars mv-star-ratings mv-rating-5 mv-rating-user-null"></div></div></div><div className="mv-reviews-reviewcount"></div></div>
                    </div>
                </header>
                
                <div className="mv-create-ingredients">
                    <div className="mv-create-target mv-create-primary-unit"><div className="mv_slot_target" data-slot="recipe"></div></div>	<div className="mv-create-ingredients">
                    <h3 className="mv-create-ingredients-title mv-create-title-secondary">Ingredients</h3>

                    <ul>
                        <li>
                            1 ripe banana, peeled
                        </li>
                        <li>
                            1/2 cup frozen blueberries
                        </li>
                        <li>
                            1 tsp maple syrup
                        </li>
                        <li>
                            1 tsp cinnamon
                        </li>
                        <li>
                            juice from 1/2 lemon
                        </li>
                        <li>
                            2 scoops Naked Seed protein powder (or 1-2 scoops of protein powder of your choice, see notes)
                        </li>
                        <li>
                            1/2 cup unsweetened almond or oat milk
                        </li>
                    </ul>
                </div>
                <div className="mv-create-after-supplies-unit mv-create-target mv-create-content-unit"></div>		<div className="mv-create-hands-free"></div>
                <div className="mv-create-instructions">
                    <h3 className="mv-create-instructions-title mv-create-title-secondary">Instructions</h3>
                    <ol><li id="mv_create_146_1">Add all ingredients to a blender and blend until completely smooth. </li><li id="mv_create_146_2">Enjoy 30 minutes before working out for the best benefits (see notes). </li></ol>
                </div>
                <div className="mv-create-notes">
                    <h3 className="mv-create-notes-title mv-create-title-secondary">Notes</h3>
                    <div className="mv-create-notes-content">
                        <p></p><ul><li>Choose from <strong>plant-based protein powders, whey protein, collagen, or egg white protein </strong><em>(see under recommended products and use the serving size as indicated on the container).</em></li><li>This pre-workout smoothie is best for if you have a <strong>shorter amount of time to exercise or you are performing a fast high-intensity workout of shorter duration</strong>. </li><li><strong>If you are planning a longer duration workout</strong> (such as a 10km run, or another intense endurance activity of 1 hour or more, add 1/4 cup of whole grain rolled oats to your smoothie for slower digesting carbohydrates that provide longer-lasting energy)
                        <br /></li></ul><p></p>
                    </div>
                </div>
                </div>

                <div className="mv-create-nutrition">
                    <div className="mv-create-nutrition-box">
                        <h6 className="mv-create-nutrition-title mv-create-strong"><span>Nutrition Information:</span></h6>

                        <span className="mv-create-nutrition-item mv-create-nutrition-yield"><span className="mv-create-nutrition-label mv-create-uppercase">Yield:</span> 1</span>

                        <span className="mv-create-nutrition-item mv-create-nutrition-serving-size"><span className="mv-create-nutrition-label mv-create-uppercase">Serving Size:</span> 1</span>

                        <br /><span className="mv-create-nutrition-amount"><em>Amount Per Serving:</em></span>

                        <span className="mv-create-nutrition-item mv-create-nutrition-calories"><span className="mv-create-nutrition-label mv-create-uppercase">Calories:</span> 305</span><span className="mv-create-nutrition-item mv-create-nutrition-total-fat"><span className="mv-create-nutrition-label mv-create-uppercase">Total Fat:</span> 3gg</span><span className="mv-create-nutrition-item mv-create-nutrition-carbohydrates"><span className="mv-create-nutrition-label mv-create-uppercase">Carbohydrates:</span> 56gg</span><span className="mv-create-nutrition-item mv-create-nutrition-fiber mv-create-nutrition-indent"><span className="mv-create-nutrition-label mv-create-uppercase">Fiber:</span> 12gg</span><span className="mv-create-nutrition-item mv-create-nutrition-sugar mv-create-nutrition-indent"><span className="mv-create-nutrition-label mv-create-uppercase">Sugar:</span> 26gg</span><span className="mv-create-nutrition-item mv-create-nutrition-protein"><span className="mv-create-nutrition-label mv-create-uppercase">Protein:</span> 22gg</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</section>
  )
}

export default PreWorkoutSmoothie