const myComponent = {
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => {
          alert('hello')
        }
      },
      children: 'click me'
    }
  }
}

const vnode = {
  tag: myComponent,
}

function renderer(vnode, container) {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container)
  } else if(typeof vnode.tag === 'object') {
    mountComponent(vnode, container)
  }

}

function mountElement (vnode, container) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(key.substr(2).toLowerCase(), vnode.props[key])
    }
  }
  // 处理children
  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el))
  }
  // 将元素添加到挂载点下
  container.appendChild(el)
}

function mountComponent(vnode, container) {
  const subtree = vnode.tag.render()
  renderer(subtree, container)
}

renderer(vnode, document.body)
