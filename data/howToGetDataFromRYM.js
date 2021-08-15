
// get the list from one site of your albums
let array = document.querySelectorAll("[id*=page_catalog_item]");

// change node list to array
let array1 = [...array];

//remove first element from array
array1.shift();

//create object with album data
newArray1 = array1.map(x => {let year = x.querySelector('.smallgray'); return {title: x.querySelector('.album').innerHTML, artist: x.querySelector('.artist').innerHTML, year: x.querySelector('.smallgray').innerHTML.slice(1,5), rymLink: x.querySelector('.album').href, photoLinkSmall: x.querySelector('.or_q_thumb_album img').src}});

//JSON strignify
JSON.stringify(newArray1);