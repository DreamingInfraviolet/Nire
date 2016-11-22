removeUrl = (txt) -> txt.replace('url("','').replace('")','')
colourArrayToRGB = (a) -> "rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")"

computeDominantColour = (callback) ->
    image = new Image()
    image.onload = () -> (((image) -> callback(image))(image))
    image.src = removeUrl $(document.body).css("background-image")
    

$(document).ready ->
    computeDominantColour((image) ->
        colour = (new ColorThief()).getColor(image)
        $(".overlay-element").css("background-color", colourArrayToRGB colour)
        )