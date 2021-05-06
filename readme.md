# Source code for the index.htm file in the arduino scale app.

## Tech used:
    1. Polymer Lit-Element
    2. Redux Store
    3. WebSockets

## Custom Elements:
    1. scale-backend:
        a. Master Element and container for the rest
    2. recipe-display
        a. Formats the recipe object and displays it in a user friendly format
    3. recipe-entryform:
        a. Form for entering or editing recipes.
        b. When a recipe is displayed you can edit it in this form.
        c. Pressing the clear button will reset the form and recipe display to blank for new recipe entry.
        d. after an ingredient is entered you can delete it or move it up and down the list. TODO- implement edit.
        e. Requires a back-end api running on port 2020 for database communication.
    4. recipe-search:
        a. Sends a search request to the back end and displays the titles of the recipes returned