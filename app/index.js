/**
 * Created by Nathen on 3/12/2017.
 */
function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = 'Hello, Webpack';

    return element;
}

document.body.appendChild(component());