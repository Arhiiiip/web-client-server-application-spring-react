const printDot = (x, y, result) => {
    let xc = +x
    let yc = +y
    let color;
    if(result){
        color = "green"
    }else{
        color = "red"
    }
    const shoot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    shoot.setAttribute('r', '4');
    shoot.setAttribute('cx', String(xc));
    shoot.setAttribute('cy', String(yc));
    shoot.setAttribute('fill', color);
    shoot.setAttribute('color', color);
    shoot.setAttribute('id', 'dot');
    shoot.setAttribute('class', 'dot');

    let pole = document.getElementById('graph');
    pole.appendChild(shoot);
}