window.onload = async() => {

    //Html Elements
    var dogImage = document.querySelector(".dog-img")
    var next = document.querySelector(".next")
        .addEventListener("click", insertImage)

    await insertImage()

    async function getImage() {
        var newImage;
        //Fetch data from api
        await fetch("https://dog.ceo/api/breeds/image/random")
            .then(responsive => /*FORMATTING*/ responsive.json())
            .then(data => {
                newImage = data
            })

        return newImage
    }

    async function insertImage() {
        var image = await getImage()
        if (image.status != "success") return alert("Refresh the site, there was an error while getting image from the api!")
        dogImage.src = image.message
    }



}