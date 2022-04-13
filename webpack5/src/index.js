import _ from 'lodash'
import './styles/index.scss'
// import print from "./print";
function component() {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    // element.onclick = print.bind(null, 'Hello webpack!')

    return element
}
document.body.appendChild(component())
