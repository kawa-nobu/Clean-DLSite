console.log("Clean-DLSite is Working!");
let target_elem = document.getElementById("wrapper");
let words_replace_change = false;
window.addEventListener("load", function(){
    let ls_replace_settings = localStorage.getItem("cds_replace_words");
    const head_login_infomation = document.querySelector(".login_information");
    head_login_infomation.insertAdjacentHTML("afterbegin", `<div class="login_information_item">復号化(将来用)<span><input id="cds_replace_words_sw" type="checkbox"></span></div>`)
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
    const ls_replace_settings = localStorage.getItem("cds_replace_words");
    let rem_elem = document.getElementsByClassName('_filter');
    for(let i=0;rem_elem.length>i;i++){
        rem_elem[i].parentElement.parentElement.remove();
    }
console.log("work")
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
    subtree: true
});
function replace_words(input_element, mode){
    //ストア申請時はbase64等で隠ぺいしておく方がよさそう???
    const decrypt_words = ["メスガキ", "レイプ", "ロリ", "ロリババア", "監禁", "鬼畜", "逆レイプ", "強制/無理矢理", "近親相姦", "拷問", "催眠", "獣姦", "洗脳", "痴漢", "調教", "奴隷", "陵辱", "輪姦", "蟲姦", "モブ姦", "異種姦", "機械姦", "睡眠姦", "催眠音声"];
    const encrypt_words = ["ざぁ～こ♡", "合意なし", "ひよこ", "ひよこババア", "閉じ込め", "超ひどい", "逆レ", "命令/無理矢理", "近親もの", "責め苦", "トランス/暗示", "動物なかよし", "精神支配", "秘密さわさわ", "しつけ", "下僕", "屈辱", "回し", "虫えっち", "モブおじさん", "異種えっち", "機械責め", "すやすやえっち", "トランス/暗示ボイス"];
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
    target_elem = document.getElementById("wrapper");
    return input_data;
}