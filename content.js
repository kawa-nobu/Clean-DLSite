console.log("Clean-DLSite is Working!");
let work_index;
window.addEventListener('scroll', function() {
    if(document.getElementsByClassName('_filter').length != 0){
        let rem_elem = document.getElementsByClassName('_filter');
        for(let i=0;rem_elem.length>i;i++){
            rem_elem[i].parentElement.parentElement.remove();
        }
    }
});