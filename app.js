const apiKey = '563492ad6f91700001000001c6264b9ee7b24e28815ec6153f31cd8a';
const input = document.querySelector('input');
const gallery = document.querySelector('.grid-gallery');
const form = document.querySelector('form');
const more = document.querySelector('.btn');
let fetchLink;
let index = 1;
let currentSearch;


more.addEventListener('click',loadMore);
async function loadMore(e){
    e.preventDefault();
    index++
    if(currentSearch){

        fetchLink = `https://api.pexels.com/v1/search/?page=${index}&per_page=15&query=${currentSearch}`
        const fetchData = await fetch(fetchLink,{
            method: 'GET',
            headers:{
                Accept:'appication/json',
                Authorization: apiKey
            }
        })
    
        const data = await fetchData.json();
        const photos = data.photos;
        console.log(data)
        
       
        photos.forEach(function(photo){
            let html = `
            <div class="box">
            <div class="top-grid img-container">
                <img src="${photo.src.medium}" alt="">
            </div>
            <div class="down-grid">
                <h1>${photo.photographer}</h1>
                <a class='btn sec' href="${photo.src.original}" target="_blank">Download</a>
            </div>
        </div>`;
        
        
        gallery.innerHTML += html;
    
        
    })
    } else {
        fetchLink = `https://api.pexels.com/v1/curated/?page=${index}&per_page=15`
        const fetchData = await fetch(fetchLink,{
            method: 'GET',
            headers:{
                Accept:'appication/json',
                Authorization: apiKey
            }
        })
        const data = await fetchData.json();
        const photos = data.photos;
        console.log(data)
        
       
        photos.forEach(function(photo){
            let html = `
            <div class="box">
            <div class="top-grid img-container">
                <img src="${photo.src.medium}" alt="">
            </div>
            <div class="down-grid">
                <h1>${photo.photographer}</h1>
                <a class='btn sec' href="${photo.src.original}" target="_blank">Download</a>
            </div>
        </div>`;
        
        
        gallery.innerHTML += html;
    
        
    })
    }

}





async function imgSearch(search){
    fetchLink = `https://api.pexels.com/v1/search/?page=1&per_page=15&query=${search}`
    const fetchData = await fetch(fetchLink,{
        method: 'GET',
        headers:{
            Accept:'appication/json',
            Authorization: apiKey
        }
    })

    const data = await fetchData.json();
    const photos = data.photos;
    console.log(data)
    
   
    photos.forEach(function(photo){
        let html = `
        <div class="box">
        <div class="top-grid img-container">
            <img src="${photo.src.medium}" alt="">
        </div>
        <div class="down-grid">
            <h1>${photo.photographer}</h1>
            <a class='btn sec' href="${photo.src.original}" target="_blank">Download</a>
        </div>
    </div>`;
    
    
    gallery.innerHTML += html;

    
})




    
}


form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(input.value);
    const value = input.value;
    currentSearch = value;
    imgSearch(value);
    form.reset();
    clear();
    
})

function clear(){
    gallery.innerHTML = ''
}




async function curatedPhotos(){
    fetchLink = `https://api.pexels.com/v1/curated/?page=1&per_page=15`
    const fetchData = await fetch(fetchLink,{
        method: 'GET',
        headers:{
            Accept:'appication/json',
            Authorization: apiKey
        }
    })
    const data = await fetchData.json();
    const photos = data.photos;
    console.log(data);
    
   
    photos.forEach(function(photo){
        let html = `
        <div class="box">
        <div class="top-grid img-container">
            <img src="${photo.src.medium}" alt="">
        </div>
        <div class="down-grid">
            <h1>${photo.photographer}</h1>
            <a class='btn sec' href="${photo.src.original}" target="_blank">Download</a>
        </div>
    </div>`;
   
    gallery.innerHTML += html;
    


    
})
}
curatedPhotos();

