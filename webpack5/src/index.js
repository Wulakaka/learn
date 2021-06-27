function getComponent() {
// Lodash, now imported by this script
    return import('lodash')
        .then(({default: _}) => {
            const element = document.createElement('div')
            element.innerHTML = _.join(['Hello', 'webpack'], ' ')
            return element
        }).catch(error => 'An error occurred while loading the component')
}

getComponent().then(component => {
    document.body.appendChild(component)
})
