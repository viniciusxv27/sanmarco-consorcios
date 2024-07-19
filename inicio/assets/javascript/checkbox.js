document.getElementById('switch').addEventListener("click", function () {
    var checkbox = document.getElementsByClassName('check')[1]
    
    checkbox.checked = !checkbox.checked;
});