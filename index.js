import gallery from "./gallery-items.js"

const refs = {
gallery:document.querySelector('.js-gallery'),
lightbox:document.querySelector('.js-lightbox'),
largeimg:document.querySelector('.lightbox__image'),
// closebtn:document.querySelector('button[data-action="close-lightbox"]')
}

const createImg = (image) =>{
    const  {preview, original, description} = image;
    const elemRef = document.createElement('li');
    elemRef.classList.add('gallery__item');
    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');

    linkRef.href = original;
    imgRef.src = preview;
    imgRef.dataset.source = original;
    imgRef.alt = description;
    linkRef.append(imgRef);
    elemRef.append(linkRef);
    return elemRef;
};


const imageCard = gallery.map((image) => createImg(image));

refs.gallery.append(...imageCard);


refs.gallery.addEventListener('click', openModal);
// refs.closebtn.addEventListener('click', closeModal);
refs.lightbox.addEventListener('click', event =>{
    if (event.target !== refs.largeimg)
    closeModal()
})

function openModal(event){
    window.addEventListener('keydown', whenPressed);
    event.preventDefault()
if(event.target.nodeName !=='IMG'){
    return;   
}
refs.lightbox.classList.add('is-open');
getLargeImg(event)
}

function getLargeImg (event){
const imgRef = event.target;
const largeImgURL = imgRef.dataset.source;
refs.largeimg.src = largeImgURL;
}

function closeModal(){
    window.removeEventListener('keydown', whenPressed);
    refs.lightbox.classList.remove('is-open');
    refs.largeimg.src = "";
}

function whenPressed (event){
    const button = event.code
    let currentIndex = gallery.findIndex((el) => el.original === refs.largeimg.src)
    whenPressArrowLeft(button, currentIndex);
    whenPressArrowRight(button, currentIndex);
    whenPressESC(button)
}

function whenPressArrowLeft(button, currentIndex){
    if (button === "ArrowLeft"&& currentIndex >0){
        refs.largeimg.src = gallery[currentIndex-1].original
    }
}
function whenPressArrowRight(button,currentIndex){
    if(button ==="ArrowRight"&& currentIndex<8){
        refs.largeimg.src = gallery[currentIndex+1].original
    }
}
function whenPressESC (button){
    if(button === "Escape"){
        closeModal()
    }
}