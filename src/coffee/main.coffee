removeUrl = (txt) -> txt.replace('url("','').replace('")','')
colourArrayToRGB = (a) -> "rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")"

getDominantColour = () ->
    image = new Image
    image.src = removeUrl $(document.body).css("background-image")
    (new ColorThief).getColor(image)
    

$(document).ready ->
    colour = getDominantColour()
    $(".overlay-element").css("background-color", colourArrayToRGB colour)