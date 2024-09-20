
console.log("hello there!")
const matchBoxes = document.getElementsByClassName("matchBox");
for (const matchBox of matchBoxes){
    const matchBoxColumns = matchBox.querySelectorAll('.matchBoxColumn');
    const firstColumn = matchBoxColumns[0]; // The first column
    // Loop over the second, third, and fourth columns (since first column is labels)
    for (let i = 1; i < matchBoxColumns.length; i++) {
        // Get the image from the first cell in the column
        const imageCell = matchBoxColumns[i].querySelector('.image img');
        // If there is an image in the first row of that column, copy it to the corresponding row in the first column
        if (imageCell) {
            const newImage = imageCell.cloneNode(true); // Clone the image
            firstColumn.children[i].appendChild(newImage); // Add to the corresponding cell in the first column
        }
    }
}
