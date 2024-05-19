console.log("Clean-DLSite is Working!");
let target_elem = document.querySelector('#wrapper');
let words_replace_change = false;
window.addEventListener("load", function(){
    let ls_replace_settings = localStorage.getItem("cds_replace_words");
    const head_login_infomation = document.querySelector(".login_information");
    head_login_infomation.insertAdjacentHTML("afterbegin", `<div class="login_information_item">復号化<span><input id="cds_replace_words_sw" type="checkbox"></span></div>`);
    if(ls_replace_settings == null){
        localStorage.setItem("cds_replace_words", "false");
        location.reload()
    }else{
        if(ls_replace_settings == "true"){
            document.querySelector("#cds_replace_words_sw").checked = true;
        }
        document.querySelector("#cds_replace_words_sw").addEventListener("change", function(){
            if(this.checked == true){
                words_replace_change = true;
                localStorage.setItem("cds_replace_words", "true");
                target_elem.innerHTML = replace_words(target_elem, "decrypt");
            }else{
                words_replace_change = true;
                localStorage.setItem("cds_replace_words", "false");
                target_elem.innerHTML = replace_words(target_elem, "encrypt");
            }
        });
    }
});

const observer = new MutationObserver(run);
function run(){
    //console.log("work")
    const ls_replace_settings = localStorage.getItem("cds_replace_words");
    let rem_elem = document.querySelectorAll('._filter');
    for(let i=0;rem_elem.length>i;i++){
        rem_elem[i].closest('li').remove();
    }
    if(ls_replace_settings == "true"){
        observer.disconnect();
        target_elem.innerHTML = replace_words(target_elem, "decrypt");
        observer.observe(target_elem,{
        childList: true,
        characterData: true,
        subtree: true
    });
    }else{
        if(words_replace_change){
            observer.disconnect();
            target_elem.innerHTML = replace_words(target_elem, "encrypt");
            observer.observe(target_elem,{
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }
};

observer.observe(target_elem,{
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true
});
function replace_words(input_element, mode){
    const base64_words = "JTdCJTIyZGVjcnlwdCUyMiUzQSU1QiUyMiVFMyU4MyVBMSVFMyU4MiVCOSVFMyU4MiVBQyVFMyU4MiVBRCUyMiUyQyUyMiVFMyU4MyVBQyVFMyU4MiVBNCVFMyU4MyU5NyUyMiUyQyUyMiVFMyU4MyVBRCVFMyU4MyVBQSUyMiUyQyUyMiVFMyU4MyVBRCVFMyU4MyVBQSVFMyU4MyU5MCVFMyU4MyU5MCVFMyU4MiVBMiUyMiUyQyUyMiVFNyU5QiVBMyVFNyVBNiU4MSUyMiUyQyUyMiVFOSVBQyVCQyVFNyU5NSU5QyUyMiUyQyUyMiVFOSU4MCU4NiVFMyU4MyVBQyVFMyU4MiVBNCVFMyU4MyU5NyUyMiUyQyUyMiVFNSVCQyVCNyVFNSU4OCVCNiUyRiVFNyU4NCVBMSVFNyU5MCU4NiVFNyU5RiVBMiVFNyU5MCU4NiUyMiUyQyUyMiVFOCVCRiU5MSVFOCVBNiVBQSVFNyU5QiVCOCVFNSVBNyVBNiUyMiUyQyUyMiVFNiU4QiVCNyVFNSU5NSU4RiUyMiUyQyUyMiVFNSU4MiVBQyVFNyU5QyVBMCUyMiUyQyUyMiVFNyU4RCVBMyVFNSVBNyVBNiUyMiUyQyUyMiVFNiVCNCU5NyVFOCU4NCVCMyUyMiUyQyUyMiVFNyU5NyVCNCVFNiVCQyVBMiUyMiUyQyUyMiVFOCVBQSVCRiVFNiU5NSU5OSUyMiUyQyUyMiVFNSVBNSVCNCVFOSU5QSVCNyUyMiUyQyUyMiVFOSU5OSVCNSVFOCVCRSVCMSUyMiUyQyUyMiVFOCVCQyVBQSVFNSVBNyVBNiUyMiUyQyUyMiVFOCU5RiVCMiVFNSVBNyVBNiUyMiUyQyUyMiVFMyU4MyVBMiVFMyU4MyU5NiVFNSVBNyVBNiUyMiUyQyUyMiVFNyU5NSVCMCVFNyVBOCVBRSVFNSVBNyVBNiUyMiUyQyUyMiVFNiVBOSU5RiVFNiVBMiVCMCVFNSVBNyVBNiUyMiUyQyUyMiVFNyU5RCVBMSVFNyU5QyVBMCVFNSVBNyVBNiUyMiUyQyUyMiVFNSU4MiVBQyVFNyU5QyVBMCVFOSU5RiVCMyVFNSVBMyVCMCUyMiU1RCUyQyUyMmVuY3J5cHQlMjIlM0ElNUIlMjIlRTMlODElOTYlRTMlODElODElRUYlQkQlOUUlRTMlODElOTMlRTIlOTklQTElMjIlMkMlMjIlRTUlOTAlODglRTYlODQlOEYlRTMlODElQUElRTMlODElOTclMjIlMkMlMjIlRTMlODElQTQlRTMlODIlOEIlRTMlODElQkElRTMlODElOUYlMjIlMkMlMjIlRTMlODElQTQlRTMlODIlOEIlRTMlODElQkElRTMlODElOUYlRTMlODMlOTAlRTMlODMlOTAlRTMlODIlQTIlMjIlMkMlMjIlRTklOTYlODklRTMlODElOTglRTglQkUlQkMlRTMlODIlODElMjIlMkMlMjIlRTglQjYlODUlRTMlODElQjIlRTMlODElQTklRTMlODElODQlMjIlMkMlMjIlRTklODAlODYlRTMlODMlQUMlMjIlMkMlMjIlRTUlOTElQkQlRTQlQkIlQTQlMkYlRTclODQlQTElRTclOTAlODYlRTclOUYlQTIlRTclOTAlODYlMjIlMkMlMjIlRTglQkYlOTElRTglQTYlQUElRTMlODIlODIlRTMlODElQUUlMjIlMkMlMjIlRTglQjIlQUMlRTMlODIlODElRTglOEIlQTYlMjIlMkMlMjIlRTMlODMlODglRTMlODMlQTklRTMlODMlQjMlRTMlODIlQjklMkYlRTYlOUElOTclRTclQTQlQkElMjIlMkMlMjIlRTclOTUlOUMlRTMlODElODglRTMlODElQTElMjIlMkMlMjIlRTclQjIlQkUlRTclQTUlOUUlRTYlOTQlQUYlRTklODUlOEQlMjIlMkMlMjIlRTclQTclOTglRTUlQUYlODYlRTMlODElOTUlRTMlODIlOEYlRTMlODElOTUlRTMlODIlOEYlMjIlMkMlMjIlRTMlODElOTclRTMlODElQTQlRTMlODElOTElMjIlMkMlMjIlRTQlQjglOEIlRTUlODMlOTUlMjIlMkMlMjIlRTUlQjElODglRTglQkUlQjElMjIlMkMlMjIlRTUlOUIlOUUlRTMlODElOTclMjIlMkMlMjIlRTglOTklQUIlRTMlODElODglRTMlODElQTMlRTMlODElQTElMjIlMkMlMjIlRTMlODMlQTIlRTMlODMlOTYlRTMlODElOEElRTMlODElOTglRTMlODElOTUlRTMlODIlOTMlMjIlMkMlMjIlRTclOTUlQjAlRTclQTglQUUlRTMlODElODglRTMlODElQTMlRTMlODElQTElMjIlMkMlMjIlRTYlQTklOUYlRTYlQTIlQjAlRTglQjIlQUMlRTMlODIlODElMjIlMkMlMjIlRTMlODElOTklRTMlODIlODQlRTMlODElOTklRTMlODIlODQlRTMlODElODglRTMlODElQTMlRTMlODElQTElMjIlMkMlMjIlRTMlODMlODglRTMlODMlQTklRTMlODMlQjMlRTMlODIlQjklMkYlRTYlOUElOTclRTclQTQlQkElRTMlODMlOUMlRTMlODIlQTQlRTMlODIlQjklMjIlNUQlN0Q=";
    const words_obj = JSON.parse(decodeURIComponent(atob(base64_words)));
    const decrypt_words = words_obj.decrypt;
    const encrypt_words = words_obj.encrypt;
    let input_data = input_element.innerHTML;
    if(mode == "decrypt"){
        for (let index = 0; index < encrypt_words.length; index++) {
            input_data = input_data.replaceAll(encrypt_words[index], decrypt_words[index]);
        }
    }else if(mode == "encrypt"){
        for (let index = 0; index < encrypt_words.length; index++) {
            input_data = input_data.replaceAll(decrypt_words[index], encrypt_words[index]);
        }
    }
    target_elem = document.querySelector('#wrapper');
    return input_data;
}