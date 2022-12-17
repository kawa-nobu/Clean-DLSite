console.log("Clean-DLSite is Working!");
const target_elem = document.getElementById("wrapper");
function run(){
    let rem_elem = document.getElementsByClassName('_filter');
    for(let i=0;rem_elem.length>i;i++){
        rem_elem[i].parentElement.parentElement.remove();
    }
};
const observer = new MutationObserver(run)
observer.observe(target_elem,{
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});