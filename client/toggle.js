/**
 * Created by wyf on 2016/11/16.
 */
export default function toggle() {
    var currentHost = window.location.href;
    var sunnyhuanPage = 'https://sunnyhuan.yvanwang.com/';   //'http://localhost:3000/'
    //console.log(currentHost == sunnyhuanPage);
    if (currentHost == sunnyhuanPage) {
        var huanStyle = document.createElement('link');
        huanStyle.rel = "stylesheet";
        huanStyle.href = '/huanStyle.css';
        var title = document.getElementsByTagName('title');
        title[0].innerHTML = "Sunny Huan's Blog";
        document.head.appendChild(huanStyle);
    }
}