
document.getElementById("showMoreBtn").addEventListener("click", function() {
    
    var points = document.getElementById("points");
    var showMoreText = document.getElementById("moreText");
    console.log(showMoreText)
    var buttonText = document.getElementById("showMoreBtn");
    
        if (points.style.display === "none") {
            showMoreText.style.display = "none";
            points.style.display = "inline"; 
            buttonText.innerHTML = "Show More"; 
            }

        else {
            showMoreText.style.display = "inline";
            points.style.display = "none";
            buttonText.innerHTML = "Show Less";
        } 
    }   
);


